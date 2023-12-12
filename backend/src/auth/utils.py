import random
import string
from datetime import timedelta, datetime

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from passlib.context import CryptContext

from sqlalchemy import select

from src.auth.models import User
from src.auth.schemas import TokenData
from src.auth.config import SECRET_KEY, ALGORITHM, REFRESH_SECRET_KEY, ACCESS_TOKEN_EXPIRE_MINUTES, \
    REFRESH_TOKEN_EXPIRE_MINUTES
from src.database import async_session_maker

from jose import jwt, JWTError


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/user/login/", scheme_name="JWT")


def hash_password(password: str) -> str:
    """ Хэширует пароль при регитсрации """
    return pwd_context.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    """Сравнивает хэшированный пароль с паролем из БД"""
    return pwd_context.verify(password, hashed_password)


async def authenticate_user(email: str, password: str):
    """ Аутентификация пользователя """
    user = await get_user_by_email(email)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    if not verify_password(password=password, hashed_password=user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """ Создает access_token для пользователя с указанным email """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def create_refresh_token(data: dict, expires_delta: timedelta | None = None):
    """ Создает refresh_token для пользователя с указанным email """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=int(REFRESH_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, REFRESH_SECRET_KEY, ALGORITHM)
    return encoded_jwt


async def get_user_by_email(email: str):
    """ Возвращает информацию о пользователе по email """
    async with async_session_maker() as session:
        user = await session.execute(select(User).where(User.email == email))
        return user.scalar()


async def get_current_user(token: str = Depends(oauth2_scheme)):
    """ Возвращает пользователя по токену """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt_access_decode(token)
        if datetime.fromtimestamp(payload.get("exp")) < datetime.now():
            raise credentials_exception
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = await get_user_by_email(email=token_data.username)
    if not user:
        raise credentials_exception
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user"
        )
    return user


def generated_code():
    """ Генерация кода для верификации пользователя """
    code = ''.join(random.choice(string.digits) for _ in range(4))
    return code


def jwt_access_decode(token: str):
    """ Декодирование access_token """
    payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
    return payload


def jwt_refresh_decode(token: str):
    """ Декодирование refresh_token """
    payload = jwt.decode(token, REFRESH_SECRET_KEY, algorithms=ALGORITHM)
    return payload

