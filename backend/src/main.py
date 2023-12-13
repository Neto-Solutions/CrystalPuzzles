from fastapi import FastAPI
from sqlalchemy import func, select

from src.auth.models import UserType
from src.auth.router import router as auth_routers
from src.database import async_session_maker

app = FastAPI()


async def init_user_type():
    async with async_session_maker() as session:
        user_type_count_query = await session.execute(select(func.count('*')).select_from(UserType))
        if user_type_count_query.scalar() == 0:
            session.add(UserType(name="admin"))
            session.add(UserType(name="trainer"))
            session.add(UserType(name="student"))
            await session.commit()


# Добавление инициализации данных в событие startup
@app.on_event("startup")
async def startup_event():
    await init_user_type()


@app.get("/")
async def root():
    return {"message": "Hello World"}


app.include_router(auth_routers)
