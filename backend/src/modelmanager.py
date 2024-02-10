from datetime import datetime

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session


class ModelManager:

    @classmethod
    def get(cls, db: Session, id: int):
        return db.query(cls).filter(cls.id == id).first()

    @classmethod
    def get_all(cls, db: Session):
        return db.query(cls).all()

    def create(self, db: Session):
        try:
            self.DateAdd = datetime.now()
            self.DateUpdate = datetime.now()
            db.add(self)
            db.commit()
            return self
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=400, detail=str(e))

    def update(self, db: Session, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
        self.DateUpdate = datetime.now()
        db.commit()
        return self

    def delete(self, db: Session):
        try:
            db.delete(self)
            db.commit()
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=400, detail=str(e))


class AsyncModelManager:

    @classmethod
    async def get_all_async(cls, db: AsyncSession):
        result = await db.execute(select(cls))
        return result.scalars().all()

    @classmethod
    async def get_async(cls, db: AsyncSession, id: int):
        result = await db.execute(select(cls).filter(cls.id == id))
        return result.scalars().first()

    async def create_async(self, db: AsyncSession):
        try:
            self.DateAdd = datetime.now()
            self.DateUpdate = datetime.now()
            db.add(self)
            await db.commit()
            return self
        except Exception as e:
            await db.rollback()
            raise HTTPException(status_code=400, detail=str(e))

    async def update_async(self, db: AsyncSession, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
        self.DateUpdate = datetime.now()
        await db.commit()
        return self

    async def delete_async(self, db: AsyncSession):
        try:
            await db.delete(self)
            await db.commit()
        except Exception as e:
            await db.rollback()
            raise HTTPException(status_code=400, detail=str(e))
