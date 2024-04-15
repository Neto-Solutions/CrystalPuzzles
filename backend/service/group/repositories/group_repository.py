import math

from datetime import datetime
from sqlalchemy import select, func

from core.database import async_session
from core.repository import BaseRepository
from service.group.models import Group
from service.identity.models import User


class GroupRepository(BaseRepository):
    model = Group

    async def get_by_name(self, name: str) -> Group | None:
        async with async_session() as session:
            stmt = select(self.model).where(self.model.name == name).where(self.model.deleted != True)
            res = await session.execute(stmt)
            return res.scalar_one_or_none()

    async def get_all_group_by_filter(self, search_string: str, date_begin: datetime, date_end: datetime,
                                trainer: int, page_number: int, page_size: int):
        async with async_session() as session:
            stmt = select(self.model).where(self.model.deleted == False).join(User).where(self.model.trainer_id == User.id)

            if search_string:
                stmt = stmt.filter(
                    # ToDo: поиск по имени ученика
                    (self.model.name.ilike(f"%{search_string}%")) |
                    (User.firstname.ilike(f"%{search_string}%")) |
                    (User.lastname.ilike(f"%{search_string}%")) |
                    (User.surname.ilike(f"%{search_string}%"))
                )
            if date_begin:
                stmt = stmt.filter(self.model.date_update >= date_begin.date())
            if date_end:
                stmt = stmt.filter(self.model.date_update <= date_end.date())
            if trainer:
                stmt = stmt.filter(self.model.trainer_id == trainer)

            count_records = (await session.execute(select(func.count('*')).select_from(stmt))).scalar_one()
            if count_records != 0:
                records = (await session.execute(
                    stmt.order_by(self.model.date_update.desc()).offset(page_number * page_size).limit(
                        page_size))).scalars()
            response = {
                "page": page_number,
                "max_page_count": math.ceil(count_records / page_size) - 1,
                "count_records": count_records,
                "records": records if count_records != 0 else []
            }
        return response


