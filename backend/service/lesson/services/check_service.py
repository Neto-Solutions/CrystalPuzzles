from common.service.base_service import BaseService
from service.lesson.schemas.check_schema import CreateCheckSchema
from service.lesson.unit_of_work.check_uow import CheckUOW


class CheckService(BaseService):
    async def create_check(self, uow: CheckUOW, model: CreateCheckSchema):
        data = model.model_dump()
        result = await super().add(uow, data)
        return result
