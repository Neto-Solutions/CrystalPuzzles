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
    trainer = relationship("User", foreign_keys=trainer_id, backref="trainer")

    @classmethod
    def trainer_exists(cls, db: Session, id) -> bool:
        if id in [None, 0] or User.get(db=db, id=id).role != "trainer":
            return False
        return True

    def add_student(self, db: Session, student_id: int):
        user = User.get(db=db, id=student_id)
        if user and user.is_student():
            StudentGroup(student_id=user.id, group_id=self.id).create(db=db)
            return True
        return False

    def delete_student(self, db: Session, student_id: int):
        user = User.get(db=db, id=student_id)
        if user and user.is_student():
            if user.group[0].group_id == self.id:
                user.group[0].delete(db)
            return True
        return False


class StudentGroup(Base, ModelManager):
    __tablename__ = "StudentGroups"
    student_id: Mapped[int] = mapped_column(sa.ForeignKey("Users.id"), unique=True)
    group_id: Mapped[int] = mapped_column(sa.ForeignKey("Groups.id"))

    student = relationship("User", foreign_keys=student_id, backref="group")
    group = relationship("Group", foreign_keys=group_id, backref="students")

