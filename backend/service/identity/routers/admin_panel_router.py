from http import HTTPStatus
from typing import Annotated

from fastapi import APIRouter, Depends, Response, HTTPException

from core.schemas.base import Message
from core.utils.logger import logger
from service.identity.models import User
from service.identity.schemas import UserSchemaForTable, UserFilterSchema, UserViewSchemaForPage
from service.identity.services.auth_service import get_current_user_with_role
from service.identity.services.user_service import UserService
from service.identity.dependensies import user_service

admin_panel_router = APIRouter(
    prefix="/api/v1/admin-panel",
    tags=["AdminPanel"]
)

@admin_panel_router.get(
    "/",
    response_model=UserViewSchemaForPage,
    summary="Возвращает данные пользователя по id",
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def get_all_users(
        user_service: Annotated[UserService, Depends(user_service)],
        filters: UserFilterSchema = Depends(),
        user: User = Depends(get_current_user_with_role(["admin"]))
):
    try:
        user_list = await user_service.get_all_by_filters(filters)
        return user_list
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)

@admin_panel_router.get(
    "/{user_id}",
    response_model=UserSchemaForTable,
    summary="Возвращает данные пользователя по id",
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def get_user_by_id(
        user_id: int,
        user_service: Annotated[UserService, Depends(user_service)],
        user: User = Depends(get_current_user_with_role(["admin"])),
):
    user = await user_service.get(user_id)  # ToDO: With deleted
    if user:
        return user
    logger.error({"user_id": user_id, "message": "User not exist"})
    return Response(status_code=HTTPStatus.BAD_REQUEST.value)


# @admin_panel_router
# async def edit_user():
#     ...
#
#
# @admin_panel_router
# async def delete_user():
#     ...
#
#
# @admin_panel_router
# async def remove_user():
#     ...
