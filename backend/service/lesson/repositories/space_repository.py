import math

from sqlalchemy import select, func

from core.database import async_session
from core.repository import BaseRepository
from service.users.models import User
from service.lesson.models import Space


class SpaceRepository(BaseRepository):
    model = Space

    async def get_by_name(self, name: str) -> User | None:
        async with async_session() as session:
            stmt = select(self.model).where(self.model.name == name)
            res = await session.execute(stmt)
            return res.scalar_one_or_none()

    async def get_all_spaces_by_filter(self, search_string: str, page_number: int, page_size: int):
        async with async_session() as session:
            stmt = select(self.model).where(self.model.deleted.__eq__(False))

            if search_string:
                stmt = stmt.filter(
                    (self.model.name.ilike(f"%{search_string}%")) |
                    (self.model.id.ilike(f"%{search_string}%"))
                )

            count_records = (await session.execute(select(func.count(stmt.c.id)))).scalar_one()
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
