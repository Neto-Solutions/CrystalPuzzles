from contextlib import asynccontextmanager
from datetime import datetime

from fastapi import FastAPI
from sqlalchemy import func, select

from src.Users.models import Role
from src.Users.router import users_routers, profile_routers
from src.Group.router import group_routers, student_routers
from src.auth.router import auth_routers
from src.lesson.router import router as lesson_routers
from src.database import async_session_maker


async def init_user_type() -> None:
    """
    Выполняет инициализацию типов пользователей
    """
    async with async_session_maker() as session:
        user_type_count_query = await session.execute(select(func.count('*')).select_from(Role))
        if not user_type_count_query.scalar():
            session.add(Role(name="admin", DateAdd=datetime.now(), DateUpdate=datetime.now()))
            session.add(Role(name="trainer", DateAdd=datetime.now(), DateUpdate=datetime.now()))
            session.add(Role(name="student", DateAdd=datetime.now(), DateUpdate=datetime.now()))
            session.add(Role(name="supervisor", DateAdd=datetime.now(), DateUpdate=datetime.now()))
            await session.commit()


@asynccontextmanager
async def lifespan(app_: FastAPI):
    app.include_router(auth_routers)
    app.include_router(users_routers)
    app.include_router(profile_routers)
    app.include_router(group_routers)
    app.include_router(student_routers)
    # app.include_router(lesson_routers)
    await init_user_type()
    yield


app = FastAPI(lifespan=lifespan)
