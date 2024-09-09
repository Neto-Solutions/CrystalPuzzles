from fastapi import HTTPException

from common.service.base_service import BaseService
from service.training.schemas import EditTrainingSchema, CreateTrainingSchema, TrainingFilterSchema
from service.training.unit_of_work import TrainingUOW


class TrainingService(BaseService):
    @staticmethod
    async def training_exist(uow: TrainingUOW, training_id):
        async with uow:
            if not await uow.repo.exist(training_id):
                raise HTTPException(status_code=404, detail="Training not found")


    @staticmethod
    async def get_by_name(uow: TrainingUOW, training_name: str):
        async with uow:
            result = await uow.repo.get_by_name(training_name)
            return result

    async def add(self, uow: TrainingUOW, training: CreateTrainingSchema, **kwargs):
        check = await self.get_by_name(uow, training.name)
        if check is None or check.deleted:
            result = await super().add(uow, training)
            return result
        return None

    async def edit(self,  uow: TrainingUOW, training: EditTrainingSchema, **kwargs):
        check = await self.get_by_name(uow, training.name)
        if check is None or (check.id == training.id and not check.deleted):
            result = await super().edit(uow, training)
            return result
        return None

    @staticmethod
    async def get_all_by_filters(uow: TrainingUOW, filters: TrainingFilterSchema):
        async with uow:
            result = await uow.repo.get_all_training_by_filter(filters)
            return result
