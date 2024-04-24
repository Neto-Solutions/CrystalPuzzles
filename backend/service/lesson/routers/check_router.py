from http import HTTPStatus

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response

from core.schemas.base import Message
from core.utils.logger import logger
from service.identity.models import User
from service.identity.repositories.user_repository import UserRepository

from service.group.schemas import GroupFilterSchema, GroupViewSchemaForPage, CreateGroupSchema, EditGroupSchema, \
    GroupResponseModel
from service.group.services.group_service import GroupService
from service.group.dependensies import group_service

from service.identity.dependensies import user_repository
from service.identity.services.auth_service import get_current_user_with_role
from service.lesson.schemas.check_schema import CreateCheckSchema

check_router = APIRouter(
    prefix="/api/v1/check",
    tags=["Check"]
)

async def create_lesson(
        model: CreateCheckSchema,
        lesson_repository: Annotated[LessonRepository, Depends(lesson_repository)],
        user_repository: Annotated[UserRepository, Depends(user_repository)],
        space_repository: Annotated[SpaceRepository, Depends(space_repository)],
        user: User = Depends(get_current_user_with_role(["admin", "supervisor", "trainer"]))
):
    """admin, supervisor, trainer"""
    try:
        if not await user_repository.trainer_exists(model.trainer_id):
            logger.error("Student not found")
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