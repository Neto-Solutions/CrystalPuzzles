from contextlib import asynccontextmanager
import logging

from alembic import command, config
from fastapi import FastAPI
import uvicorn
from fastapi.openapi.utils import get_openapi

from fastapi.middleware.cors import CORSMiddleware

from core.config import get_settings
from service.group.routers.group_router import group_router
from service.group.routers.student_group_router import student_group_router
from service.healthcheck.routers import health_check_route
from service.healthcheck.healthcheck_factory import HealthCheckFactory, HealthCheckSQLAlchemy, HealthCheckUri
from service.lesson.routers.check_router import check_router
from service.lesson.routers.lesson_router import lesson_router
from service.lesson.routers.space_router import space_router
from service.training.initialize import TrainingLevelInitialize
from service.training.router import training_router
from service.users.initialize import RolesInitialize, BaseUserInitialize

from service.users.routers.admin_panel_router import admin_panel_router
from service.users.routers.profile_router import profile_router
from service.users.routers.students_router import student_router
from service.users.routers.user_router import user_router
from service.identity.routers import auth_routers
from service.notifications.routers.notifications_router import notifications_router

settings = get_settings()


# region ------------------------------ initialize ----------------------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    await RolesInitialize.initialize()
    await BaseUserInitialize.initialize()
    await TrainingLevelInitialize.initialize()
    yield


# endregion -------------------------------------------------------------------------


# region ---------------------------- Application -----------------------------------
app = FastAPI(
    lifespan=lifespan,
    openapi_url=settings.openapi_url,
    # swagger_ui_init_oauth={
    # "clientId": settings.CLIENT_ID,
    # "clientSecret": settings.CLIENT_SECRET
    # }
)


# endregion -------------------------------------------------------------------------

# region ------------------------- Swagger configuration ----------------------------

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Crystal Puzzles",
        version="1.0",
        summary="Хрустальные пазлы",
        routes=app.routes,
    )
    openapi_schema["info"]["x-logo"] = {
        "url": "https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png"
    }
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi
# endregion -------------------------------------------------------------------------

# region ------------------------- CORS configuration -------------------------------

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=False,
)
# endregion -------------------------------------------------------------------------

# region ----------------------------- Healthcheck ----------------------------------
_health_checks = HealthCheckFactory()

_health_checks.add(HealthCheckSQLAlchemy(
    alias='crystal_puzzles_db',
    tags=['crystal_puzzles_db'])
)
_health_checks.add(HealthCheckUri(
    alias='crystal_puzzles_api',
    connection_uri=f"{settings.base_path}{settings.openapi_url}",
    tags=['crystal_puzzles_api'])
)
# endregion -------------------------------------------------------------------------

# region -------------------------------- Routing -----------------------------------
all_routers = [
    auth_routers,
    user_router,
    profile_router,
    student_router,
    admin_panel_router,
    group_router,
    student_group_router,
    training_router,
    space_router,
    lesson_router,
    notifications_router,
    # check_router
]

for router in all_routers:
    app.include_router(router)

app.add_api_route(
    '/health',
    endpoint=health_check_route(factory=_health_checks),
    include_in_schema=False
)


# endregion -------------------------------------------------------------------------

# region ------------------------------ Migrations ----------------------------------
def run_migrations() -> None:
    """
    Подключает Alembic и выполняет миграции БД
    """
    try:
        logging.info('Start Alembic migrations')
        alembic_cfg = config.Config("alembic.ini")
        command.upgrade(alembic_cfg, "head")
        logging.info('Alembic migrations success')
    except Exception as e:
        logging.error(f'Error while running Alembic migrations: {e}')


# endregion -------------------------------------------------------------------------

if __name__ == '__main__':
    run_migrations()

    uvicorn.run(
        'main:app',
        host="0.0.0.0",
        port=settings.port,
        reload=True,
        loop='uvloop',  # работает только на linux
    )
