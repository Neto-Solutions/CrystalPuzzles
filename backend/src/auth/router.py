from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import select

from sqlalchemy.ext.asyncio import AsyncSession


from src.auth.models import User, Token
from src.auth.schemas import UserCreateSchema, UserReadSchema
from src.auth.utils import get_user_by_email, hash_password, create_access_token, \
    get_current_user, authenticate_user, create_refresh_token, oauth2_scheme
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
    query = await session.execute(select(Token).where(
        Token.user_id == current_user.id,
        Token.access_token == token
    ))
    existing_token = query.scalar()
    info = []
    if (datetime.utcnow() - existing_token.created_date).days > 1:
        info.append(existing_token.user_id)
    if info:
        existing_token.delete()
        await session.commit()
        return {"message": "The access token has expired"}
    existing_token.status = False
    session.add(existing_token)
    await session.commit()
    return {"message": "Logout Successfully"}


@router.post('/change-password')
async def change_password():
    pass
