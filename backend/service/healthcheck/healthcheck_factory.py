from requests import get
from sqlalchemy import text

from core.abstractions.healthcheck_abstract import AbstractHealthCheck
from core.database import sync_session


from typing import List
from datetime import datetime

from service.healthcheck.schemas import HealthCheckModel, HealthCheckEntityModel, HealthCheckStatusEnum


class HealthCheckFactory:
    _health_items: List[AbstractHealthCheck]
    _health: HealthCheckModel

    def __init__(self) -> None:
        self._health_items = list()

    def add(self, item: AbstractHealthCheck) -> None:
        self._health_items.append(item)

    def __start_timer__(self, entity_timer: bool) -> None:
        if entity_timer is True:
            self._entity_start_time = datetime.now()
        else:
            self._total_start_time = datetime.now()

    def __stop_timer__(self, entity_timer: bool) -> None:
        if entity_timer is True:
            self._entity_stop_time = datetime.now()
        else:
            self._total_stop_time = datetime.now()

    def __get_time_taken__(self, entityTimer: bool) -> datetime:
        if entityTimer is True:
            return self._entity_stop_time - self._entity_start_time
        return self._total_stop_time - self._total_start_time

    @staticmethod
    def __dump_model__(model: HealthCheckModel) -> dict:
        """This goes and convert python objects to something a json object."""
        json_list = list()
        for entity in model.entities:
            entity.status = entity.status.value
            entity.time_taken = str(entity.time_taken)
            json_list.append(dict(entity))

        model.entities = json_list
        model.status = model.status.value
        model.total_time_taken = str(model.total_time_taken)

        return dict(model)

    def check(self) -> HealthCheckModel:
        self._health = HealthCheckModel()
        self.__start_timer__(False)
        for i in self._health_items:
            # Generate the model
            item = HealthCheckEntityModel(alias=i._alias, tags=i._tags)

            # Track how long the entity took to respond
            self.__start_timer__(True)
            item.status = i.__check_health__()
            self.__stop_timer__(True)
            item.time_taken = self.__get_time_taken__(True)

            # if we have one dependency unhealthy, the service in unhealthy
            if item.status == HealthCheckStatusEnum.UNHEALTHY:
                self._health.status = HealthCheckStatusEnum.UNHEALTHY

            self._health.entities.append(item)
        self.__stop_timer__(False)
        self._health.total_time_taken = self.__get_time_taken__(False)

        self._health = self.__dump_model__(self._health)

        return self._health


class HealthCheckBase:
    def set_connection_uri(self, value: str) -> None:
        if value == "":
            raise Exception(
                f"{self._service} ConnectionUri is missing a value."
            )
        self._connection_uri = value

    def get_connection_uri(self) -> str:
        return self._connection_uri

    def set_name(self, value: str) -> str:
        if not value:
            raise Exception("Missing a valid name.")
        self._name = value

    def get_service(self) -> str:
        return self._service

    def get_tags(self) -> List[str]:
        return self._tags

    def get_alias(self) -> str:
        return self._alias


class HealthCheckUri(HealthCheckBase, AbstractHealthCheck):
    _tags: List[str]
    _connection_uri: str
    _healthy_code: int
    _unhealthy_code: int

    def __init__(
            self,
            connection_uri: str,
            alias: str, tags: List[str],
            healthy_code: int = 200,
            unhealthy_code: int = 500
    ) -> None:
        self.set_connection_uri(connection_uri)
        self._alias = alias
        self._tags = tags
        self._healthy_code = healthy_code
        self._unhealthy_code = unhealthy_code

    def __check_health__(self) -> bool:
        res = get(
            url=self.get_connection_uri(),
            headers={"User-Agent": "FastAPI HealthCheck"}
        )
        if res.status_code == self._healthy_code:
            return HealthCheckStatusEnum.HEALTHY
        elif res.status_code != self._unhealthy_code:
            return HealthCheckStatusEnum.UNHEALTHY
        return HealthCheckStatusEnum.UNHEALTHY


class HealthCheckSQLAlchemy(HealthCheckBase, AbstractHealthCheck):
    _connection_uri: str
    _tags: List[str]
    _message: str

    def __init__(self, alias: str, tags: List[str]) -> None:
        self._alias = alias
        self._tags = tags

    def __check_health__(self) -> HealthCheckStatusEnum:
        res: HealthCheckStatusEnum = HealthCheckStatusEnum.UNHEALTHY
        with sync_session() as session:
            try:
                status = session.execute(
                    text('SELECT pg_is_in_recovery()')
                ).fetchone()[0]
                if status is False:
                    res = HealthCheckStatusEnum.HEALTHY
            except Exception:
                pass
        return res
