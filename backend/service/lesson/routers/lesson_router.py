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

lesson_router = APIRouter(
    prefix="/api/v1/lesson",
    tags=["Lesson"]
)
