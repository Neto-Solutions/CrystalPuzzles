import base64
from http import HTTPStatus

from fastapi import APIRouter, HTTPException, UploadFile, File, Response
from starlette.responses import JSONResponse


from common.dependensies import UserDep
from common.schema.base_schemas import Message
from common.schema.base_user_schema import BaseUserSchema
from core.logger import logger
from service.users.dependensies import UserServiceDep, UserUOWDep
from service.users.schemas import EditUserSchema, PhotoReadSchema, EditViewSchema, \
    AvatarSchema

profile_router = APIRouter(
    prefix="/api/v1/profile",
    tags=["Profile"]
)


@profile_router.get(
    "/",
    response_model=BaseUserSchema,
    summary="Возвращает данные пользователя",
    responses={
        401: {"description": "Не авторизованный пользователь"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def account(
        current_user: UserDep
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
        uow: UserUOWDep,
        user_service: UserServiceDep,
        current_user: UserDep
):
    """ authenticate """
    data.id = current_user.id
    result = await user_service.edit(uow, data)
    if result:
        return result
    return JSONResponse(
        status_code=HTTPStatus.BAD_REQUEST.value,
        content="Incorrect data"
    )


@profile_router.get(
    '/edit/',
    response_model=EditViewSchema,
    summary="Возвращает данные пользователя для редактирования",
    responses={
        401: {"description": "Не авторизованный пользователь"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def edit_account_view(
        current_user: UserDep
):
    """ authenticate """
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
        uow: UserUOWDep,
        user_service: UserServiceDep,
        current_user: UserDep,
        file: UploadFile = File(...),

):
    """ authenticate """
    try:
        if file.size <= 0 or file.content_type not in ["image/jpeg", "image/jpeg", "image/png"]:
            return JSONResponse(
                status_code=HTTPStatus.BAD_REQUEST.value,
                content=f"Invalid image file. Expected format: FastAPI.UploadFile, "
                        f"Content-type: image/jpeg, but got {file.content_type}")
        if file.size > 500000:
            return JSONResponse(
                status_code=HTTPStatus.BAD_REQUEST.value,
                content=f"The file must not exceed 5MB.")
        result = await user_service.set_photo(uow, file, current_user.id)
        return result
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
        uow: UserUOWDep,
        user_service: UserServiceDep,
        current_user: UserDep
):
    """ authenticate """
    if not current_user.photo:
        logger.error({"user_id": current_user.id, "message": "Photo not found"})
        return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Photo not found")
    await user_service.delete_photo(uow, current_user.id)
    return Response(status_code=HTTPStatus.NO_CONTENT.value)


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
        uow: UserUOWDep,
        user_service: UserServiceDep,
        current_user: UserDep
):
    """ authenticate """
    result = await user_service.get_photo(uow, current_user.id)
    if result or result is None:
        return PhotoReadSchema(photo=result)
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Invalid")


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
        uow: UserUOWDep,
        user_service: UserServiceDep,
        avatar_schema: AvatarSchema,
        current_user: UserDep
):
    """ authenticate """
    result = await user_service.set_avatar(uow, avatar_schema, current_user.id)
    return result
