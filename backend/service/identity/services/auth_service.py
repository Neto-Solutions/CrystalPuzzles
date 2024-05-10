from typing import Optional, Union

from fastapi import HTTPException
from fastapi.security import OAuth2PasswordRequestForm


from core.config import get_settings
from service.identity.models import User
from service.identity.schemas import AuthExceptionSchema
from service.identity.security import get_user_by_email, verify_password, jwt_decode, get_data_user

settings = get_settings()


class AuthService:
    """Сервис для работы аутентификации."""

    @staticmethod
    async def authenticate_user(form_data: OAuth2PasswordRequestForm) -> User:
        """Аутентификация пользователя для создания токенов."""
        data_user = await get_user_by_email(form_data.username)
        if not data_user:
            raise HTTPException(
                status_code=400,
                detail="Неверный адрес электронной почты",
                headers={"WWW-Authenticate": "Bearer"},
            )
        if not verify_password(
                form_data.password,
                hashed_password=data_user.hashed_password
        ):
            raise HTTPException(status_code=400, detail="Неверный пароль")
        return data_user

    @staticmethod
    async def get_user_for_update_tokens(refresh_token: str) -> User:
        """Получить пользователя для обновления токенов."""
        payload = jwt_decode(refresh_token, settings.refresh_secret_key, settings.algorithm)

        if payload["type"] == "refresh":
            email = payload["sub"]
            data_user = await get_user_by_email(email)
            return data_user
        else:
            raise HTTPException(status_code=400, detail="Неверный токен")

    @staticmethod
    async def get_data_user(
            token: str, roles: Optional[tuple[str, ...]]
    ) -> Union[User, AuthExceptionSchema]:
        """Получить данные текущего пользователя."""
        data_user = await get_data_user(roles, token)
        return data_user
