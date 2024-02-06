from datetime import datetime

from fastapi import FastAPI
from sqlalchemy import func, select

from src.Users.models import Role
from src.Users.router import users_routers
from src.Group.router import group_routers, student_routers
from src.Auth.router import auth_routers
from src.Lesson.router import router as lesson_routers


from src.database import async_session_maker

app = FastAPI()


async def init_user_type():
    async with async_session_maker() as session:
        user_type_count_query = await session.execute(select(func.count('*')).select_from(Role))
        if user_type_count_query.scalar() == 0:
            session.add(Role(name="admin", DateAdd=datetime.now(), DateUpdate=datetime.now()))
            session.add(Role(name="trainer", DateAdd=datetime.now(), DateUpdate=datetime.now()))
            session.add(Role(name="student", DateAdd=datetime.now(), DateUpdate=datetime.now()))
            await session.commit()


# Добавление инициализации данных в событие startup
@app.on_event("startup")
async def startup_event():
    await init_user_type()


app.include_router(auth_routers)
app.include_router(users_routers)
app.include_router(group_routers)
app.include_router(student_routers)
# app.include_router(lesson_routers)


