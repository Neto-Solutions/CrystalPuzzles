from http import HTTPStatus

from fastapi import APIRouter, Response

from starlette.responses import JSONResponse

from common.dependensies import TrainerSupervisorAdminDep
from common.schema.base_schemas import Message
from service.group.schemas import StudentForGroupViewSchema
from service.users.dependensies import UserUOWDep
from service.group.dependensies import GroupUOWDep, StudentUOWDep, StudentServiceDep

student_group_router = APIRouter(
    prefix="/api/v1/group",
    tags=["StudentGroup"]
)


@student_group_router.post(
    "/add-student/",
    summary="Добавление студента в группу",
    status_code=HTTPStatus.CREATED.value,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        409: {"model": Message, "description": "Конфликт данных"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def add_student_for_group(
        items: StudentForGroupViewSchema,
        user_uow: UserUOWDep,
        group_uow: GroupUOWDep,
        uow: StudentUOWDep,
        student_service: StudentServiceDep,
        current_user: TrainerSupervisorAdminDep
):
    """ admin, supervisor, trainer """
    result = await student_service.add_student(uow, items, user_uow=user_uow, group_uow=group_uow)
    if result:
        return Response(status_code=HTTPStatus.CREATED.value)
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="The student already belongs to the group")



@student_group_router.delete(
    "/delete-student/",
    summary="Удаление студента из группы",
    status_code=HTTPStatus.NO_CONTENT.value,
    responses={
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def delete_student_for_group(
        items: StudentForGroupViewSchema,
        user_uow: UserUOWDep,
        group_uow: GroupUOWDep,
        uow: StudentUOWDep,
        student_service: StudentServiceDep,
        current_user: TrainerSupervisorAdminDep
):
    """ Удаление студента из группы """
    result = await student_service.delete_student(uow, items, user_uow=user_uow, group_uow=group_uow)
    if not result:
        return Response(status_code=HTTPStatus.NO_CONTENT.value)
