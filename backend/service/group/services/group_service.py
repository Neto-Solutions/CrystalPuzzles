from core.service import BaseService
from service.group.schemas import CreateGroupSchema, EditGroupSchema, GroupFilterSchema


class GroupService(BaseService):
    create_schema = CreateGroupSchema
    edit_schema = EditGroupSchema

    async def add(self, group: create_schema):
        check = await self.repo.get_by_name(group.name)
        if check is None or check.deleted:
            return await super().add(group)
        return None

    async def edit(self, group: edit_schema):
        check = await self.repo.get_by_name(group.name)
        if check is None or (check.id == group.id and not check.deleted):
            return await super().edit(group)
        return None

    async def get_all_by_filters(self, filters: GroupFilterSchema):
        return await self.repo.get_all_group_by_filter(filters.search_string, filters.date_begin, filters.date_end,
                                                       filters.trainer, filters.page_number, filters.page_size)