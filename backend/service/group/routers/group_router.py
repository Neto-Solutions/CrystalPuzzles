from http import HTTPStatus

from typing import Annotated, Optional

from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.responses import JSONResponse

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
    response_model=Optional[GroupResponseModel],
    responses={
        401: {"description": "Не авторизованный пользователь"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def get_group(group_id: int,
                    group_service: Annotated[GroupService, Depends(group_service)],
                    user: User = Depends(get_current_user(("admin", "supervisor", "trainer")))
                    ):
    """ admin, supervisor, trainer """
    try:
        group = await group_service.get_with_students(group_id)
        if group:
            return group
        logger.error("Group not found")
        return None
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail=str(e))


@group_router.get(
    "/",
    summary=" Получение всех групп",
    response_model=GroupViewSchemaForPage,
    responses={
        401: {"description": "Не авторизованный пользователь"},
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
        raise HTTPException(status_code=500, detail=e.__str__())


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
async def create_group(model: CreateGroupSchema,
                       group_service: Annotated[GroupService, Depends(group_service)],
                       user_repository: Annotated[UserRepository, Depends(user_repository)],
                       user: User = Depends(get_current_user(("admin", "supervisor", "trainer")))
                       ):
    """ admin, supervisor, trainer """
    try:
        if not await user_repository.trainer_exists(model.trainer_id):
            logger.error("Trainer not found")
            return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Trainer not found")
        group_id = await group_service.add(model)
        if group_id:
            return group_id
        logger.error("Group existing")
        return JSONResponse(status_code=HTTPStatus.CONFLICT.value, content="Group existing")
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail=e.__str__())


@group_router.put(
    "/",
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
        group_service: Annotated[GroupService, Depends(group_service)],
        user_repository: Annotated[UserRepository, Depends(user_repository)],
        user: User = Depends(get_current_user(("admin", "supervisor", "trainer")))
):
    """admin, supervisor, trainer"""
    try:
        if not await user_repository.trainer_exists(model.trainer_id):
            logger.error("Trainer not found")
            return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Trainer not found")
        result = await group_service.edit(model)
        if result:
            return result
        elif result.__eq__(False):
            logger.error("Group not found")
            return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Group not found")
        logger.error("Group already exists")
        return JSONResponse(status_code=HTTPStatus.CONFLICT.value, content="Group already exists")
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail=e.__str__())


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
        group_service: Annotated[GroupService, Depends(group_service)],
        user: User = Depends(get_current_user(("admin", )))
):
    """admin"""
    group = await group_service.delete_db(group_id)
    if group:
        return Response(status_code=HTTPStatus.NO_CONTENT.value)
    logger.error("Group not found")
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Group not found")
