import base64
from http import HTTPStatus
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Response
from pydantic import Field
from starlette.responses import JSONResponse

from core.schemas.base import Message
from core.utils.logger import logger
from service.identity.models import User
from service.identity.schemas import UserShortSchemaForTable, EditUserSchema, PhotoReadSchema, EditViewSchema, \
    AvatarSchema
from service.identity.security import get_current_user
from service.identity.services.user_service import UserService
from service.identity.dependensies import user_service

profile_router = APIRouter(
    prefix="/api/v1/profile",
    tags=["Profile"]
)


@profile_router.get(
    "/",
    response_model=UserShortSchemaForTable,
    summary="Возвращает данные пользователя",
    responses={
        401: {"description": "Не авторизованный пользователь"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def account(
        current_user: User = Depends(get_current_user())
):
    """ authorized """
    return current_user


@profile_router.put(
    '/edit/',
    summary="Редактирование данных пользователя",
    response_model=bool,
    responses={
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def edit_account(
        data: EditUserSchema,
        user_service: Annotated[UserService, Depends(user_service)],
        current_user: User = Depends(get_current_user())
):
    """ authorized """
    try:
        data.email = current_user.email
        data.id = current_user.id
        result = await user_service.edit(data)
        if result:
            return result
        logger.error({"user_id": current_user.id, "message": "Incorrect data"})
        return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Incorrect data")
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail=e.__str__())


@profile_router.get(
    '/edit/',
    response_model=EditViewSchema,
    summary="Возвращает данные пользователя для редактирования",
    responses={
        401: {"description": "Не авторизованный пользователь"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def edit_account_view(
        current_user: User = Depends(get_current_user())
):
    """ authorized """
    return current_user


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
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def set_photo(
        user_service: Annotated[UserService, Depends(user_service)],
        file: UploadFile = File(...),
        current_user: User = Depends(get_current_user())
):
    """ authorized """
    try:
        if file.size <= 0 or file.content_type not in ["image/jpeg", "image/png"]:
            logger.error(f"Invalid image file. Expected format: FastAPI.UploadFile, "
                         f"Content-type: image/jpeg, but got {file.content_type}")
            return JSONResponse(
                status_code=HTTPStatus.BAD_REQUEST.value,
                content=f"Invalid image file. Expected format: FastAPI.UploadFile, "
                        f"Content-type: image/jpeg, but got {file.content_type}")
        contents = await file.read()
        encoded_file = base64.b64encode(contents)
        result = await user_service.set_photo(encoded_file, current_user.id)
        if result:
            return result
        logger.error({"user_id": current_user.id, "message": "Invalid file"})
        return JSONResponse(
            status_code=HTTPStatus.BAD_REQUEST.value,
            content=f"Invalid image file")
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail=e.__str__())


@profile_router.delete(
    "/remove-photo/",
    summary="Удалить фото пользователя",
    status_code=HTTPStatus.NO_CONTENT.value,
    responses={
        204: {"description": "Нет данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def remove_photo(
        user_service: Annotated[UserService, Depends(user_service)],
        current_user: User = Depends(get_current_user())
):
    """ authorized """
    try:
        if not current_user.photo:
            logger.error({"user_id": current_user.id, "message": "Invalid operation"})
            return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Photo not found")
        await user_service.delete_photo(current_user.id)
        return Response(status_code=HTTPStatus.NO_CONTENT.value)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail=e.__str__())


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
        current_user: User = Depends(get_current_user())
):
    """ authorized """
    try:
        result = await user_service.get_photo(current_user.id)
        if result or result is None:
            return PhotoReadSchema(photo=result)
        logger.error({"user_id": current_user.id, "message": "Invalid"})
        return Response(status_code=HTTPStatus.BAD_REQUEST.value)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)


@profile_router.post(
    "/set-avatar/",
    response_model=bool,
    summary="Выбрать дефолтный аватар",
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def set_avatar(
        user_service: Annotated[UserService, Depends(user_service)],
        avatar_schema: AvatarSchema,
        current_user: User = Depends(get_current_user())
):
    """ authorized """
    result = await user_service.set_avatar(avatar_schema, current_user.id)
    return result
