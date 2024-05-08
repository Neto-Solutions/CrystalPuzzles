from core.service import BaseService
from service.group.schemas import CreateGroupSchema, EditGroupSchema, GroupFilterSchema
from service.lesson.schemas.space_schemas import SpaceFilterSchema, CreateSpaceSchema, EditSpaceSchema


class SpaceService(BaseService):
    create_schema = CreateSpaceSchema
    edit_schema = EditSpaceSchema

    async def add(self, space: create_schema):
        check = await self.repo.get_by_name(space.name)
        if check is None or check.deleted:
            return await super().add(space)
        return None

    async def edit(self, space: edit_schema):
        check = await self.repo.get_by_name(space.name)
        if check is None or (check.id == space.id and not check.deleted):
            return await super().edit(space)
        return None

    async def get_all_by_filters(self, filters: SpaceFilterSchema):
        return await self.repo.get_all_spaces_by_filter(filters.search_string, filters.page_number, filters.page_size)

