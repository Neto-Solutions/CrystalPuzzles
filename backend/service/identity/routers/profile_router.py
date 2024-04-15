import base64
from http import HTTPStatus
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Response

from core.schemas.base import Message
from core.utils.logger import logger
from service.identity.models import User
from service.identity.schemas import UserSchemaForTable, EditUserSchema, PhotoReadSchema
from service.identity.services.auth_service import AuthService
from service.identity.services.user_service import UserService
from service.identity.dependensies import user_service

profile_router = APIRouter(
    prefix="/api/v1/profile",
    tags=["Profile"]
)


@profile_router.get(
    "/",
    response_model=UserSchemaForTable,
    summary="Возвращает данные пользователя",
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def account(
        user: User = Depends(AuthService().get_current_user)
):
    """ authorized """
    return user.to_read_model


@profile_router.put(
    '/edit/',
    summary="Редактирование данных пользователя",
    response_model=bool,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def edit_account(
        data: EditUserSchema,
        user_service: Annotated[UserService, Depends(user_service)],
        user: User = Depends(AuthService().get_current_user),
):
    """ authorized """
    try:
        data.email = user.email
        data.id = user.id
        result = await user_service.edit(data)
        if result:
            return result
        logger.error({"user_id": user.id, "message": "Incorrect code"})
        return Response(status_code=HTTPStatus.BAD_REQUEST.value)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)


@profile_router.get(
    '/edit/',
    response_model=EditUserSchema,
    summary="Возвращает данные пользователя для редактирования",
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def edit_account_view(
        user: User = Depends(AuthService().get_current_user)
):
    """ authorized """
    return user


# @profile_router.put('/remove/')
# async def delete_account(
#         user: User = Depends(AuthService().get_current_user),
#         session: AsyncSession = Depends(get_async_session)
# ):
#     """ Удаление данных пользователя """
#     stmt = update(User).where(User.id == user.id).values(is_active=False)
#     await session.execute(stmt)
#     await session.commit()
#     return {'status': 'Account deleted successfully'}


@profile_router.put(
    "/set-photo/",
    response_model=bool,
    summary=" Установить фото пользователя",
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def set_photo(
        user_service: Annotated[UserService, Depends(user_service)],
        file: UploadFile = File(...),
        user: User = Depends(AuthService().get_current_user),
):
    """ authorized """
    try:
        contents = await file.read()
        encoded_file = base64.b64encode(contents)  # ToDo: проверка на размер и формат
        result = await user_service.set_photo(encoded_file, user.id)
        if result:
            return result
        logger.error({"user_id": user.id, "message": "Invalid page"})
        return Response(status_code=HTTPStatus.BAD_REQUEST.value)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)


@profile_router.delete(
    "/remove-photo/",
    response_model=bool,
    summary="Удалить фото пользователя",
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def remove_photo(
        user_service: Annotated[UserService, Depends(user_service)],
        user: User = Depends(AuthService().get_current_user)
):
    """ authorized """
    try:
        result = await user_service.delete_photo(user.id)
        if result:
            return result
        logger.error({"user_id": user.id, "message": "Invalid operation"})
        return Response(status_code=HTTPStatus.BAD_REQUEST.value)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)


@profile_router.get(
    "/get-photo/",
    response_model=PhotoReadSchema,
    summary="Получить фото пользователя",
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def get_photo(
        user_service: Annotated[UserService, Depends(user_service)],
        user: User = Depends(AuthService().get_current_user)
):
    """ authorized """
    try:
        result = await user_service.get_photo(user.id)
        if result or result is None:
            return PhotoReadSchema(photo=result)
        logger.error({"user_id": user.id, "message": "Invalid"})
        return Response(status_code=HTTPStatus.BAD_REQUEST.value)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)
