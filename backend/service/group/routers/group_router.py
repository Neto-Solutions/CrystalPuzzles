from http import HTTPStatus

from typing import Optional

from fastapi import APIRouter, Response
from fastapi.responses import JSONResponse

from common.dependensies import TrainerSupervisorAdminDep, AdminDep
from common.schema.base_schemas import Message
from service.group.dependensies import GroupUOWDep, GroupServiceDep, GroupFilterDep
from service.users.dependensies import UserUOWDep

from service.group.schemas import GroupViewSchemaForPage, CreateGroupSchema, EditGroupSchema, \
    GroupResponseModel

group_router = APIRouter(
    prefix="/api/v1/group",
    tags=["Group"]
)


@group_router.get(
    "/{group_id}",
    summary="Получение группы по Id",
    response_model=Optional[GroupResponseModel],
    responses={
        401: {"description": "Не авторизованный пользователь"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def get_group(
        group_id: int,
        uow: GroupUOWDep,
        group_service: GroupServiceDep,
        current_user: TrainerSupervisorAdminDep,
):
    """ admin, supervisor, trainer """
    result = await group_service.get_with_students(uow, group_id)
    if result:
        return result
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Group not found")


@group_router.get(
    "/",
    summary=" Получение всех групп",
    response_model=GroupViewSchemaForPage,
    responses={
        401: {"description": "Не авторизованный пользователь"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def get_all_groups(
        uow: GroupUOWDep,
        group_service: GroupServiceDep,
        filters: GroupFilterDep,
        current_user: TrainerSupervisorAdminDep
):
    """ admin, supervisor, trainer """
    result = await group_service.get_all_by_filters(uow, filters)
    return result


@group_router.post(
    "/",
    summary="Создание группы",
    response_model=int,
    responses={
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        409: {"model": Message, "description": "Конфликт данных"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def create_group(
        model: CreateGroupSchema,
        uow: GroupUOWDep,
        user_uow: UserUOWDep,
        group_service: GroupServiceDep,
        current_user: TrainerSupervisorAdminDep
):
    """ admin, supervisor, trainer """
    result = await group_service.add(uow, model, user_uow=user_uow)
    if result:
        return result
    return JSONResponse(status_code=HTTPStatus.CONFLICT.value, content="Group existing")


@group_router.put(
    "/{group_id}",
    summary="Изменение группы",
    response_model=bool,
    responses={
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        409: {"model": Message, "description": "Конфликт данных"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def edit_group(
        model: EditGroupSchema,
        uow: GroupUOWDep,
        user_uow: UserUOWDep,
        group_service: GroupServiceDep,
        current_user: TrainerSupervisorAdminDep,
        group_id: int
):
    """admin, supervisor, trainer"""
    model.id = group_id
    result = await group_service.edit(uow, model, user_uow=user_uow)
    if result:
        return result
    elif result.__eq__(False):
        return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Group not found")
    return JSONResponse(status_code=HTTPStatus.CONFLICT.value, content="Group already exists")


@group_router.delete(
    "/{group_id}",
    summary="Удаление группы",
    status_code=HTTPStatus.NO_CONTENT.value,
    responses={
        204: {"description": "Нет данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def delete_group(
        group_id: int,
        uow: GroupUOWDep,
        group_service: GroupServiceDep,
        current_user: TrainerSupervisorAdminDep
):
    """admin, supervisor, trainer"""
    deleted = await group_service.delete(uow, group_id)
    if deleted:
        return Response(status_code=HTTPStatus.NO_CONTENT.value)
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Group not found")


@group_router.delete(
    "/remove/{group_id}",
    summary="Удаление группы из базы данных",
    status_code=HTTPStatus.NO_CONTENT.value,
    responses={
        204: {"description": "Нет данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def remove_device(
        group_id: int,
        uow: GroupUOWDep,
        group_service: GroupServiceDep,
        current_user: AdminDep
):
    """admin"""
    group = await group_service.delete_db(uow, group_id)
    if group:
        return Response(status_code=HTTPStatus.NO_CONTENT.value)
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Group not found")
