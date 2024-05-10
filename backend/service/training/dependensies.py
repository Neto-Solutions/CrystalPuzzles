from service.training.repository import TrainingRepository
from service.training.service import TrainingService


def training_service():
    return TrainingService(TrainingRepository)
