import math

from sqlalchemy import select, func

from core.database import async_session
from service.identity.models import User
from core.repository import BaseRepository


class UserRepository(BaseRepository):
    model = User

    async def get_by_email(self, email: str) -> User | None:
        async with async_session() as session:
            stmt = select(self.model).where(self.model.email == email)
            res = await session.execute(stmt)
            return res.scalar_one_or_none()

    async def get_all_user_by_filter(self, search_string: str, page_number: int, page_size: int):
        async with async_session() as session:
            stmt = select(self.model)

            if search_string:
                stmt = stmt.filter(
                    (self.model.email.ilike(f"%{search_string}%")) |
                    (self.model.firstname.ilike(f"%{search_string}%")) |
                    (self.model.lastname.ilike(f"%{search_string}%")) |
                    (self.model.surname.ilike(f"%{search_string}%"))
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
                "records": [row.to_read_model for row in records] if count_records != 0 else []
            }
        return response

    async def trainer_exists(self, trainer_id: int) -> bool:
        trainer = await self.get(trainer_id)
        if trainer and trainer.role == "trainer":
            return True
        return False

    async def student_exists(self, student_id: int) -> bool:
        trainer = await self.get(student_id)
        if trainer and trainer.role == "student":
            return True
        return False
