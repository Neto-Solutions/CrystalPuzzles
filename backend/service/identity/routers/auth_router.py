from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import status
from starlette.responses import Response

from core.schemas.base import Message
from core.utils.logger import logger
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
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def login(
        auth_service: Annotated[AuthService, Depends(auth_service)],
        data: OAuth2PasswordRequestForm = Depends(),
):
    """ Войти в учетную запись """
    try:
        user = await auth_service.authenticate_user(data.username, data.password)
        if user:
            access_token = await auth_service.create_access_token(data={"sub": user.email})
            refresh_token = await auth_service.create_refresh_token(data={"sub": user.email})
            return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}
        logger.error("Incorrect username or password")
        return Response(status_code=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)



@auth_routers.post(
    '/refresh-token/',
    summary="Обновление токена доступа",
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def refresh_token(
        refresh_token: str,
        auth_service: Annotated[AuthService, Depends(auth_service)],
):
    """ Обновить access token """
    try:
        token = await auth_service.refresh_token(refresh_token)
        if token:
            return token
        logger.error("Incorrect token")
        return Response(status_code=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)

