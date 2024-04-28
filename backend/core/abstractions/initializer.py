from abc import ABC

from sqlalchemy import func, select

from core.database import async_session


class Initializer(ABC):
    model = None
    entities = []

    @classmethod
    async def initialize(cls):
        gener_class_type = cls.model
        async with async_session() as session:
            model_exists = await session.execute(select(func.count('*')).select_from(gener_class_type))
            if model_exists.scalar() == 0:
                try:
                    for entity in cls.entities:
                        session.add(gener_class_type(**entity))
                    await session.commit()
                except Exception as e:
                    await session.rollback()
                    raise e
            else:
                pass
