import random
import string
from datetime import timedelta, datetime
from typing import Any, Optional, Union, Callable, Coroutine
import sqlalchemy as sa
from fastapi import Depends, HTTPException
import bcrypt

from fastapi.security import OAuth2PasswordBearer
import jwt
from jwt import ExpiredSignatureError, DecodeError, MissingRequiredClaimError

from core.config import get_settings
from core.database import async_session
from service.identity.models import User
from service.identity.schemas import AuthExceptionSchema

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login/", scheme_name="JWT")

settings = get_settings()


# region --------------------------------- Password ---------------------------------
def hash_password(password: str) -> bytes:
    """ Хэширует пароль при регитсрации """
    pwd_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password=pwd_bytes, salt=salt)
    return hashed_password


def verify_password(plain_password: str, hashed_password: bytes) -> bool:
    """Сравнивает хэшированный пароль с паролем из БД"""
    password_byte_enc = plain_password.encode('utf-8')
    return bcrypt.checkpw(password=password_byte_enc, hashed_password=hashed_password)


# endregion -------------------------------------------------------------------------

# region ---------------------------------- JWT -------------------------------------
def create_token(
        data: dict,
        secret_key: str,
        minutes: int,
        algorithm,
        expires_delta: timedelta | None
) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=minutes)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, secret_key, algorithm=algorithm)
    return encoded_jwt


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """ Создает access_token для пользователя с указанным email """
    data.update({"type": "access"})
    access_token = create_token(
        data,
        settings.secret_key,
        settings.access_token_expire_minutes,
        settings.algorithm,
        expires_delta
    )
    return access_token


def create_refresh_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """ Создает refresh_token для пользователя с указанным email """
    data.update({"type": "refresh"})
    refresh_token = create_token(
        data,
        settings.refresh_secret_key,
        settings.refresh_token_expire_minutes,
        settings.algorithm,
        expires_delta
    )
    return refresh_token


def jwt_decode(token: str, secret_key: str, algorithm: str) -> dict[str, Any]:
    """ Декодирование access_token """
    payload = jwt.decode(token, secret_key, algorithms=algorithm)
    return payload


# endregion -------------------------------------------------------------------------

# region --------------------------------- User -------------------------------------
async def get_user_by_email(email: str) -> Optional[User]:  # ToDo: Заменить на метод репозитория
    """Получить пользователя по почте."""
    async with async_session() as session:
        result = await session.execute(
            sa.select(User)
            .where(sa.and_(
                User.email == email,
                User.deleted.__eq__(False),
            ))
        )
        user = result.scalar_one_or_none()
        return None if not user else user


async def get_data_user(
        roles: Union[Optional[tuple[str, ...]]], token: str,
) -> Union[User, AuthExceptionSchema]:
    """Получить данные пользователя."""
    credentials_exception = {
        "status_code": 401,
        "detail": "Не удалось подтвердить учетные данные",
        "headers": {"WWW-Authenticate": "Bearer"},
    }
    try:
        payload = jwt_decode(token, settings.secret_key, settings.algorithm)
    except ExpiredSignatureError:
        return AuthExceptionSchema(
            status_code=403,
            detail="Срок действия вашего токена истек. "
                   "Пожалуйста, войдите в систему еще раз."
        )
    except DecodeError:
        return AuthExceptionSchema(
            status_code=403,
            detail="Ошибка при расшифровке токена. "
                   "Пожалуйста, проверьте свой запрос."
        )
    except MissingRequiredClaimError:
        return AuthExceptionSchema(
            status_code=403,
            detail="В вашем токене нет обязательного поля. "
                   "Пожалуйста, свяжитесь с администратором."
        )

    if datetime.fromtimestamp(payload.get("exp")) < datetime.now():
        return AuthExceptionSchema(**credentials_exception)
    email = payload.get("sub")
    if email is None:
        return AuthExceptionSchema(**credentials_exception)

    data_user = await get_user_by_email(email)

    if data_user is None:
        return AuthExceptionSchema(**credentials_exception)
    if roles:
        is_valid_role = any([req_role == data_user.role for req_role in roles])
        if not is_valid_role:
            return AuthExceptionSchema(
                status_code=403,
                detail=f"Для этого действия требуется одна из "
                       f"ролей: '{', '.join(req_role for req_role in roles)}'",
            )
    return data_user


def get_current_user(
        roles: Optional[tuple[str, ...]] = None,
) -> Callable[[Any], Coroutine[Any, Any, User]]:
    """Возвращает авторизованного пользователя."""

    async def current_user(
            token: str = Depends(oauth2_scheme),
    ) -> Union[User, AuthExceptionSchema]:
        """Поиск текущего пользователя."""
        response = await get_data_user(token=token, roles=roles)
        if isinstance(response, AuthExceptionSchema):
            raise HTTPException(**response.dict())
        return response

    return current_user


# endregion -------------------------------------------------------------------------


# region --------------------------------- Verified ---------------------------------

def generated_code():
    """ Генерация кода для верификации пользователя """
    code = ''.join(random.choice(string.digits) for _ in range(4))
    return code
# endregion -------------------------------------------------------------------------
