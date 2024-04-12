from fastapi import HTTPException
from sqlalchemy import select, func, insert, delete
from sqlalchemy.exc import IntegrityError

from core.database import async_session
from core.repository import BaseRepository
from service.group.models import StudentGroup


class StudentRepository(BaseRepository):
    model = StudentGroup

    async def add(self, data: dict) -> int:
        async with async_session() as session:
            try:
                stmt = insert(self.model).values(**data)
                await session.execute(stmt)
                await session.commit()
                res = await session.execute(select(func.count('*')).select_from(self.model).where(self.model.student_id == data.get("student_id")))
                return bool(res.scalar())
            except IntegrityError:
                return False
            except Exception as e:
                await session.rollback()
                raise HTTPException(status_code=500, detail=str(e))

    async def delete(self, data: dict) -> int:
        async with async_session() as session:
            try:
                stmt = delete(self.model).where(self.model.student_id == data.get("student_id")).where(self.model.group_id == data.get("group_id"))
                await session.execute(stmt)
                await session.commit()
                res = await session.execute(select(func.count('*')).select_from(self.model).where(self.model.student_id == data.get("student_id")).where(self.model.group_id == data.get("group_id")))
                return bool(res.scalar_one_or_none())
            except Exception as e:
                await session.rollback()
                raise HTTPException(status_code=500, detail=str(e))