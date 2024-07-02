from core.repository import BaseRepository
from service.lesson.models import Check


class CheckRepository(BaseRepository):
    model = Check


