from datetime import timedelta, datetime

from fastapi import Depends, HTTPException, status

from jose import jwt, JWTError, ExpiredSignatureError

from core.config import settings
from core.service import BaseService
from service.identity.models import User
from service.identity.repositories.user_repository import UserRepository
from service.identity.schemas import TokenData, UserChangePasswordSchema
from service.identity.utils import pwd_context, oauth2_scheme, hash_password
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
