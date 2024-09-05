from sqlalchemy import insert, select
from sqlalchemy.orm import selectinload

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

    async def add_user_for_lesson(self, lesson_id, data: dict):
        """Добавить пользователя в урок."""
        training_data = (await self.session.execute(
            select(self.model)
            .options(
                selectinload(self.model.training_data)
            )
            .filter(
                self.model.lesson_id == lesson_id
            )
            .limit(1)
        )).scalar_one_or_none()

        stmt = insert(self.model).values(
            lesson_id=lesson_id,
            student_id=data["student_id"],
            training_data=training_data,
            date_add=data["date_add"],
            date_update=data["date_update"]
        ).returning(self.model.id)
        check_id = (await self.session.execute(stmt)).scalar_one_or_none()
        return True
