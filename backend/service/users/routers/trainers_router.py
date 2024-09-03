from fastapi import APIRouter

from common.dependensies import SupervisorAdminDep
from common.schema.base_schemas import Message
from service.users.dependensies import UserFilterDep, UserServiceDep, UserUOWDep
from service.users.schemas import UserShortViewSchemaForPage

trainer_router = APIRouter(
    prefix="/api/v1/trainer",
    tags=["Trainer"]
)


@trainer_router.get("/",
                    summary="Получение списка всех тренеров",
                    response_model=UserShortViewSchemaForPage,
                    responses={
                        200: {"description": "Успешная обработка данных"},
                        401: {"description": "Не авторизованный пользователь"},
                        500: {"model": Message, "description": "Серверная ошибка"}}
                    )
async def get_student_list(
        uow: UserUOWDep,
        user_service: UserServiceDep,
        current_user: SupervisorAdminDep,
        filters: UserFilterDep,
):
    """ supervisor, admin """
    trainer_list = await user_service.get_all_by_filter(uow, filters, role="trainer")
    return trainer_list
