from http import HTTPStatus
from typing import Annotated, Optional

from fastapi import APIRouter, Depends, Response, HTTPException, Query
from fastapi.responses import JSONResponse

from core.schemas.base import Message
from core.utils.logger import logger
from service.identity.models import User
from service.identity.schemas import UserSchemaForTable, UserFilterSchema, UserViewSchemaForPage, AdminPanelEditSchema
from service.identity.security import get_current_user
from service.identity.services.admin_service import AdminService
from service.identity.dependensies import admin_service

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
        admin_service: Annotated[AdminService, Depends(admin_service)],
        filters: UserFilterSchema = Depends(),
        deleted: bool = Query(default=None, description="Удаленные пользователи"),
        current_user: User = Depends(get_current_user(("admin",)))
):
    try:
        user_list = await admin_service.get_all_by_filters(filters, deleted)
        return user_list
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail=e.__str__())


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
        admin_service: Annotated[AdminService, Depends(admin_service)],
        current_user: User = Depends(get_current_user(("admin",)))
):
    try:
        user = await admin_service.get_with_deleted(user_id)
        if user:
            return user
        logger.error({"user_id": user_id, "message": "User not exist"})
        return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="User not exist")
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail=e.__str__())

@admin_panel_router.put(
    "/users/",
    response_model=bool,
    summary="Редактирование пользователей",
    responses={
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def edit_user(
        data: AdminPanelEditSchema,
        admin_service: Annotated[AdminService, Depends(admin_service)],
        current_user: User = Depends(get_current_user(("admin",)))
):
    """ admin """
    try:
        result = await admin_service.edit(data)
        if result:
            return result
        logger.error({"user_id": current_user.id, "message": "User not exist"})
        return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="User not exist")
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail=e.__str__())


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
        admin_service: Annotated[AdminService, Depends(admin_service)],
        current_user: User = Depends(get_current_user(("admin",)))
):
    """ admin """
    deleted = await admin_service.delete(user_id)
    if deleted:
        return Response(status_code=HTTPStatus.NO_CONTENT.value)
    logger.error("User not exist")
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
        admin_service: Annotated[AdminService, Depends(admin_service)],
        current_user: User = Depends(get_current_user(("admin",)))
):
    """ admin """
    group = await admin_service.delete_db(user_id)
    if group:
        return Response(status_code=HTTPStatus.NO_CONTENT.value)
    logger.error("User not found")
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="User not exist")
