from http import HTTPStatus
from typing import Annotated

from fastapi import APIRouter, Depends, Response, HTTPException

from core.schemas.base import Message
from core.utils.logger import logger
from service.group.schemas import StudentForGroupViewSchema
from service.identity.models import User
from service.identity.security import get_current_user
from service.identity.repositories.user_repository import UserRepository
from service.identity.dependensies import user_repository
from service.group.dependensies import group_repository, student_service
from service.group.repositories.group_repository import GroupRepository
from service.group.services.student_service import StudentService

student_router = APIRouter(
    prefix="/api/v1/group",
    tags=["StudentGroup"]
)


@student_router.post(
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
async def add_student_for_group(items: StudentForGroupViewSchema,
                                user_repository: Annotated[UserRepository, Depends(user_repository)],
                                group_repository: Annotated[GroupRepository, Depends(group_repository)],
                                student_service: Annotated[StudentService, Depends(student_service)],
                                current_user: User = Depends(get_current_user(("admin", "supervisor", "trainer")))
                                ):
    """ admin, supervisor, trainer """
    try:
        if not await user_repository.student_exists(items.student_id):
            logger.error("Student not found")
        elif not await group_repository.exist(items.group_id):
            logger.error("Group not found")
        else:
            result = await student_service.add_student(items)
            if result:
                return Response(status_code=HTTPStatus.CREATED.value)
        logger.error("The student already belongs to the group")
        return Response(status_code=HTTPStatus.BAD_REQUEST.value)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)


@student_router.delete("/delete-student/")
async def delete_student_for_group(
                                items: StudentForGroupViewSchema,
                                user_repository: Annotated[UserRepository, Depends(user_repository)],
                                group_repository: Annotated[GroupRepository, Depends(group_repository)],
                                student_service: Annotated[StudentService, Depends(student_service)],
                                current_user: User = Depends(get_current_user(("admin", "supervisor", "trainer")))
):
    """ Удаление студента из группы """
    try:
        if not await user_repository.student_exists(items.student_id):
            logger.error("Student not found")
        elif not await group_repository.exist(items.group_id):
            logger.error("Group not found")
        else:
            result = await student_service.delete_student(items)
            if result:
                return Response(status_code=HTTPStatus.NO_CONTENT.value)
        logger.error("Student not found")
        return Response(status_code=HTTPStatus.BAD_REQUEST.value)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)
