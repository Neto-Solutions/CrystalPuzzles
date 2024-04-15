from http import HTTPStatus
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response

from core.schemas.base import Message
from core.utils.logger import logger
from service.identity.models import User
from service.identity.schemas import CreateUserSchema, UserVerifiedEmailCode, UserChangePasswordSchema
from service.identity.services.auth_service import AuthService
from service.identity.services.user_service import UserService
from service.identity.dependensies import user_service, auth_service

user_router = APIRouter(
    prefix="/api/v1/user",
    tags=["Users"]
)

@user_router.post(
    "/register/",
    summary="Регистрация пользователя",
    response_model=int,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def register(
        data: CreateUserSchema,
        user_service: Annotated[UserService, Depends(user_service)],
):
    """ anyone """
    try:
        user_id = await user_service.add(data)
        if user_id:
            # try:
            #     send_code_email_verified.delay(user_dict)
            # except (SMTPDataError, SMTPRecipientsRefused):
            #     raise HTTPException(status_code=400, detail="Email verification failed")
            return user_id
        logger.error("Registration error")
        return Response(status_code=HTTPStatus.CONFLICT.value, content="Conflict")
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)


@user_router.post(
    '/verified/',
    summary="Верификация электронной почты",
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def email_verify(
        data: UserVerifiedEmailCode,
        user_service: Annotated[UserService, Depends(user_service)],
        user: User = Depends(AuthService().get_current_user),
):
    """ authenticate """
    try:
        if user.code == data.code:
            res = await user_service.verify(user.id)
            if res:
                return Response(status_code=HTTPStatus.OK.value)
        logger.error({"user_id": user.id, "message": "Incorrect code"})
        return Response(status_code=HTTPStatus.BAD_REQUEST.value)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)


@user_router.post(
    '/change-password/',
    summary="Смена пароля пользователя",
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def change_password(
        data: UserChangePasswordSchema,
        auth_service: Annotated[AuthService, Depends(auth_service)],
        user: User = Depends(AuthService().get_current_user),
):
    """ authenticate """
    try:
        if data.old_password != data.new_password:
            result = await auth_service.change_password(data, user)
            if result:
                return Response(status_code=HTTPStatus.OK.value)
            logger.error("You entered the wrong password")
        else:
            logger.error("Passwords may not be repeated")
        return Response(status_code=HTTPStatus.BAD_REQUEST.value)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)
