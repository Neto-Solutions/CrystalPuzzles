from fastapi import APIRouter

from common.dependensies import AdminDep
from common.schema.base_schemas import Message
from service.users.dependensies import UserFilterDep, UserServiceDep, UserUOWDep
from service.users.schemas import UserShortViewSchemaForPage

admin_router = APIRouter(
    prefix="/api/v1/admin",
    tags=["Admin"]
)


@admin_router.get("/",
                    summary="Получение списка всех адиминистраторов.",
                    response_model=UserShortViewSchemaForPage,
                    responses={
                        200: {"description": "Успешная обработка данных"},
                        401: {"description": "Не авторизованный пользователь"},
                        500: {"model": Message, "description": "Серверная ошибка"}}
                    )
async def get_admin_list(
        uow: UserUOWDep,
        user_service: UserServiceDep,
        current_user: AdminDep,
        filters: UserFilterDep,
):
    admin_list = await user_service.get_all_by_filter(uow, filters, role="admin")
    return admin_list
