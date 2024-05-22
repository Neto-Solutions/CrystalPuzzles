import math
from typing import Optional

from fastapi import HTTPException
from sqlalchemy import select, func, update

from core.database import async_session
from service.identity.models import User
from core.repository import BaseRepository


class UserRepository(BaseRepository):
    model = User

    async def get_by_email(self, email: str) -> User | None:
        async with async_session() as session:
            stmt = select(self.model).filter(self.model.email == email)
            return (await session.execute(stmt)).scalar_one_or_none()

    async def get_with_deleted(self, user_id: int):
        async with async_session() as session:
            stmt = select(self.model).filter(self.model.id == user_id)
            return (await session.execute(stmt)).scalar_one_or_none()

    async def edit_with_deleted(self, data: dict):
        async with async_session() as session:
            try:
                id = data.pop('id')
                stmt = update(self.model).where(self.model.id == id).values(
                    **data
                ).returning(self.model.id)
                res = await session.execute(stmt)
                await session.commit()
                return bool(res.scalar_one_or_none())
            except Exception as e:
                await session.rollback()
                raise HTTPException(status_code=500, detail=str(e))

    async def get_all_user_by_filter(self, search_string: str, page_number: int, page_size: int, deleted: Optional[bool]):
        async with async_session() as session:
            stmt = select(self.model)

            if search_string:
                stmt = stmt.filter(
                    (self.model.email.ilike(f"%{search_string}%")) |
                    (self.model.firstname.ilike(f"%{search_string}%")) |
                    (self.model.lastname.ilike(f"%{search_string}%")) |
                    (self.model.surname.ilike(f"%{search_string}%"))
                )
            if deleted is not None:
                stmt = stmt.filter(self.model.deleted.__eq__(deleted))
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
