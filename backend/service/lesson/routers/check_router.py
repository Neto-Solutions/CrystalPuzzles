from http import HTTPStatus

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response
from starlette.responses import JSONResponse

from common.dependensies import TrainerSupervisorAdminDep, TrainerDep
from common.schema.base_schemas import Message
from core.logger import logger
from service.lesson.dependensies import CheckUOWDep, CheckServiceDep
from service.lesson.unit_of_work.lesson_uow import LessonUOW
from service.users.models import User
from service.users.repository import UserRepository

from service.identity.security import get_current_user
from service.lesson.repositories.lesson_repository import LessonRepository
from service.lesson.schemas.check_schema import CreateCheckSchema

# check_router = APIRouter(
#     prefix="/api/v1/check",
#     tags=["Check"]
# )
#
#
# @check_router.post(
#     "/",
#     summary="Создание Чек-листа",
#     response_model=bool,
#     responses={
#         200: {"description": "Успешная обработка данных"},
#         401: {"description": "Не авторизованный пользователь"},
#         400: {"model": Message, "description": "Некорректные данные"},
#         500: {"model": Message, "description": "Серверная ошибка"}},
# )
# async def create_check(
#         model: CreateCheckSchema,
#         lesson_uow: LessonUOW,
#         uow: CheckUOWDep,
#         check_service: CheckServiceDep,
#         current_user: TrainerDep
# ):
#     """ trainer """
#     result = await check_service.add_check_for_lesson(uow, model, lesson_uow=lesson_uow)
#     if result:
#         return result
#     return JSONResponse(status_code=HTTPStatus.CONFLICT.value, content="Check existing")
