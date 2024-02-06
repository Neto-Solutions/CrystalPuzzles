from datetime import datetime
from smtplib import SMTPDataError, SMTPRecipientsRefused

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from jose import ExpiredSignatureError
from sqlalchemy import select, update

from sqlalchemy.ext.asyncio import AsyncSession


from src.Users.models import User, Token
from src.Users.schemas import UserCreateSchema, UserReadSchema, VerifiedEmailCode, ChangePassword
from src.Users.tasks import send_code_email_verified
from src.Users.utils import get_user_by_email, hash_password, create_access_token, \
    get_current_user, authenticate_user, create_refresh_token, oauth2_scheme, generated_code, verify_password, \
    jwt_access_decode, jwt_refresh_decode
from src.database import get_async_session


users_routers = APIRouter(
    prefix="/api/v1/user",
    tags=["Users"]
)


@users_routers.get("/account", response_model=UserReadSchema)
async def account(current_user: User = Depends(get_current_user)):
    """ Возвращает данные пользователя """
    return current_user


@users_routers.post("/register/", response_model=UserReadSchema)
async def register(data: UserCreateSchema, session: AsyncSession = Depends(get_async_session)):
    """ Регистрация пользователя """
    existing_user = await get_user_by_email(data.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="This Email already exists")
    user_dict = data.model_dump()
    password = user_dict.pop("password")
    user_dict["hashed_password"] = hash_password(password)
    user_dict["code"] = int(generated_code())
    user_dict["DateAdd"] = datetime.now()
    user_dict["DateUpdate"] = datetime.now()
    # try:
    #     send_code_email_verified.delay(user_dict)
    # except (SMTPDataError, SMTPRecipientsRefused):
    #     raise HTTPException(status_code=400, detail="Email verification failed")
    create_user = User(**user_dict)
    session.add(create_user)
    await session.commit()
    return create_user


@users_routers.post('/veridied/')
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


@users_routers.post('/change-password/')
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

