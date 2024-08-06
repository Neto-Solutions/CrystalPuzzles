from http import HTTPStatus

from fastapi import APIRouter
from starlette.responses import Response, JSONResponse

from common.dependensies import TrainerSupervisorAdminDep, AdminDep
from common.schema.base_schemas import Message
from service.training.dependensies import TrainingUOWDep, TrainingServiceDep, TrainingFilterDep
from service.training.schemas import CreateTrainingSchema, EditTrainingSchema, TrainingSchemaForTable, \
    TrainingViewSchemaForPage

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
        uow: TrainingUOWDep,
        training_service: TrainingServiceDep,
        current_user: TrainerSupervisorAdminDep
):
    """ admin, supervisor, trainer """
    training = await training_service.get(uow, training_id)
    if training:
        return training
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Training not found")


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
        filters: TrainingFilterDep,
        uow: TrainingUOWDep,
        training_service: TrainingServiceDep,
        current_user: TrainerSupervisorAdminDep
):
    """ admin, supervisor, trainer """
    training_list = await training_service.get_all_by_filters(uow, filters)
    return training_list


@training_router.post(
    "/",
    summary="Создание тренировки",
    response_model=int,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def create_training(
        model: CreateTrainingSchema,
        uow: TrainingUOWDep,
        training_service: TrainingServiceDep,
        current_user: TrainerSupervisorAdminDep
):
    """admin, supervisor, trainer"""
    training_id = await training_service.add(uow, model)
    if training_id:
        return training_id
    return JSONResponse(status_code=HTTPStatus.CONFLICT.value, content="Training existing")


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
        uow: TrainingUOWDep,
        training_service: TrainingServiceDep,
        current_user: TrainerSupervisorAdminDep
):
    """admin, supervisor, trainer"""
    result = await training_service.edit(uow, model)
    if result:
        return result
    elif result is False:
        return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Training not found")
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Training already exists")


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
        uow: TrainingUOWDep,
        training_service: TrainingServiceDep,
        current_user: TrainerSupervisorAdminDep
):
    """admin, supervisor, trainer"""
    deleted = await training_service.delete(uow, training_id)
    if deleted:
        return Response(status_code=HTTPStatus.NO_CONTENT.value)
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Training not found")


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
        uow: TrainingUOWDep,
        training_service: TrainingServiceDep,
        current_user: AdminDep
):
    """ admin """
    training = await training_service.delete_db(uow, training_id)
    if training:
        return Response(status_code=HTTPStatus.NO_CONTENT.value)
    return JSONResponse(status_code=400, content="Training not found")
