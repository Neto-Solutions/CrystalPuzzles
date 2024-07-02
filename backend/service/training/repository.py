import math
from typing import Optional

from sqlalchemy import select, func, or_

from common.repository.base_repository import BaseRepository
from core.database import async_session
from service.training.schemas import TrainingFilterSchema
from service.users.models import User
from service.training.models import Training


class TrainingRepository(BaseRepository):
    model = Training

    async def get_by_name(self, name: str) -> Optional[User]:
        stmt = select(self.model).where(self.model.name == name)
        result = (await self.session.execute(stmt)).scalar_one_or_none()
        return result

    async def get_all_training_by_filter(self, filters: TrainingFilterSchema):
        stmt = select(self.model).where(self.model.deleted.__eq__(False))

        if filters.search_string:
            stmt = stmt.filter(or_(
                self.model.name.ilike(f"%{filters.search_string}%"),
                self.model.description.ilike(f"%{filters.search_string}%")
                )
            )

        count_records = await self._get_count_records(stmt)
        records = await self._get_records(count_records, stmt, filters)
        response = await self._convert_response(count_records, records, filters)
        return response
