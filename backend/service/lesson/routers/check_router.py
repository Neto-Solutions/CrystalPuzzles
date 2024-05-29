from http import HTTPStatus

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response

from core.utils.logger import logger
from service.identity.models import User
from service.identity.repositories.user_repository import UserRepository



from service.identity.dependensies import user_repository
from service.identity.security import get_current_user
from service.lesson.repositories.lesson_repository import LessonRepository
from service.lesson.repositories.space_repository import SpaceRepository
from service.lesson.schemas.check_schema import CreateCheckSchema
from service.lesson.dependensies import lesson_repository, space_repository

check_router = APIRouter(
    prefix="/api/v1/check",
    tags=["Check"]
)

async def create_lesson(
        model: CreateCheckSchema,
        lesson_repository: Annotated[LessonRepository, Depends(lesson_repository)],
        user_repository: Annotated[UserRepository, Depends(user_repository)],
        space_repository: Annotated[SpaceRepository, Depends(space_repository)],
        current_user: User = Depends(get_current_user(("admin", "supervisor", "trainer")))
):
    """admin, supervisor, trainer"""
    try:
        if not await user_repository.trainer_exists(model.trainer_id):
            logger.error("Student not found")
            return Response(status_code=HTTPStatus.BAD_REQUEST.value)
        if not await space_repository.exist(model.space_id):
            logger.error("Space not found")
            return Response(status_code=HTTPStatus.BAD_REQUEST.value)
        lesson_id = await lesson_repository.add(model)
        if lesson_id:
            return lesson_id
        logger.error("Lesson existing")
        return Response(status_code=HTTPStatus.CONFLICT.value)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500)
