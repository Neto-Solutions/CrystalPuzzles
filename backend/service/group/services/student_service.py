from common.service.base_service import BaseService
from service.group.schemas import StudentForGroupViewSchema
from service.group.services.group_service import GroupService
from service.group.unit_of_work.student_uow import StudentUOW
from service.users.services.user_service import UserService


class StudentService(BaseService):
    @staticmethod
    async def add_student(uow: StudentUOW, items: StudentForGroupViewSchema, **kwargs):
        await UserService.student_check(kwargs.get("user_uow"), items.student_id)
        await GroupService.group_check(kwargs.get("group_uow"), items.group_id)
        async with uow:
            result = await uow.repo.add(items.model_dump())
            await uow.commit()
            return result

    @staticmethod
    async def delete_student(uow: StudentUOW, items: StudentForGroupViewSchema, **kwargs):
        await UserService.student_check(kwargs.get("user_uow"), items.student_id)
        await GroupService.group_check(kwargs.get("group_uow"), items.group_id)
        async with uow:
            result = await uow.repo.delete(items.model_dump())
            await uow.commit()
            return result
