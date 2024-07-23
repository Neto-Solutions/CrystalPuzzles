from service.users.schemas import AdminPanelEditSchema
from service.users.services.user_service import UserService
from service.users.unit_of_work import UserUOW


class AdminPanelService(UserService):

    @staticmethod
    async def get_with_deleted(
        uow: UserUOW,
        user_id: int
    ):
        async with uow:
            result = await uow.repo.get_with_deleted(user_id)
            return result

    async def edit(
            self,
            uow: UserUOW,
            user: AdminPanelEditSchema,
            **kwargs
    ):
        check = await self.get_with_deleted(uow, user.id)
        if check is None:
            return None
        updated_data = user.model_dump()
        for key, value in updated_data.copy().items():
            if value is None:
                updated_data.pop(key)
        async with uow:
            result = await uow.repo.edit_with_deleted(updated_data)
            await uow.commit()
            return result
