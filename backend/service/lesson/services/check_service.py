from common.service.base_service import BaseService
from service.lesson.schemas.check_schema import CreateCheckSchema
from service.lesson.unit_of_work.check_uow import CheckUOW


class CheckService(BaseService):
    async def create_check(self, uow: CheckUOW, model: CreateCheckSchema):
        data = model.model_dump()
        result = await super().add(uow, data)
        return result

    @staticmethod
    async def add_user_for_lesson(uow: CheckUOW, lesson_id, data: dict):
        async with uow:
            await uow.repo.add_user_for_lesson(lesson_id, data)
            await uow.commit()
