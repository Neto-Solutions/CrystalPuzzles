
from fastapi import APIRouter
from starlette.responses import Response

from common.dependensies import UserDep
from common.schema.base_schemas import Message
from service.identity.dependensies import AuthServiceDep, OAuth2PasswordDep, RefreshDep
from service.identity.schemas import TokenInfoSchema, LogoutResponseSchema
from service.identity.security import create_access_token, create_refresh_token

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
        auth_service: AuthServiceDep,
        response: Response,
        data: OAuth2PasswordDep,
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
        refresh: RefreshDep,
        response: Response,
        auth_service: AuthServiceDep,
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
        current_user: UserDep
) -> LogoutResponseSchema:
    """Контроллер для выхода из учетной записи."""
    response.delete_cookie("refresh_token", httponly=True, secure=True)
    return LogoutResponseSchema()
