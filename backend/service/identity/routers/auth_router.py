from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Cookie
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import status
from starlette.responses import Response

from core.schemas.base import Message
from core.utils.logger import logger
from service.identity.models import User
from service.identity.schemas import TokenInfoSchema, LogoutResponseSchema
from service.identity.security import create_access_token, create_refresh_token, get_current_user
from service.identity.services.auth_service import AuthService
from service.identity.dependensies import auth_service

auth_routers = APIRouter(
    prefix="/api/v1/auth",
    tags=["Auth"]
)


@auth_routers.post(
    "/login/",
    summary="Авторизация пользователя",
    responses={
        200: {"description": "Успешная обработка данных"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def login(
        auth_service: Annotated[AuthService, Depends(auth_service)],
        response: Response,
        data: OAuth2PasswordRequestForm = Depends(),
) -> TokenInfoSchema:
    """
    Роутер для входа в учетную запись пользователя.

    Обязательные аргументы:
    * *`username`* *(email)* - ввод почты.

    * *`password`* - ввод пароля.
    """
    user = await auth_service.authenticate_user(data)
    if user:
        access_token = create_access_token(data={"sub": user.email})
        refresh_token = create_refresh_token(data={"sub": user.email})
        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            secure=True,
        )
        return TokenInfoSchema(access_token=access_token)


@auth_routers.post(
    '/refresh-token/',
    summary="Обновление токена доступа",
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
    status_code=201
)
async def refresh_token(
        refresh: Annotated[str, Cookie(alias="refresh_token", include_in_schema=False)],
        response: Response,
        auth_service: Annotated[AuthService, Depends(auth_service)],
) -> TokenInfoSchema:
    """
    Контроллер для обновления токена доступа.

    Аргументы:
    * *`refresh_token`* - токен обновления (*скрытый*).
    """
    user = await auth_service.get_user_for_update_tokens(refresh)
    access_token = create_access_token(data={"sub": user.email})
    refresh_token = create_refresh_token(data={"sub": user.email})
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,
    )
    return TokenInfoSchema(access_token=access_token)



@auth_routers.post(path="/logout/")
async def logout_user(
        response: Response,
        current_user: User = Depends(get_current_user())
) -> LogoutResponseSchema:
    """Контроллер для выхода из учетной записи."""
    response.delete_cookie("refresh_token", httponly=True, secure=True)
    return LogoutResponseSchema()
