from http import HTTPStatus

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response

from core.logger import logger
from service.users.models import User
from service.users.repository import UserRepository

from service.identity.dependensies import user_repository
from service.identity.security import get_current_user
from service.lesson.repositories.lesson_repository import LessonRepository
from service.lesson.schemas.check_schema import CreateCheckSchema
from service.lesson.dependensies import lesson_repository

check_router = APIRouter(
    prefix="/api/v1/check",
    tags=["Check"]
)


async def create_check(
        model: CreateCheckSchema,
        lesson_repository: Annotated[LessonRepository, Depends(lesson_repository)],
        user_repository: Annotated[UserRepository, Depends(user_repository)],
        check_service: Annotated[CheckService, Depends(check_service)],
        current_user: User = Depends(get_current_user(("admin", "supervisor", "trainer")))
):
    """admin, supervisor, trainer"""
    try:
        if not await user_repository.student_exists(model.student_id):
            logger.error("Student not found")
            return Response(status_code=HTTPStatus.BAD_REQUEST.value)
        check_id = await check_service.add(model)
        if check_id:
            return check_id
        logger.error("Lesson existing")
        return Response(status_code=HTTPStatus.CONFLICT.value)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)
