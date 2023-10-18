from smtplib import SMTPDataError, SMTPRecipientsRefused

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from jose import ExpiredSignatureError
from sqlalchemy import select, update

from sqlalchemy.ext.asyncio import AsyncSession


from src.auth.models import User, Token
from src.auth.schemas import UserCreateSchema, UserReadSchema, VerifiedEmailCode, ChangePassword
from src.auth.tasks import send_code_email_verified
from src.auth.utils import get_user_by_email, hash_password, create_access_token, \
    get_current_user, authenticate_user, create_refresh_token, oauth2_scheme, generated_code, verify_password, \
    jwt_access_decode, jwt_refresh_decode
from src.database import get_async_session


router = APIRouter(
    prefix="/user",
    tags=["Auth"]
)


@router.get("/account", response_model=UserReadSchema)
async def account(current_user: User = Depends(get_current_user)):
    """ Возвращает данные пользователя """
    return current_user


@router.post("/register/", response_model=UserReadSchema)
async def register(data: UserCreateSchema, session: AsyncSession = Depends(get_async_session)):
    """ Регистрация пользователя """
    existing_user = await get_user_by_email(data.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="This Email already exists")
    user_dict = data.model_dump()
    password = user_dict.pop("password")
    user_dict["hashed_password"] = hash_password(password)
    user_dict["code"] = int(generated_code())
    try:
        send_code_email_verified.delay(user_dict)
    except (SMTPDataError, SMTPRecipientsRefused):
        raise HTTPException(status_code=400, detail="Email verification failed")
    create_user = User(**user_dict)
    session.add(create_user)
    await session.commit()
    return create_user


@router.post("/login/")
async def login(data: OAuth2PasswordRequestForm = Depends(), session: AsyncSession = Depends(get_async_session)):
    """ Войти в учетную запись """
    user = await authenticate_user(data.username, data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email})
    refresh_token = create_refresh_token(data={"sub": user.email})
    token_db = Token(user_id=user.id, access_token=access_token, refresh_token=refresh_token, status=True)
    session.add(token_db)
    await session.commit()
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/logout/")
async def logout(
        token: str = Depends(oauth2_scheme),
        current_user: User = Depends(get_current_user),
        session: AsyncSession = Depends(get_async_session)
):
    """ Выйти из учетеной записи """
    pass


@router.post('/veridied/')
async def email_verify(
        data: VerifiedEmailCode,
        user: User = Depends(get_current_user),
        session: AsyncSession = Depends(get_async_session)
):
    """ Ввести код, для верификации email """
    if user.code == data.code:
        stmt = update(User).where(User.email == user.email).values(is_verified=True, code=None)
        await session.execute(stmt)
        await session.commit()
        return {"status": "Success"}
    else:
        raise HTTPException(status_code=400, detail="Incorrect code")


@router.post('/change-password/')
async def change_password(
        data: ChangePassword,
        user: User = Depends(get_current_user),
        session: AsyncSession = Depends(get_async_session)):
    """ Сменить пароль пользователя """
    if data.old_password == data.new_password:
        raise HTTPException(status_code=400, detail='Passwords may not be repeated')
    verified = verify_password(data.old_password, user.hashed_password)
    if verified:
        await session.execute(
            update(User).where(User.email == user.email).values(hashed_password=hash_password(data.new_password))
        )
        await session.commit()
    else:
        raise HTTPException(status_code=400, detail='You entered the wrong password')
    return {'status': 'Password updated successfully'}


@router.get('/refresh-token/')
async def refresh_token(
        access_token: str = Depends(oauth2_scheme),
        session: AsyncSession = Depends(get_async_session)
):
    """ Обновить access token """
    try:
        jwt_access_decode(access_token)
    except ExpiredSignatureError:
        query = await session.execute(select(Token).where(Token.access_token == access_token))
        token_db = query.scalar()
        try:
            jwt_refresh_decode(token_db.refresh_token)
        except ExpiredSignatureError:
            raise HTTPException(status_code=400, detail="Fail")
        else:
            new_access_token = create_access_token(data={"sub": token_db.user_id})
            token_db.access_token = new_access_token
            session.add(token_db)
            await session.commit()
            return {"access_token": new_access_token, "token_type": "bearer"}
    else:
        return {"message": "Token is fresh"}
