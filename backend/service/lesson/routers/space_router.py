from http import HTTPStatus

from fastapi import APIRouter, Response
from starlette.responses import JSONResponse

from common.dependensies import TrainerSupervisorAdminDep, AdminDep, SupervisorAdminDep
from common.schema.base_schemas import Message
from service.lesson.dependensies import SpaceServiceDep, SpaceFilterDep, SpaceUOWDep

from service.lesson.schemas.space_schemas import SpaceSchemaForTable, SpaceViewSchemaForPage, \
    CreateSpaceSchema, EditSpaceSchema

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
        uow: SpaceUOWDep,
        space_service: SpaceServiceDep,
        current_user: TrainerSupervisorAdminDep
):
    """ admin, supervisor, trainer """
    result = await space_service.get(uow, space_id)
    if result:
        return result
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Space not found")


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
        uow: SpaceUOWDep,
        space_service: SpaceServiceDep,
        filters: SpaceFilterDep,
        current_user: TrainerSupervisorAdminDep
):
    """ admin, supervisor, trainer """
    result = await space_service.get_all_by_filters(uow, filters)
    return result


@space_router.post(
    "/",
    summary="Создание кабинета занятия",
    response_model=int,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def create_space(
        model: CreateSpaceSchema,
        uow: SpaceUOWDep,
        space_service: SpaceServiceDep,
        current_user: SupervisorAdminDep
):
    """admin, supervisor"""
    result = await space_service.add(uow, model)
    if result:
        return result
    return JSONResponse(status_code=HTTPStatus.CONFLICT.value, content="Space existing")


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
        uow: SpaceUOWDep,
        space_service: SpaceServiceDep,
        current_user: SupervisorAdminDep
):
    """admin, supervisor"""
    result = await space_service.edit(uow, model)
    if result:
        return result
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Space already exists")


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
        uow: SpaceUOWDep,
        space_service: SpaceServiceDep,
        current_user: SupervisorAdminDep
):
    """admin, supervisor"""
    result = await space_service.delete(uow, space_id)
    if result:
        return Response(status_code=HTTPStatus.NO_CONTENT.value)
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Space not found")


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
        uow: SpaceUOWDep,
        space_service: SpaceServiceDep,
        current_user: AdminDep
):
    """ admin """
    result = await space_service.delete_db(uow, space_id)
    if result:
        return Response(status_code=HTTPStatus.NO_CONTENT.value)
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Space not found")
