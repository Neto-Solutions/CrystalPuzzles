from abc import ABC, abstractmethod


class AbstractRepository(ABC):
    @abstractmethod
    async def add(self, data: dict):
        raise NotImplementedError

    @abstractmethod
    async def add_range(self, data: list):
        raise NotImplementedError

    @abstractmethod
    async def get_all(self):
        raise NotImplementedError

    @abstractmethod
    async def get(self, object_id: int):
        raise NotImplementedError

    @abstractmethod
    async def delete(self, object_id: int):
        raise NotImplementedError

    @abstractmethod
    async def delete_db(self, object_id: int):
        raise NotImplementedError

    @abstractmethod
    async def delete_range(self):
        pass

    @abstractmethod
    async def edit(self):
        raise NotImplementedError

    @abstractmethod
    async def exist(self, data: dict):
        raise NotImplementedError
