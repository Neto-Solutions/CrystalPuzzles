from requests import get
from sqlalchemy import text

from typing import List
from datetime import datetime

from core.abstractions.healthcheck_abstract import AbstractHealthCheck
from core.database import sync_session
from core.schemas.healthcheck import HealthCheckModel, HealthCheckEntityModel, HealthCheckStatusEnum


class HealthCheckFactory:
    _healthItems: List[AbstractHealthCheck]
    _health: HealthCheckModel

    def __init__(self) -> None:
        self._healthItems = list()

    def add(self, item: AbstractHealthCheck) -> None:
        self._healthItems.append(item)

    def __startTimer__(self, entityTimer: bool) -> None:
        if entityTimer == True:
            self._entityStartTime = datetime.now()
        else:
            self._totalStartTime = datetime.now()

    def __stopTimer__(self, entityTimer: bool) -> None:
        if entityTimer == True:
            self._entityStopTime = datetime.now()
        else:
            self._totalStopTime = datetime.now()

    def __getTimeTaken__(self, entityTimer: bool) -> datetime:
        if entityTimer == True:
            return self._entityStopTime - self._entityStartTime
        return self._totalStopTime - self._totalStartTime

    def __dumpModel__(self, model: HealthCheckModel) -> str:
        """This goes and convert python objects to something a json object."""
        l = list()
        for i in model.entities:
            i.status = i.status.value
            i.timeTaken = str(i.timeTaken)
            l.append(dict(i))

        model.entities = l
        model.status = model.status.value
        model.totalTimeTaken = str(model.totalTimeTaken)

        return dict(model)

    def check(self) -> HealthCheckModel:
        self._health = HealthCheckModel()
        self.__startTimer__(False)
        for i in self._healthItems:
            # Generate the model
            item = HealthCheckEntityModel(alias=i._alias, tags=i._tags)

            # Track how long the entity took to respond
            self.__startTimer__(True)
            item.status = i.__checkHealth__()
            self.__stopTimer__(True)
            item.timeTaken = self.__getTimeTaken__(True)

            # if we have one dependency unhealthy, the service in unhealthy
            if item.status == HealthCheckStatusEnum.UNHEALTHY:
                self._health.status = HealthCheckStatusEnum.UNHEALTHY

            self._health.entities.append(item)
        self.__stopTimer__(False)
        self._health.totalTimeTaken = self.__getTimeTaken__(False)

        self._health = self.__dumpModel__(self._health)

        return self._health


class HealthCheckBase:
    def setConnectionUri(self, value: str) -> None:
        if value == "":
            raise Exception(f"{self._service} ConnectionUri is missing a value.")
        self._connectionUri = value

    def getConnectionUri(self) -> str:
        return self._connectionUri

    def setName(self, value: str) -> str:
        if not value:
            raise Exception("Missing a valid name.")
        self._name = value

    def getService(self) -> str:
        return self._service

    def getTags(self) -> List[str]:
        return self._tags

    def getAlias(self) -> str:
        return self._alias



class HealthCheckUri(HealthCheckBase, AbstractHealthCheck):
    _tags: List[str]
    _connectionUri: str
    _healthyCode: int
    _unhealthyCode: int

    def __init__(self, connectionUri: str, alias: str, tags: List[str], healthyCode: int = 200, unhealthyCode: int = 500) -> None:
        self.setConnectionUri(connectionUri)
        self._alias = alias
        self._tags = tags
        self._healthyCode = healthyCode
        self._unhealthyCode = unhealthyCode

    def __checkHealth__(self) -> bool:
        res = get(url=self.getConnectionUri(), headers={"User-Agent": "FastAPI HealthCheck"})
        if res.status_code == self._healthyCode:
            return HealthCheckStatusEnum.HEALTHY
        elif res.status_code != self._unhealthyCode:
            return HealthCheckStatusEnum.UNHEALTHY
        return HealthCheckStatusEnum.UNHEALTHY


class HealthCheckSQLAlchemy(HealthCheckBase, AbstractHealthCheck):
    _connectionUri: str
    _tags: List[str]
    _message: str

    def __init__(self, alias: str, tags: List[str]) -> None:
        self._alias = alias
        self._tags = tags

    def __checkHealth__(self) -> HealthCheckStatusEnum:
        res: HealthCheckStatusEnum = HealthCheckStatusEnum.UNHEALTHY
        with sync_session() as session:
            try:
                status = session.execute(text('SELECT pg_is_in_recovery()')).fetchone()[0]
                if status == False:
                    res = HealthCheckStatusEnum.HEALTHY
            except Exception as e:
                pass
        return res
