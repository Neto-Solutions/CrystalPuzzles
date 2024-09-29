from http import HTTPStatus

from fastapi import APIRouter, Response
from starlette.responses import JSONResponse

from common.dependensies import AdminDep, SupervisorAdminDep, UserDep, TrainerSupervisorAdminDep, TrainerDep
from common.schema.base_schemas import Message
from service.lesson.dependensies import LessonServiceDep, LessonUOWDep, LessonFilterDep, SpaceUOWDep, CheckUOWDep
from service.lesson.schemas.check_schema import CreateCheckSchema
from service.training.dependensies import TrainingUOWDep
from service.users.dependensies import UserUOWDep

from service.lesson.schemas.lesson_schemas import LessonSchemaForTable, LessonViewSchemaForPage, \
    CreateLessonSchema, EditLessonSchema, TrainingForLessonSchema, UserForLessonSchema, ChangeStatusSchema

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
        uow: LessonUOWDep,
        lesson_service: LessonServiceDep,
        current_user: UserDep,
):
    """ admin, supervisor, trainer """
    result = await lesson_service.get(uow, lesson_id, user=current_user)
    if result:
        return result
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Lesson not found")


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
        uow: LessonUOWDep,
        lesson_service: LessonServiceDep,
        filters: LessonFilterDep,
        current_user: UserDep
):
    """ admin, supervisor, trainer """
    result = await lesson_service.get_all_by_filters(uow, filters, user=current_user)
    return result


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
        uow: LessonUOWDep,
        user_uow: UserUOWDep,
        space_uow: SpaceUOWDep,
        lesson_service: LessonServiceDep,
        current_user: SupervisorAdminDep
):
    """admin, supervisor"""
    result = await lesson_service.add(uow, model, user_uow=user_uow, space_uow=space_uow)
    if result:
        return result
    return JSONResponse(status_code=HTTPStatus.CONFLICT.value, content="Lesson existing")


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
async def edit_lesson(
        model: EditLessonSchema,
        uow: LessonUOWDep,
        user_uow: UserUOWDep,
        space_uow: SpaceUOWDep,
        lesson_service: LessonServiceDep,
        current_user: SupervisorAdminDep
):
    """admin, supervisor"""
    result = await lesson_service.edit(uow, model, user_uow=user_uow, space_uow=space_uow)
    if result:
        return result
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Lesson already exists")


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
async def delete_lesson(
        lesson_id: int,
        uow: LessonUOWDep,
        lesson_service: LessonServiceDep,
        current_user: SupervisorAdminDep
):
    """admin, supervisor"""
    result = await lesson_service.delete(uow, lesson_id)
    if result:
        return Response(status_code=HTTPStatus.NO_CONTENT.value)
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Lesson not found")


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
async def remove_lesson(
        lesson_id: int,
        uow: LessonUOWDep,
        lesson_service: LessonServiceDep,
        current_user: AdminDep
):
    """ admin """
    result = await lesson_service.delete_db(uow, lesson_id)
    if result:
        return Response(status_code=HTTPStatus.NO_CONTENT.value)
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Lesson not found")


@lesson_router.post(
    "/edit-status/{lesson_id}",
    summary="Сменить статус занятия",
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def edit_status_lesson(
        lesson_id: int,
        model: ChangeStatusSchema,
        uow: LessonUOWDep,
        lesson_service: LessonServiceDep,
        current_user: TrainerSupervisorAdminDep
):
    """admin, supervisor, trainer"""
    result = await lesson_service.edit_status_lesson(uow, lesson_id, model)
    if result:
        return result
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST, content="Exception")


@lesson_router.post(
    "/create-check",
    summary="Создание Чек-листа",
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def create_check(
        model: CreateCheckSchema,
        uow: LessonUOWDep,
        check_uow: CheckUOWDep,
        user_uow: UserUOWDep,
        training_uow: TrainingUOWDep,
        service: LessonServiceDep,
        current_user: TrainerDep
):
    """ trainer """
    result = await service.add_check_for_lesson(
        uow, model,
        check_uow=check_uow,
        user_uow=user_uow,
        training_uow=training_uow
    )
    if result:
        return result
    return JSONResponse(status_code=HTTPStatus.CONFLICT.value, content="Check existing")


@lesson_router.put(
    "/add-user/{lesson_id}",
    summary="Добавление пользователя к занятию",
    response_model=bool,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        409: {"model": Message, "description": "Конфликт данных"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def add_user(
        lesson_id: int,
        model: UserForLessonSchema,
        uow: LessonUOWDep,
        check_uow: CheckUOWDep,
        user_uow: UserUOWDep,
        lesson_service: LessonServiceDep,
        current_user: TrainerSupervisorAdminDep
):
    """ admin, supervisor, trainer """
    result = await lesson_service.add_user(uow, lesson_id, model, user_uow=user_uow, check_uow=check_uow)
    if result:
        return result
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Exception")


@lesson_router.put(
    "/remove-user/{lesson_id}",
    summary="Удаление пользователя с занятия",
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        409: {"model": Message, "description": "Конфликт данных"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def remove_user(
        lesson_id: int,
        model: UserForLessonSchema,
        uow: LessonUOWDep,
        check_uow: CheckUOWDep,
        user_uow: UserUOWDep,
        lesson_service: LessonServiceDep,
        current_user: TrainerSupervisorAdminDep
):
    """ admin, supervisor, trainer """
    await lesson_service.remove_user(uow, lesson_id, model, user_uow=user_uow, check_uow=check_uow)
    Response(status_code=204)
#
#
# @lesson_router.put(
#     "/add-training/{lesson_id}",
#     summary="Добавление упражнения к занятию",
#     response_model=bool,
#     responses={
#         200: {"description": "Успешная обработка данных"},
#         401: {"description": "Не авторизованный пользователь"},
#         400: {"model": Message, "description": "Некорректные данные"},
#         409: {"model": Message, "description": "Конфликт данных"},
#         500: {"model": Message, "description": "Серверная ошибка"}}
# )
# async def add_training(
#         lesson_id: int,
#         model: TrainingForLessonSchema,
#         uow: LessonUOWDep,
#         user_uow: UserUOWDep,
#         lesson_service: LessonServiceDep,
#         current_user: TrainerSupervisorAdminDep
# ):
#     """ admin, supervisor, trainer """
#     result = await lesson_service.add_training(uow, lesson_id, model, user_uow=user_uow)
#     if result:
#         return result
#     return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Training already exists in lesson")
#
#
# @lesson_router.put(
#     "/remove-training/{lesson_id}",
#     summary="Удаляние упражнения с занятия",
#     response_model=bool,
#     responses={
#         200: {"description": "Успешная обработка данных"},
#         401: {"description": "Не авторизованный пользователь"},
#         400: {"model": Message, "description": "Некорректные данные"},
#         409: {"model": Message, "description": "Конфликт данных"},
#         500: {"model": Message, "description": "Серверная ошибка"}}
# )
# async def delete_training(
#         lesson_id: int,
#         model: TrainingForLessonSchema,
#         uow: LessonUOWDep,
#         user_uow: UserUOWDep,
#         lesson_service: LessonServiceDep,
#         current_user: TrainerSupervisorAdminDep
# ):
#     """ admin, supervisor, trainer """
#     result = await lesson_service.delete_training(uow, lesson_id, model, user_uow=user_uow)
#     if result:
#         return result
#     return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Training already exists in lesson")