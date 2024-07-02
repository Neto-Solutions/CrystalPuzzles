from core.repository import BaseRepository
from service.lesson.models import TrainingCheck


class TrainingCheckRepository(BaseRepository):
    model = TrainingCheck
