from datetime import datetime

from sqlalchemy.orm import Mapped, mapped_column
import sqlalchemy as sa

from core.database import Base


class Lesson(Base):
    __tablename__ = "Lessons"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    trainer_id: Mapped[int] = mapped_column(sa.ForeignKey('Users.id'), nullable=True)
    space_id: Mapped[int] = mapped_column(sa.ForeignKey('Spaces.id'), nullable=True)
    trainer_comments: Mapped[str] = mapped_column(sa.Text, nullable=True)
    start: Mapped[datetime] = mapped_column(sa.DateTime, nullable=False)
    deleted: Mapped[bool] = mapped_column(sa.Boolean, default=False, nullable=False)
    date_add: Mapped[datetime] = mapped_column(sa.DateTime, nullable=False)
    date_update: Mapped[datetime] = mapped_column(sa.DateTime, nullable=False)


class Space(Base):
    __tablename__ = "Spaces"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    name: Mapped[str] = mapped_column(sa.String(10), nullable=True)
    deleted: Mapped[bool] = mapped_column(sa.Boolean, default=False, nullable=False)
    date_add: Mapped[datetime] = mapped_column(sa.DateTime, nullable=False)
    date_update: Mapped[datetime] = mapped_column(sa.DateTime, nullable=False)


class Check(Base):
    __tablename__ = "Checks"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    student_id: Mapped[int] = mapped_column(sa.ForeignKey("Users.id"), primary_key=True)
    deleted: Mapped[bool] = mapped_column(sa.Boolean, default=False, nullable=False)
    date_add: Mapped[datetime] = mapped_column(sa.DateTime, nullable=False)
    date_update: Mapped[datetime] = mapped_column(sa.DateTime, nullable=False)


class TrainingCheck(Base):
    __tablename__ = "TrainingChecks"
    check_id: Mapped[int] = mapped_column(sa.ForeignKey("Checks.id"), primary_key=True)
    training_id: Mapped[int] = mapped_column(sa.ForeignKey("Trainings.id"), primary_key=True)
