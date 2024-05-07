from core.service import BaseService
from service.training.schemas import EditTrainingSchema, CreateTrainingSchema, TrainingFilterSchema


class TrainingService(BaseService):
    create_schema = CreateTrainingSchema
    edit_schema = EditTrainingSchema

    async def add(self, training: create_schema):
        check = await self.repo.get_by_name(training.name)
        if check is None or check.deleted:
            return await super().add(training)
        return None

    async def edit(self, training: edit_schema):
        check = await self.repo.get_by_name(training.name)
        if check is None or (check.id == training.id and not check.deleted):
            return await super().edit(training)
        return None

    async def get_all_by_filters(self, filters: TrainingFilterSchema):
        return await self.repo.get_all_training_by_filter(filters.search_string, filters.page_number, filters.page_size)
