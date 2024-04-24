from http import HTTPStatus
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from starlette.responses import Response

from core.schemas.base import Message
from core.utils.logger import logger
from service.identity.models import User
from service.identity.services.auth_service import get_current_user_with_role
from service.training.schemas import CreateTrainingSchema, EditTrainingSchema, TrainingSchemaForTable, \
    TrainingViewSchemaForPage, TrainingFilterSchema
from service.training.service import TrainingService
from service.training.dependensies import training_service

training_router = APIRouter(
    prefix="/api/v1/training",
    tags=["Training"]
)


@training_router.get(
    "/{training_id}",
    summary="Получение тренировки по Id",
    response_model=TrainingSchemaForTable,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def get_training(
        training_id: int,
        training_service: Annotated[TrainingService, Depends(training_service)],
        user: User = Depends(get_current_user_with_role(["admin", "supervisor", "trainer"]))
                       ):
    """ admin, supervisor, trainer """
    try:
        training = await training_service.get(training_id)
        if training:
            return training
        logger.error("Training not found")
        return Response(status_code=HTTPStatus.BAD_REQUEST.value)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)


@training_router.get(
    "/",
    summary=" Получение всех тренировок",
    response_model=TrainingViewSchemaForPage,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def get_all_training(
        training_service: Annotated[TrainingService, Depends(training_service)],
        filters: TrainingFilterSchema = Depends(),
        user: User = Depends(get_current_user_with_role(["admin", "supervisor", "trainer"]))
):
    """ admin, supervisor, trainer """
    try:
        training_list = await training_service.get_all_by_filters(filters)
        return training_list
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)


@training_router.post(
    "/",
    summary="Создание тренировки",
    # response_model=
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def create_training(
        model: CreateTrainingSchema,
        training_service: Annotated[TrainingService, Depends(training_service)],
        user: User = Depends(get_current_user_with_role(["admin", "supervisor", "trainer"]))
):
    """admin, supervisor, trainer"""
    try:
        training_id = await training_service.add(model)
        if training_id:
            return training_id
        logger.error("Training existing")
        return Response(status_code=HTTPStatus.CONFLICT.value)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)

@training_router.put(
    "/",
    summary="Изменение тренировки",
    response_model=bool,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        409: {"model": Message, "description": "Конфликт данных"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def edit_training(
        model: EditTrainingSchema,
        training_service: Annotated[TrainingService, Depends(training_service)],
        user: User = Depends(get_current_user_with_role(["admin", "supervisor", "trainer"]))
):
    """admin, supervisor, trainer"""
    try:
        result = await training_service.edit(model)
        if result:
            return result
        logger.error("Training already exists")
        return Response(status_code=HTTPStatus.BAD_REQUEST.value)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)

@training_router.delete(
    "/{training_id}",
    summary="Удаление тренировки",
    status_code=HTTPStatus.NO_CONTENT.value,
    responses={
        204: {"description": "Нет данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def delete_group(
        training_id: int,
        training_service: Annotated[TrainingService, Depends(training_service)],
        user: User = Depends(get_current_user_with_role(["admin"]))
):
    """admin, supervisor, trainer"""
    deleted = await training_service.delete(training_id)
    if deleted:
        return Response(status_code=HTTPStatus.NO_CONTENT.value)
    logger.error("Training not found")
    raise HTTPException(status_code=400)


@training_router.delete(
    "/remove/{training_id}",
    summary="Удаление тренировки из базы",
    status_code=HTTPStatus.NO_CONTENT.value,
    responses={
        204: {"description": "Нет данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def remove_training(
        training_id: int,
        training_service: Annotated[TrainingService, Depends(training_service)],
        user: User = Depends(get_current_user_with_role(["admin"]))
):
    """ admin """
    training = await training_service.delete_db(training_id)
    if training:
        return Response(status_code=HTTPStatus.NO_CONTENT.value)
    logger.error("Training not found")
    raise HTTPException(status_code=400)
