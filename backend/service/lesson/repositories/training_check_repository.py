from common.repository.base_repository import BaseRepository
from service.lesson.models import TrainingCheck


class TrainingCheckRepository(BaseRepository):
    model = TrainingCheck
