from core.service import BaseService
from service.group.schemas import StudentForGroupViewSchema


class StudentService(BaseService):
    create_schema = StudentForGroupViewSchema
    async def add_student(self, items: create_schema):
        return await self.repo.add(items.model_dump())

    async def delete_student(self, items: create_schema):
        return await self.repo.delete(items.model_dump())
