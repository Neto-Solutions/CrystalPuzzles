from http import HTTPStatus

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.encoders import jsonable_encoder
from starlette.responses import JSONResponse

from common.dependensies import TrainerSupervisorAdminDep, TrainerDep
from common.schema.base_schemas import Message
from core.logger import logger
from service.lesson.dependensies import CheckUOWDep, CheckServiceDep, CheckViewSchemaForPageDep, CheckNoFilterSchemaDep
from service.users.dependensies import UserUOWDep
from service.training.dependensies import TrainingUOWDep
from service.lesson.schemas.lesson_schemas import MakeCheckList, GetCheckList

# from service.identity.security import get_current_user
# from service.lesson.repositories.lesson_repository import LessonRepository
from service.lesson.schemas.check_schema import ChecSchemaId, CheckSimpleFilterSchema, CheckViewSchemaForPage, CreateCheckSchema

from service.lesson.dependensies import LessonServiceDep, LessonUOWDep, LessonFilterDep, SpaceUOWDep, CheckUOWDep, MakeCheckListDep

from pprint import pprint

check_router = APIRouter(
    prefix="/api/v1/check",
    tags=["Check"]
)

@check_router.get(
    "/",
    summary=" Получение всех занятий",
    response_model=CheckViewSchemaForPage,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def get_all_checks(
    uow: CheckUOWDep, 
    check_service: CheckServiceDep,    
    filters: CheckNoFilterSchemaDep,
    current_user: TrainerSupervisorAdminDep,
):    
    check  = await check_service.get_all_check(uow, filters)
    return check

@check_router.get(
    "/{check_id}",
    summary="Получение чек-листа по check_id",
    response_model=ChecSchemaId,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def get_check(
        check_id: int,
        uow: CheckUOWDep,
        check_service: CheckServiceDep,
        current_user: TrainerSupervisorAdminDep,
):
    check  = await check_service.get_check_by_id(uow, check_id)

    if not check:
        raise HTTPException(status_code=404, detail="Чек-лист не найден")

    return check

@check_router.get(
    "/list",
    summary="Получение всех чек-листов с фильтрацией",
    responses={
        200: {"description": "Успешное получение данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}
    }
)
async def get_checklists(
    model: GetCheckList,
    uow: CheckUOWDep,
    current_user: TrainerSupervisorAdminDep
):
    role = current_user.role  # Роль пользователя: тренер, супервизор или админ.
    
    filters = {}
    if model.lesson_id:
        filters["lesson_id"] = model.lesson_id
        print(f'lesson_id: {filters.get("lesson_id")}')
    else:
        print('no lesson_id')
    if model.student_id:
        filters["student_id"] = model.student_id
        print(f'student_id: {filters.get("student_id")}')
    else:
        print('no student_id')

    async with uow:
        if role == "trainer":
            # Тренеры могут видеть только свои уроки
            filters["trainer_id"] = current_user.id
        # Админ видит все данные без дополнительных фильтров

        checklists = await uow.repo.get_checks_by_filter(**filters)
    
    return {"data": checklists}


@check_router.post(
    "/",
    summary="Создание Чек-листа",
    response_model=bool,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def create_check(
    model: CreateCheckSchema,
    lesson_uow: LessonUOWDep,
    check_uow: CheckUOWDep,
    user_uow: UserUOWDep,
    training_uow: TrainingUOWDep,
    lesson_service: LessonServiceDep,
    check_service: CheckServiceDep, 
    current_user: TrainerDep
):
    print('model')
    pprint(model)
    print(f'model.get("students_id"): {model.student_ids}')
    result = await check_service.add_check_for_lesson(
        model=model,
        lesson_uow=lesson_uow,
        check_uow=check_uow,
        user_uow=user_uow,
        training_uow=training_uow
    )
    if result:
        return result
    return JSONResponse(status_code=HTTPStatus.CONFLICT.value, content="Check existing")

@check_router.put(
    "/{check_id}",
    summary="Изменение чек-листа по ID",
    responses={
        200: {"description": "Чек-лист успешно обновлён"},
        400: {"model": Message, "description": "Некорректные данные"},
        404: {"description": "Чек-лист не найден"},
        500: {"model": Message, "description": "Серверная ошибка"},
    },
)
async def update_check(
    check_id: int,
    model: MakeCheckList,
    uow: CheckUOWDep,
    check_service: CheckServiceDep,
    current_user: TrainerSupervisorAdminDep,
):
    """
    Обновление чек-листа:
    - Список учеников (students_id).
    - Список упражнений (training_check).
    """

    print(f"Updating check with ID: {check_id}")

    # Вызываем сервис для обновления данных
    result = await check_service.update_check_by_id(
        uow=uow,
        check_id=check_id,
        data=model.dict(),
    )

    if not result:
        raise HTTPException(status_code=404, detail="Чек-лист не найден")

    print(f"Check with ID {check_id} successfully updated.")
    return {"message": "Чек-лист успешно обновлён"}


@check_router.delete(
    "/{check_id}",
    summary="Логическое удаление чек-листа по ID",
    responses={
        200: {"description": "Чек-лист успешно удалён"},
        404: {"description": "Чек-лист не найден"},
    },
)
async def delete_check(
    check_id: int,
    uow: CheckUOWDep,
    check_service: CheckServiceDep,
    current_user: TrainerSupervisorAdminDep,
):
    """
    Логическое удаление чек-листа (установка deleted=True).
    """
    print(f"Marking check with ID {check_id} as deleted.")

    # Отмечаем чек-лист как удалённый
    await check_service.mark_check_as_deleted(uow, check_id)

    return {"message": "Чек-лист успешно удалён"}

