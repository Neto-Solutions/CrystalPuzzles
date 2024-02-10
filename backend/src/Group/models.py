from typing import List

from requests import Session
from sqlalchemy.orm import Mapped, mapped_column, relationship
import sqlalchemy as sa

from src.Users.models import User
from src.modelmanager import ModelManager, AsyncModelManager
from src.database import Base


class Group(Base, ModelManager, AsyncModelManager):
    __tablename__ = "Groups"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(sa.String, nullable=False)
    trainer_id: Mapped[int] = mapped_column(sa.ForeignKey('Users.id', use_alter=True), nullable=True)
    trainer = relationship("User", foreign_keys=trainer_id)

    student = relationship("User", back_populates="group")



    @classmethod
    def trainer_exists(cls, db: Session, id) -> bool:
        if id in [None, 0] or User.get(db=db, id=id).role != "trainer":
            return False
        return True

    @classmethod
    def user_is_student(cls, db: Session, id) -> bool:
        user = User.get(db=db, id=id)
        if user and user.role == "student":
            return True
        return False

    def add_student(self, db: Session, student_id: int):
        if self.user_is_student(db=db, id=student_id):
            self.students.append(User.get(db=db, id=student_id))
            db.commit()
            return True
        return False

