from fastapi import APIRouter

from common.dependensies import TrainerSupervisorAdminDep
from common.schema.base_schemas import Message
from service.users.dependensies import UserFilterDep, UserServiceDep, UserUOWDep
from service.users.schemas import UserShortViewSchemaForPage

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
        uow: UserUOWDep,
        user_service: UserServiceDep,
        current_user: TrainerSupervisorAdminDep,
        filters: UserFilterDep,
):
    """ trainer, supervisor, admin """
    result = await user_service.get_all_by_filter(uow, filters, role="student")
    return result
