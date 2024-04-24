from http import HTTPStatus

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response

from core.schemas.base import Message
from core.utils.logger import logger
from service.identity.models import User
from service.identity.repositories.user_repository import UserRepository

from service.identity.dependensies import user_repository

from service.lesson.dependensies import lesson_service, space_repository
from service.identity.services.auth_service import get_current_user_with_role
from service.lesson.repositories.space_repository import SpaceRepository
from service.lesson.schemas.lesson_schemas import LessonSchemaForTable, LessonViewSchemaForPage, LessonFilterSchema, \
    CreateLessonSchema, EditLessonSchema
from service.lesson.services.lesson_service import LessonService

lesson_router = APIRouter(
    prefix="/api/v1/lesson",
    tags=["Lesson"]
)
@lesson_router.get(
    "/{lesson_id}",
    summary="Получение занятия по Id",
    response_model=LessonSchemaForTable,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def get_lesson(
        lesson_id: int,
        lesson_service: Annotated[LessonService, Depends(lesson_service)],
        user: User = Depends(get_current_user_with_role(["admin", "supervisor", "trainer"]))
                   ):
    """ admin, supervisor, trainer """
    try:
        lesson = await lesson_service.get(lesson_id)
        if lesson:
            return lesson
        logger.error("Lesson not found")
        return Response(status_code=HTTPStatus.BAD_REQUEST.value)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)

@lesson_router.get(
    "/",
    summary=" Получение всех занятий",
    response_model=LessonViewSchemaForPage,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def get_all_lessons(
        lesson_service: Annotated[LessonService, Depends(lesson_service)],
        filters: LessonFilterSchema = Depends(),
        user: User = Depends(get_current_user_with_role(["admin", "supervisor", "trainer"]))
):
    """ admin, supervisor, trainer """
    try:
        lessons_list = await lesson_service.get_all_by_filters(filters)
        return lessons_list
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)

@lesson_router.post(
    "/",
    summary="Создание занятия",
    response_model=int,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def create_lesson(
        model: CreateLessonSchema,
        lesson_service: Annotated[LessonService, Depends(lesson_service)],
        user_repository: Annotated[UserRepository, Depends(user_repository)],
        space_repository: Annotated[SpaceRepository, Depends(space_repository)],
        user: User = Depends(get_current_user_with_role(["admin", "supervisor", "trainer"]))
):
    """admin, supervisor, trainer"""
    try:
        if not await user_repository.trainer_exists(model.trainer_id):
            logger.error("Trainer not found")
            return Response(status_code=HTTPStatus.BAD_REQUEST.value)
        if not await space_repository.exist(model.space_id):
            logger.error("Space not found")
            return Response(status_code=HTTPStatus.BAD_REQUEST.value)
        lesson_id = await lesson_service.add(model)
        if lesson_id:
            return lesson_id
        logger.error("Lesson existing")
        return Response(status_code=HTTPStatus.CONFLICT.value)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)

@lesson_router.put(
    "/",
    summary="Изменение занятия",
    response_model=bool,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        409: {"model": Message, "description": "Конфликт данных"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def edit_training(
        model: EditLessonSchema,
        lesson_service: Annotated[LessonService, Depends(lesson_service)],
        user_repository: Annotated[UserRepository, Depends(user_repository)],
        space_repository: Annotated[SpaceRepository, Depends(space_repository)],
        user: User = Depends(get_current_user_with_role(["admin", "supervisor", "trainer"]))
):
    """admin, supervisor, trainer"""
    try:
        if not await user_repository.trainer_exists(model.trainer_id):
            logger.error("Trainer not found")
            return Response(status_code=HTTPStatus.BAD_REQUEST.value)
        if not await space_repository.exist(model.space_id):
            logger.error("Space not found")
            return Response(status_code=HTTPStatus.BAD_REQUEST.value)
        result = await lesson_service.edit(model)
        if result:
            return result
        logger.error("Lesson already exists")
        return Response(status_code=HTTPStatus.BAD_REQUEST.value)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)

@lesson_router.delete(
    "/{lesson_id}",
    summary="Удаление занятия",
    status_code=HTTPStatus.NO_CONTENT.value,
    responses={
        204: {"description": "Нет данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def delete_group(
        training_id: int,
        lesson_service: Annotated[LessonService, Depends(lesson_service)],
        user: User = Depends(get_current_user_with_role(["admin"]))
):
    """admin, supervisor, trainer"""
    deleted = await lesson_service.delete(training_id)
    if deleted:
        return Response(status_code=HTTPStatus.NO_CONTENT.value)
    logger.error("Lesson not found")
    raise HTTPException(status_code=400)


@lesson_router.delete(
    "/remove/{lesson_id}",
    summary="Удаление занятия из базы",
    status_code=HTTPStatus.NO_CONTENT.value,
    responses={
        204: {"description": "Нет данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def remove_training(
        training_id: int,
        lesson_service: Annotated[LessonService, Depends(lesson_service)],
        user: User = Depends(get_current_user_with_role(["admin"]))
):
    """ admin """
    lesson = await lesson_service.delete_db(training_id)
    if lesson:
        return Response(status_code=HTTPStatus.NO_CONTENT.value)
    logger.error("Lesson not found")
    raise HTTPException(status_code=400)