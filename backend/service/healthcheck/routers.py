from typing import Callable
from starlette.responses import JSONResponse

from service.healthcheck.healthcheck_factory import HealthCheckFactory
from service.healthcheck.schemas import HealthCheckStatusEnum


def health_check_route(factory: HealthCheckFactory) -> Callable:
    _factory = factory

    def endpoint() -> JSONResponse:
        res = _factory.check()
        if res['status'] == HealthCheckStatusEnum.UNHEALTHY.value:
            return JSONResponse(content=res, status_code=500)
        return JSONResponse(content=res, status_code=200)

    return endpoint
