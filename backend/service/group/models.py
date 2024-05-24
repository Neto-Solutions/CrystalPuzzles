from datetime import datetime

from sqlalchemy.orm import Mapped, mapped_column, relationship
import sqlalchemy as sa

from core.database import Base
from service.group.schemas import GroupViewSchemaForTable


class Group(Base):
    __tablename__ = "Groups"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    date_add: Mapped[datetime] = mapped_column(sa.DateTime)
    date_update: Mapped[datetime] = mapped_column(sa.DateTime)
    deleted: Mapped[bool] = mapped_column(sa.Boolean, default=False, nullable=False)
    name: Mapped[str] = mapped_column(sa.String, nullable=False)
    trainer_id: Mapped[int] = mapped_column(sa.ForeignKey('Users.id', use_alter=True), nullable=True)
    trainer = relationship("User", back_populates="group")
    students = relationship("StudentGroup", back_populates="group")


class StudentGroup(Base):
    __tablename__ = "StudentGroups"
    student_id: Mapped[int] = mapped_column(sa.ForeignKey("Users.id"), unique=True, primary_key=True)
    group_id: Mapped[int] = mapped_column(sa.ForeignKey("Groups.id"), primary_key=True)

    student = relationship("User", back_populates="student_group")
    group = relationship("Group", back_populates="students")

