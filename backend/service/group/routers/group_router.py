from http import HTTPStatus

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response

from core.schemas.base import Message
from core.utils.logger import logger
from service.identity.models import User
from service.identity.repositories.user_repository import UserRepository

from service.group.schemas import GroupFilterSchema, GroupViewSchemaForPage, CreateGroupSchema, EditGroupSchema, \
    GroupResponseModel
from service.group.services.group_service import GroupService
from service.group.dependensies import group_service

from service.identity.dependensies import user_repository
from service.identity.security import get_current_user

group_router = APIRouter(
    prefix="/api/v1/group",
    tags=["Group"]
)


@group_router.get(
    "/{group_id}",
    summary="Получение группы по Id",
    response_model=GroupResponseModel,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def get_group(group_id: int,
                    group_service: Annotated[GroupService, Depends(group_service)],
                    user: User = Depends(get_current_user(("admin", "supervisor", "trainer")))
                    ):
    """ admin, supervisor, trainer """
    try:
        group = await group_service.get(group_id)
        if group:
            return group
        logger.error("Group not found")
        return Response(status_code=HTTPStatus.BAD_REQUEST.value)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)


@group_router.get(
    "/",
    summary=" Получение всех групп",
    response_model=GroupViewSchemaForPage,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def get_all_groups(
        group_service: Annotated[GroupService, Depends(group_service)],
        filters: GroupFilterSchema = Depends(),
        user: User = Depends(get_current_user(("admin", "supervisor", "trainer")))

):
    """ admin, supervisor, trainer """
    try:
        group_list = await group_service.get_all_by_filters(filters)
        return group_list
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)


@group_router.post(
    "/",
    summary="Создание группы",
    response_model=int,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        409: {"model": Message, "description": "Конфликт данных"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def create_group(model: CreateGroupSchema,
                       group_service: Annotated[GroupService, Depends(group_service)],
                       user_repository: Annotated[UserRepository, Depends(user_repository)],
                       user: User = Depends(get_current_user(("admin", "supervisor", "trainer")))
                       ):
    """ admin, supervisor, trainer """
    try:
        if not await user_repository.trainer_exists(model.trainer_id):
            logger.error("Trainer not found")
            return Response(status_code=HTTPStatus.BAD_REQUEST.value)
        group_id = await group_service.add(model)
        if group_id:
            return group_id
        logger.error("Group existing")
        return Response(status_code=HTTPStatus.CONFLICT.value)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)


@group_router.put(
    "/",
    summary="Изменение группы",
    response_model=bool,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        409: {"model": Message, "description": "Конфликт данных"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def edit_group(
        model: EditGroupSchema,
        group_service: Annotated[GroupService, Depends(group_service)],
        user_repository: Annotated[UserRepository, Depends(user_repository)],
        user: User = Depends(get_current_user(("admin", "supervisor", "trainer")))
):
    """admin, supervisor, trainer"""
    try:
        if not await user_repository.trainer_exists(model.trainer_id):
            logger.error("Trainer not found")
            return Response(status_code=HTTPStatus.BAD_REQUEST.value)
        result = await group_service.edit(model)
        if result:
            return result
        logger.error("Group already exists")
        return Response(status_code=HTTPStatus.BAD_REQUEST.value)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)


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
        group_service: Annotated[GroupService, Depends(group_service)],
        user: User = Depends(get_current_user(("admin", "supervisor", "trainer")))
):
    """admin, supervisor, trainer"""
    deleted = await group_service.delete(group_id)
    if deleted:
        return Response(status_code=HTTPStatus.NO_CONTENT.value)
    logger.error("Group not found")
    raise HTTPException(status_code=400)


@group_router.delete(
    "/remove/{group_id}",
    summary="Удаление устройства из базы",
    status_code=HTTPStatus.NO_CONTENT.value,
    responses={
        204: {"description": "Нет данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def remove_device(
        group_id: int,
        group_service: Annotated[GroupService, Depends(group_service)],
        user: User = Depends(get_current_user(("admin", "supervisor", "trainer")))
):
    """admin, supervisor"""
    group = await group_service.delete_db(group_id)
    if group:
        return Response(status_code=HTTPStatus.NO_CONTENT.value)
    logger.error("Device not found")
    raise HTTPException(status_code=400)
