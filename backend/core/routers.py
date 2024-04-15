from typing import Callable
from starlette.responses import JSONResponse

from core.schemas.healthcheck import HealthCheckStatusEnum
from core.utils.healthcheck import HealthCheckFactory


def healthCheckRoute(factory: HealthCheckFactory) -> Callable:
    _factory = factory

    def endpoint() -> JSONResponse:
        res = _factory.check()
        if res['status'] == HealthCheckStatusEnum.UNHEALTHY.value:
            return JSONResponse(content=res, status_code=500)
        return JSONResponse(content=res, status_code=200)

    return endpoint