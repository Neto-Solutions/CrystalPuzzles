from http import HTTPStatus

from fastapi import HTTPException

from common.service.base_service import BaseService
from service.group.schemas import StudentForGroupViewSchema
from service.group.unit_of_work.group_uow import GroupUOW
from service.group.unit_of_work.student_uow import StudentUOW
from service.users.unit_of_work import UserUOW


class StudentService(BaseService):

    @staticmethod
    async def student_check(uow: UserUOW, student_id: int):
        async with uow:
            if not await uow.repo.student_exists(student_id):
                raise HTTPException(
                    status_code=HTTPStatus.BAD_REQUEST.value,
                    detail="Student not found"
                )

    @staticmethod
    async def group_check(uow: GroupUOW, group_id: int):
        async with uow:
            if not await uow.repo.exist(group_id):
                raise HTTPException(
                    status_code=HTTPStatus.BAD_REQUEST.value,
                    detail="Group not found"
                )

    async def add_student(self, uow: StudentUOW, items: StudentForGroupViewSchema, **kwargs):
        await self.student_check(kwargs.get("user_uow"), items.student_id)
        await self.group_check(kwargs.get("group_uow"), items.group_id)
        async with uow:
            result = await uow.repo.add(items.model_dump())
            await uow.commit()
            return result

    async def delete_student(self, uow: StudentUOW, items: StudentForGroupViewSchema, **kwargs):
        await self.student_check(kwargs.get("user_uow"), items.student_id)
        await self.group_check(kwargs.get("group_uow"), items.group_id)
        async with uow:
            result = await uow.repo.delete(items.model_dump())
            await uow.commit()
            return result
