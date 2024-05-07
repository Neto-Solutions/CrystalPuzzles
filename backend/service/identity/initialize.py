from datetime import datetime

from sqlalchemy import select, func

from core.abstractions.initializer import Initializer
from core.database import async_session
from service.identity.models import Role, User
from service.identity.security import hash_password


class RolesInitialize(Initializer):
    model = Role
    entities = [
        {
            "name": "admin",
            "date_add": datetime.now(),
            "date_update": datetime.now()
        },
        {
            "name": "trainer",
            "date_add": datetime.now(),
            "date_update": datetime.now()
        },
        {
            "name": "student",
            "date_add": datetime.now(),
            "date_update": datetime.now()
        },
        {
            "name": "supervisor",
            "date_add": datetime.now(),
            "date_update": datetime.now()
        }
    ]


class BaseUserInitialize(Initializer):
    model = User
    entities = [
        {
            "email": "admin@crystal.com",
            "hashed_password": hash_password("adminpass"),
            "role": "admin",
            "date_add": datetime.now(),
            "date_update": datetime.now()
        },
        {
            "email": "trainer@crystal.com",
            "hashed_password": hash_password("trainerpass"),
            "role": "trainer",
            "date_add": datetime.now(),
            "date_update": datetime.now()
        },
        {
            "email": "student@crystal.com",
            "hashed_password": hash_password("studentpass"),
            "role": "student",
            "date_add": datetime.now(),
            "date_update": datetime.now()
        },
        {
            "email": "supervisor@crystal.com",
            "hashed_password": hash_password("supervisorpass"),
            "role": "supervisor",
            "date_add": datetime.now(),
            "date_update": datetime.now()
        }
    ]

    @classmethod
    async def initialize(cls):
        gener_class_type = cls.model
        try:
            async with async_session() as session:
                for entity in cls.entities:
                    entity_exists = await session.execute(select(func.count('*')).select_from(gener_class_type).
                                                          where(gener_class_type.email == entity.get("email")))
                    if entity_exists.scalar() == 0:
                        session.add(gener_class_type(**entity))
                await session.commit()
        except Exception as e:
            await session.rollback()
            raise e
        else:
            pass
