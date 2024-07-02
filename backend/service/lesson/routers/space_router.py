from http import HTTPStatus

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response

from core.schemas.base import Message
from core.logger import logger
from service.users.models import User
from service.identity.security import get_current_user

from service.lesson.schemas.space_schemas import SpaceSchemaForTable, SpaceViewSchemaForPage, SpaceFilterSchema, \
    CreateSpaceSchema, EditSpaceSchema
from service.lesson.services.space_service import SpaceService
from service.lesson.dependensies import space_service

space_router = APIRouter(
    prefix="/api/v1/space",
    tags=["Space"]
)


@space_router.get(
    "/{space_id}",
    summary="Получение кабинета занятия по Id",
    response_model=SpaceSchemaForTable,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def get_space(
        space_id: int,
        space_service: Annotated[SpaceService, Depends(space_service)],
        current_user: User = Depends(get_current_user(("admin", "supervisor", "trainer")))
                       ):
    """ admin, supervisor, trainer """
    try:
        space = await space_service.get(space_id)
        if space:
            return space
        logger.error("Space not found")
        return Response(status_code=HTTPStatus.BAD_REQUEST.value)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)


@space_router.get(
    "/",
    summary=" Получение всех кабинетов занятий",
    response_model=SpaceViewSchemaForPage,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def get_all_spaces(
        space_service: Annotated[SpaceService, Depends(space_service)],
        filters: SpaceFilterSchema = Depends(),
        current_user: User = Depends(get_current_user(("admin", "supervisor", "trainer")))
):
    """ admin, supervisor, trainer """
    try:
        space_list = await space_service.get_all_by_filters(filters)
        return space_list
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)


@space_router.post(
    "/",
    summary="Создание кабинета занятия",
    # response_model=
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def create_training(
        model: CreateSpaceSchema,
        space_service: Annotated[SpaceService, Depends(space_service)],
        current_user: User = Depends(get_current_user(("admin", "supervisor", "trainer")))
):
    """admin, supervisor, trainer"""
    try:
        space_id = await space_service.add(model)
        if space_id:
            return space_id
        logger.error("Space existing")
        return Response(status_code=HTTPStatus.CONFLICT.value)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)

@space_router.put(
    "/",
    summary="Изменение кабинета занятия",
    response_model=bool,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        409: {"model": Message, "description": "Конфликт данных"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def edit_training(
        model: EditSpaceSchema,
        space_service: Annotated[SpaceService, Depends(space_service)],
        current_user: User = Depends(get_current_user(("admin", "supervisor", "trainer")))
):
    """admin, supervisor, trainer"""
    try:
        result = await space_service.edit(model)
        if result:
            return result
        logger.error("Space already exists")
        return Response(status_code=HTTPStatus.BAD_REQUEST.value)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)

@space_router.delete(
    "/{space_id}",
    summary="Удаление кабинета занятия",
    status_code=HTTPStatus.NO_CONTENT.value,
    responses={
        204: {"description": "Нет данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def delete_group(
        space_id: int,
        space_service: Annotated[SpaceService, Depends(space_service)],
        current_user: User = Depends(get_current_user(("admin",)))
):
    """admin, supervisor, trainer"""
    deleted = await space_service.delete(space_id)
    if deleted:
        return Response(status_code=HTTPStatus.NO_CONTENT.value)
    logger.error("Space not found")
    raise HTTPException(status_code=400)


@space_router.delete(
    "/remove/{space_id}",
    summary="Удаление кабинета занатий из базы",
    status_code=HTTPStatus.NO_CONTENT.value,
    responses={
        204: {"description": "Нет данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def remove_training(
        space_id: int,
        space_service: Annotated[SpaceService, Depends(space_service)],
        current_user: User = Depends(get_current_user(("admin",)))
):
    """ admin """
    training = await space_service.delete_db(space_id)
    if training:
        return Response(status_code=HTTPStatus.NO_CONTENT.value)
    logger.error("Space not found")
    raise HTTPException(status_code=400)