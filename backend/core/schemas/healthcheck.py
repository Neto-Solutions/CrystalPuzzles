from datetime import datetime
from typing import List, Optional, Union
from datetime import datetime
from pydantic import BaseModel
from enum import Enum


class HealthCheckStatusEnum(Enum):
    HEALTHY = "Healthy"
    UNHEALTHY = "Unhealthy"


class HealthCheckEntityModel(BaseModel):
    alias: str
    status: Union[HealthCheckStatusEnum, str] = HealthCheckStatusEnum.HEALTHY
    timeTaken: Union[Optional[datetime], str] = None
    tags: List[str] = list()


class HealthCheckModel(BaseModel):
    status: Union[HealthCheckStatusEnum, str] = HealthCheckStatusEnum.HEALTHY
    totalTimeTaken: Union[Optional[datetime], str] = None
    entities: List[HealthCheckEntityModel] = list()