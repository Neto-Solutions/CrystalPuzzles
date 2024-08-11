from sqlalchemy import insert

from common.repository.base_repository import BaseRepository
from service.lesson.models import Check, TrainingCheck


class CheckRepository(BaseRepository):
    model = Check

    async def add(self, data: dict):
        for student in data.get("student_ids"):
            self.session.add(self.model(
                lesson_id=data.get("lesson_id"),
                student_id=student,
                training_data=[TrainingCheck(**training) for training in data.get("training_check")],
                date_add=data.get("date_add"),
                date_update=data.get("date_update")
                )
            )
            await self.session.commit()
        return True
