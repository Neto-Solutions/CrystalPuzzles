from fastapi import HTTPException

from common.service.base_service import BaseService
from service.lesson.schemas.space_schemas import SpaceFilterSchema, CreateSpaceSchema, EditSpaceSchema
from service.lesson.unit_of_work.space_uow import SpaceUOW


class SpaceService(BaseService):

    @staticmethod
    async def get_by_name(uow: SpaceUOW, name: str):
        async with uow:
            result = await uow.repo.get_by_name(name)
            return result

    @staticmethod
    async def space_exists(uow: SpaceUOW, space_id: int):
        async with uow:
            if not await uow.repo.exist(space_id):
                raise HTTPException(
                    status_code=400,
                    detail="Space not found"
                )

    async def add(self, uow: SpaceUOW, space: CreateSpaceSchema, **kwargs):
        check = await self.get_by_name(uow, space.name)
        if check is None or check.deleted:
            result = await super().add(uow, space)
            return result
        return None

    async def edit(self, uow: SpaceUOW, space: EditSpaceSchema, **kwargs):
        check = await self.get_by_name(uow, space.name)
        if check is None or (check.id == space.id and not check.deleted):
            result = await super().edit(uow, space)
            if result is False:
                raise HTTPException(
                    status_code=400,
                    detail="Space not found"
                )
            return result
        return None

    @staticmethod
    async def get_all_by_filters(uow: SpaceUOW, filters: SpaceFilterSchema):
        async with uow:
            result = await uow.repo.get_all_spaces_by_filter(filters)
            return result
