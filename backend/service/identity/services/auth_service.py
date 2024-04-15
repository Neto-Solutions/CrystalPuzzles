from datetime import timedelta, datetime

from fastapi import Depends, HTTPException, status

from jose import jwt, JWTError, ExpiredSignatureError

from core.config import settings
from service.identity.models import User
from service.identity.repositories.user_repository import UserRepository
from service.identity.schemas import TokenData, UserChangePasswordSchema
from service.identity.utils import pwd_context, oauth2_scheme, hash_password


class AuthService:
    def __init__(self):
        self.__user_repository = UserRepository()

    async def __verify_password(self, password: str, hashed_password: str) -> bool:
        """Сравнивает хэшированный пароль с паролем из БД"""
        return pwd_context.verify(password, hashed_password)

    async def __jwt_access_decode(self, token: str):
        """ Декодирование access_token """
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=settings.ALGORITHM)
        return payload

    async def __jwt_refresh_decode(self, token: str):
        """ Декодирование refresh_token """
        payload = jwt.decode(token, settings.REFRESH_SECRET_KEY, algorithms=settings.ALGORITHM)
        return payload

    async def change_password(self, data: UserChangePasswordSchema, user: User):
        if await self.__verify_password(data.old_password, user.hashed_password):
            res = await self.__user_repository.edit({
                "id": user.id,
                "hashed_password": hash_password(data.new_password),
                "date_update": datetime.now()
            })
            return res
        return None

    async def authenticate_user(self, email: str, password: str):
        """ Аутентификация пользователя """
        user = await self.__user_repository.get_by_email(email)
        if not user or not await self.__verify_password(password=password, hashed_password=user.hashed_password):
            return False
        return user

    async def create_access_token(self, data: dict, expires_delta: timedelta | None = None):
        """ Создает access_token для пользователя с указанным email """
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=int(settings.ACCESS_TOKEN_EXPIRE_MINUTES))
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
        return encoded_jwt

    async def create_refresh_token(self, data: dict, expires_delta: timedelta | None = None):
        """ Создает refresh_token для пользователя с указанным email """
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=int(settings.REFRESH_TOKEN_EXPIRE_MINUTES))
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, settings.REFRESH_SECRET_KEY, settings.ALGORITHM)
        return encoded_jwt

    async def get_current_user(self, token: str = Depends(oauth2_scheme)):
        """ Возвращает авторизованного пользователя """
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        try:
            payload = await self.__jwt_access_decode(token)
            if datetime.fromtimestamp(payload.get("exp")) < datetime.now():
                raise credentials_exception
            username: str = payload.get("sub")
            if username is None:
                raise credentials_exception
            token_data = TokenData(username=username)
        except JWTError:
            raise credentials_exception
        user = await self.__user_repository.get_by_email(email=token_data.username)
        if not user:
            raise credentials_exception
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user"
            )
        return user

    @staticmethod
    async def refresh_token(self, refresh_token: str):
        try:
            payload = await self.__jwt_refresh_decode(refresh_token)
        except (ExpiredSignatureError, JWTError):
            return False
        else:
            new_access_token = await self.create_access_token(data={"sub": payload.get("user_id")})
            return {"access_token": new_access_token, "token_type": "bearer"}


def get_current_user_with_role(roles: list):  # Todo: Проверить!!!
    """Ограничение пользователя по ролям """

    async def get_user_and_validate(user: User = Depends(AuthService().get_current_user)):
        if user.role not in roles:
            raise HTTPException(status_code=403, detail="Access denied")
        return user

    return get_user_and_validate
