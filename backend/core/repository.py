from datetime import datetime

from fastapi import HTTPException
from sqlalchemy import insert, select, delete, update
from sqlalchemy.exc import IntegrityError

from core.abstractions.repository_abstract import AbstractRepository
from core.database import async_session


class BaseRepository(AbstractRepository):
    model = None

    async def add(self, data: dict) -> int:
        async with async_session() as session:
            try:
                stmt = insert(self.model).values(
                    **data
                ).returning(self.model.id)

                res = await session.execute(stmt)
                await session.commit()
                return res.scalar_one()
            except IntegrityError as e:
                raise
            except Exception as e:
                await session.rollback()
                raise HTTPException(status_code=500, detail=str(e))

    async def add_range(self, data: list):
        async with async_session() as session:
            try:
                session.add_all([self.model(**(entity.model_dump())) for entity in data])
                await session.commit()
                return True
            except Exception as e:
                await session.rollback()
                raise HTTPException(status_code=500, detail=str(e))

    async def get_all(self):
        async with async_session() as session:
            stmt = select(self.model).where(self.model.deleted == False)
            res = await session.execute(stmt)
            return res.all()

    async def get(self, object_id: int):
        async with async_session() as session:
            stmt = select(self.model).where(self.model.id == object_id).where(self.model.deleted == False)
            res = await session.execute(stmt)
            return res.scalar_one_or_none()

    async def delete_db(self, object_id: int):
        async with async_session() as session:
            try:
                stmt = delete(self.model).where(self.model.id == object_id).returning(self.model.id)
                res = await session.execute(stmt)
                await session.commit()
                return bool(res.scalar_one_or_none())
            except Exception as e:
                await session.rollback()
                raise HTTPException(status_code=500, detail=str(e))

    async def delete(self, object_id: int) -> bool:
        async with async_session() as session:
            try:
                stmt = (update(self.model)
                        .where(self.model.id == object_id)
                        .where(self.model.deleted.__eq__(False))
                        .values(deleted=True, date_update=datetime.now())
                        .returning(self.model.id))
                res = await session.execute(stmt)
                await session.commit()
                return res.scalar_one_or_none()
            except Exception as e:
                await session.rollback()
                raise HTTPException(status_code=500, detail=str(e))

    async def delete_range(self):  # ToDo
        pass

    async def edit(self, data: dict):
        async with async_session() as session:
            try:
                id = data.pop('id')
                stmt = update(self.model).where(self.model.id == id).where(self.model.deleted == False).values(
                    **data
                ).returning(self.model.id)
                res = await session.execute(stmt)
                await session.commit()
                return bool(res.scalar_one_or_none())
            except Exception as e:
                await session.rollback()
                raise HTTPException(status_code=500, detail=str(e))

    async def exist(self, object_id: int) -> bool:
        async with async_session() as session:
            stmt = select(self.model).where(self.model.id == object_id).where(self.model.deleted == False)
            res = await session.execute(stmt)
            return bool(res.scalar_one_or_none())
