from abc import ABC, abstractmethod
from typing import List

from service.healthcheck.schemas import HealthCheckStatusEnum


class AbstractHealthCheck(ABC):
    _connection_uri: str
    _alias: str
    _tags: List[str]

    @abstractmethod
    def set_connection_uri(self, value: str) -> None:
        """
        ConnectionUri will be the value that
        is requested to check the health of an endpoint.
        """
        pass

    @abstractmethod
    def set_name(self, value: str) -> None:
        """The Name is the friendly name of the health object."""
        pass

    @abstractmethod
    def get_service(self) -> str:
        """
        The Service is a definition of
        what kind of endpoint we are checking on.
        """
        pass

    @abstractmethod
    def get_tags(self) -> List[str]:
        pass

    @abstractmethod
    def __check_health__(self) -> HealthCheckStatusEnum:
        """Requests data from the endpoint to validate health."""
        pass
