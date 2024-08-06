from http import HTTPStatus

from fastapi import HTTPException

from common.service.base_service import BaseService
from service.group.schemas import CreateGroupSchema, EditGroupSchema, GroupFilterSchema
from service.group.unit_of_work.group_uow import GroupUOW
from service.users.services.user_service import UserService


class GroupService(BaseService):

    @staticmethod
    async def group_check(uow: GroupUOW, group_id: int):
        async with uow:
            if not await uow.repo.exist(group_id):
                raise HTTPException(
                    status_code=HTTPStatus.BAD_REQUEST.value,
                    detail="Group not found"
                )

    @staticmethod
    async def get_by_name(uow: GroupUOW, group_name: str):
        async with uow:
            result = await uow.repo.get_by_name(group_name)
            return result

    async def add(
            self,
            uow: GroupUOW,
            group: CreateGroupSchema,
            **kwargs
    ):
        await UserService.trainer_check(kwargs.get("user_uow"), group.trainer_id)
        check = await self.get_by_name(uow, group.name)
        if check:
            return None
        return await super().add(uow, group)

    async def edit(self, uow: GroupUOW, group: EditGroupSchema, **kwargs):
        await UserService.trainer_check(kwargs.get("user_uow"), group.trainer_id)
        check = await self.get_by_name(uow, group.name)
        if check is None or check.id.__eq__(group.id):
            return await super().edit(uow, group)
        elif check and check.id.__ne__(group.id):
            raise HTTPException(
                status_code=HTTPStatus.BAD_REQUEST.value,
                detail="Group exists"
            )
        return None

    @staticmethod
    async def get_with_students(uow: GroupUOW, group_id: int):
        async with uow:
            result = await uow.repo.get_with_students(group_id)
            return result

    @staticmethod
    async def get_all_by_filters(uow: GroupUOW, filters: GroupFilterSchema):
        async with uow:
            result = await uow.repo.get_all_group_by_filter(filters)
            return result
