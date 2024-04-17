from contextlib import asynccontextmanager

from fastapi import FastAPI
import uvicorn
from fastapi.openapi.utils import get_openapi

from fastapi.middleware.cors import CORSMiddleware

from core.config import settings
from core.routers import healthCheckRoute
from core.utils.healthcheck import HealthCheckFactory, HealthCheckSQLAlchemy, HealthCheckUri
from service.identity.initialize import RolesInitialize


from service.group.routers.group_router import group_router
from service.identity.routers.auth_router import auth_routers
from service.identity.routers.user_router import user_router
from service.identity.routers.profile_router import profile_router
from service.group.routers.student_router import student_router

""" Initialize """
@asynccontextmanager
async def lifespan(app: FastAPI):
    await RolesInitialize.initialize()
    yield



""" Application """
app = FastAPI(
    lifespan=lifespan,
    openapi_url=settings.openapi_url,
    # swagger_ui_init_oauth={"clientId": settings.CLIENT_ID, "clientSecret": settings.CLIENT_SECRET}
)

""" Swagger configuration """
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


"""CORS configuration"""
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=False,
)


"""Healthcheck"""
_healthChecks = HealthCheckFactory()

_healthChecks.add(HealthCheckSQLAlchemy(
    alias='crystal_puzzles_db',
    tags=['crystal_puzzles_db'])
)
_healthChecks.add(HealthCheckUri(
    alias='crystal_puzzles_api',
    connectionUri=f"{settings.BASE_PATH}/swagger/docs/v1.0/devices",
    tags=['crystal_puzzles_api'])
)


""" Routing """
all_routers = [
    user_router,
    profile_router,
    auth_routers,
    group_router,
    student_router
]


for router in all_routers:
    app.include_router(router)

app.add_api_route('/health', endpoint=healthCheckRoute(factory=_healthChecks), include_in_schema=False)

if __name__ == '__main__':

    uvicorn.run(
        'main:app',
        host="0.0.0.0",
        port=8000,
        reload=True,
        loop='uvloop',
    )
