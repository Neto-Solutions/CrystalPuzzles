from datetime import datetime

from sqlalchemy import CheckConstraint
from sqlalchemy.dialects.postgresql import BYTEA
from sqlalchemy.orm import Mapped, mapped_column, relationship
import sqlalchemy as sa

from common.model.base_model import Base
from service.group.models import Group


class User(Base):
    __tablename__ = "Users"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    date_add: Mapped[datetime] = mapped_column(sa.DateTime)
    date_update: Mapped[datetime] = mapped_column(sa.DateTime)
    deleted: Mapped[bool] = mapped_column(sa.Boolean, default=False, nullable=False)
    email: Mapped[str] = mapped_column(sa.String(254), nullable=False)
    hashed_password: Mapped[bytes] = mapped_column(sa.LargeBinary, nullable=False)
    is_superuser: Mapped[bool] = mapped_column(sa.Boolean, default=False, nullable=False)
    is_active: Mapped[bool] = mapped_column(sa.Boolean, default=True, nullable=False)
    is_verified: Mapped[bool] = mapped_column(sa.Boolean, default=False, nullable=False)
    firstname: Mapped[str] = mapped_column(sa.String, nullable=True)
    lastname: Mapped[str] = mapped_column(sa.String, nullable=True)
    surname: Mapped[str] = mapped_column(sa.String, nullable=True)
    code: Mapped[int] = mapped_column(nullable=True)
    birthday: Mapped[datetime] = mapped_column(sa.DateTime, nullable=True)
    avatar: Mapped[int] = mapped_column(sa.Integer, CheckConstraint('avatar >= 1 AND avatar <= 8'), nullable=True)
    photo: Mapped[str] = mapped_column(sa.String, nullable=True)
    role: Mapped[str] = mapped_column(sa.String, sa.ForeignKey("Roles.name"), nullable=True, default="student")
    is_man: Mapped[bool] = mapped_column(sa.Boolean, nullable=False, default=True)
    rank_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("Ranks.id"), nullable=True)
    contact: Mapped[str] = mapped_column(sa.String, nullable=True)
    extended_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("ExtendedDataset.id"), nullable=True)

    # ссылка для тренера на список групп, в которых он числиться преподователем
    group = relationship("Group", back_populates="trainer")
    # ссылка для студентов на группу, которой он пренадлежит
    student_group = relationship("StudentGroup", back_populates="student")
    lessons = relationship("Lesson")
    students = relationship("Check")
    extensions = relationship("ExtendedData", uselist=False)


class ExtendedData(Base):
    __tablename__ = "ExtendedDataset"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    phone_number: Mapped[str] = mapped_column(sa.String, nullable=True, default=None)
    area: Mapped[str] = mapped_column(sa.String, nullable=True, default=None)
    accompanying: Mapped[str] = mapped_column(sa.String, nullable=True, default=None)
    health_data: Mapped[str] = mapped_column(sa.String, nullable=True, default=None)
    triggers: Mapped[str] = mapped_column(sa.String, nullable=True, default=None)
    student = relationship("User", back_populates="extensions", uselist=False)



class Role(Base):
    __tablename__ = "Roles"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    date_add: Mapped[datetime] = mapped_column(sa.DateTime)
    date_update: Mapped[datetime] = mapped_column(sa.DateTime)
    name: Mapped[str] = mapped_column(sa.String, nullable=False, unique=True)


class Rank(Base):
    __tablename__ = "Ranks"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    date_add: Mapped[datetime] = mapped_column(sa.DateTime)
    date_update: Mapped[datetime] = mapped_column(sa.DateTime)
    name: Mapped[str] = mapped_column(sa.String, nullable=False)
    task_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("Tasks.id"))


class Task(Base):
    __tablename__ = "Tasks"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    date_add: Mapped[datetime] = mapped_column(sa.DateTime)
    date_update: Mapped[datetime] = mapped_column(sa.DateTime)
    name: Mapped[str] = mapped_column(sa.String, nullable=False)
    description = mapped_column(sa.Text, nullable=True)
