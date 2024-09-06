from common.service.base_service import BaseService
from service.lesson.unit_of_work.check_uow import CheckUOW


class CheckService(BaseService):

    @staticmethod
    async def add_user_for_lesson(uow: CheckUOW, lesson_id, data: dict):
        async with uow:
            result = await uow.repo.add_user_for_lesson(lesson_id, data)
            await uow.commit()
            return result

    @staticmethod
    async def delete_user_for_lesson(uow: CheckUOW, lesson_id, data: dict):
        async with uow:
            result = await uow.repo.delete_user_for_lesson(lesson_id, data)
            await uow.commit()
            return result
