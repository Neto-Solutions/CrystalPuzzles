import math

from sqlalchemy import select, func

from core.database import async_session
from service.identity.models import User
from core.repository import BaseRepository
from service.training.models import Training


class TrainingRepository(BaseRepository):
    model = Training

    async def get_by_name(self, name: str) -> User | None:
        async with async_session() as session:
            stmt = select(self.model).where(self.model.name == name)
            res = await session.execute(stmt)
            return res.scalar_one_or_none()

    async def get_all_training_by_filter(self, search_string: str, page_number: int, page_size: int):
        async with async_session() as session:
            stmt = select(self.model).where(self.model.deleted.__eq__(False))

            if search_string:
                stmt = stmt.filter(
                    (self.model.name.ilike(f"%{search_string}%")) |
                    (self.model.description.ilike(f"%{search_string}%"))
                )

            count_records = (await session.execute(select(func.count('*')).select_from(stmt))).scalar_one()
            if count_records != 0:
                records = (await session.execute(
                    stmt.order_by(self.model.date_update.desc()).offset(page_number * page_size).limit(
                        page_size))).scalars()
            response = {
                "page": page_number,
                "max_page_count": math.ceil(count_records / page_size) - 1,
                "count_records": count_records,
                "records": [row for row in records] if count_records != 0 else []
            }
        return response
