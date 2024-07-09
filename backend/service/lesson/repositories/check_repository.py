from common.repository.base_repository import BaseRepository
from service.lesson.models import Check


class CheckRepository(BaseRepository):
    model = Check


