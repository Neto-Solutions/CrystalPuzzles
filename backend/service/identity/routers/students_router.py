from typing import Annotated

from fastapi import APIRouter, Depends

from core.schemas.base import Message
from service.identity.dependensies import user_service
from service.identity.models import User
from service.identity.schemas import UserShortViewSchemaForPage, UserFilterSchema
from service.identity.security import get_current_user
from service.identity.services.user_service import UserService

student_router = APIRouter(
    prefix="/api/v1/student",
    tags=["Student"]
)


@student_router.get("/",
                    summary="Получение списка всех студентов",
                    response_model=UserShortViewSchemaForPage,
                    responses={
                        200: {"description": "Успешная обработка данных"},
                        401: {"description": "Не авторизованный пользователь"},
                        500: {"model": Message, "description": "Серверная ошибка"}}
                    )
async def get_student_list(
        user_service: Annotated[UserService, Depends(user_service)],
        filters: UserFilterSchema = Depends(),
        current_user: User = Depends(get_current_user(("admin", "supervisor", "trainer")))
):
    students = await user_service.get_all_students_by_filter(filters)
    return students
