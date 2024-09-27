from http import HTTPStatus

from fastapi import APIRouter, Response, Query
from starlette.responses import JSONResponse

from common.dependensies import AdminDep
from common.schema.base_schemas import Message
from service.users.dependensies import UserFilterDep, AdminPanelServiceDep, UserUOWDep
from service.users.schemas import UserSchemaForTable, UserViewSchemaForPage, AdminPanelEditSchema

admin_panel_router = APIRouter(
    prefix="/api/v1/admin-panel",
    tags=["AdminPanel"]
)


@admin_panel_router.get(
    "/users/",
    response_model=UserViewSchemaForPage,
    summary="Возвращает данные всех пользователей",
    responses={
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def get_all_users(
        uow: UserUOWDep,
        admin_service: AdminPanelServiceDep,
        filters: UserFilterDep,
        current_user: AdminDep,
        deleted: bool = Query(default=None, description="Удаленные пользователи"),
):
    """ admin """
    result = await admin_service.get_all_by_filters(uow, filters, deleted)
    return result


@admin_panel_router.get(
    "/users/{user_id}",
    response_model=UserSchemaForTable,
    summary="Возвращает данные пользователя по id",
    responses={
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def get_user_by_id(
        user_id: int,
        uow: UserUOWDep,
        admin_service: AdminPanelServiceDep,
        current_user: AdminDep
):
    """ admin """
    result = await admin_service.get_with_deleted(uow, user_id)
    if result:
        return result
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="User not exist")


@admin_panel_router.put(
    "/users/{user_id}",
    response_model=bool,
    summary="Редактирование пользователей",
    responses={
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def edit_user(
        data: AdminPanelEditSchema,
        uow: UserUOWDep,
        admin_service: AdminPanelServiceDep,
        current_user: AdminDep,
        user_id: int
):
    """ admin """
    data.id = user_id
    result = await admin_service.edit(uow, data)
    if result:
        return result
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="User not exist")


@admin_panel_router.delete(
    "/{user_id}",
    summary="Удаление пользователя",
    status_code=HTTPStatus.NO_CONTENT.value,
    responses={
        204: {"description": "Нет данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def delete_user(
        user_id: int,
        uow: UserUOWDep,
        admin_service: AdminPanelServiceDep,
        current_user: AdminDep
):
    """ admin """
    result = await admin_service.delete(uow, user_id)
    if result:
        return Response(status_code=HTTPStatus.NO_CONTENT.value)
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="User not exist")


@admin_panel_router.delete(
    "/remove/{user_id}",
    summary="Удаление пользователя из базы",
    status_code=HTTPStatus.NO_CONTENT.value,
    responses={
        204: {"description": "Нет данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def remove_user(
        user_id: int,
        uow: UserUOWDep,
        admin_service: AdminPanelServiceDep,
        current_user: AdminDep
):
    """ admin """
    result = await admin_service.delete_db(uow, user_id)
    if result:
        return Response(status_code=HTTPStatus.NO_CONTENT.value)
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="User not exist")
