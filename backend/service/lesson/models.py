from datetime import datetime

from sqlalchemy.orm import Mapped, mapped_column, relationship
import sqlalchemy as sa

from common.model.base_model import Base


class Lesson(Base):
    __tablename__ = "Lessons"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    trainer_id: Mapped[int] = mapped_column(sa.ForeignKey('Users.id'), nullable=True)
    trainer = relationship("User", back_populates="lessons")

    space_id: Mapped[int] = mapped_column(sa.ForeignKey('Spaces.id'), nullable=True)
    space = relationship("Space", back_populates="lessons")

    trainer_comments: Mapped[str] = mapped_column(sa.Text, nullable=True)
    start: Mapped[datetime] = mapped_column(sa.DateTime, nullable=False)
    deleted: Mapped[bool] = mapped_column(sa.Boolean, default=False, nullable=False)
    date_add: Mapped[datetime] = mapped_column(sa.DateTime, nullable=False)
    date_update: Mapped[datetime] = mapped_column(sa.DateTime, nullable=False)

    check = relationship("Check", back_populates="lesson")


class Space(Base):
    __tablename__ = "Spaces"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    name: Mapped[str] = mapped_column(sa.String(255), nullable=True)
    deleted: Mapped[bool] = mapped_column(sa.Boolean, default=False, nullable=False)
    date_add: Mapped[datetime] = mapped_column(sa.DateTime, nullable=False)
    date_update: Mapped[datetime] = mapped_column(sa.DateTime, nullable=False)

    lessons = relationship("Lesson", back_populates="space")


class Check(Base):
    __tablename__ = "Checks"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    student_id: Mapped[int] = mapped_column(sa.ForeignKey("Users.id"), nullable=False)

    lesson_id: Mapped[int] = mapped_column(sa.ForeignKey("Lessons.id"), nullable=False)
    lesson = relationship("Lesson", back_populates="check")

    deleted: Mapped[bool] = mapped_column(sa.Boolean, default=False, nullable=False)
    date_add: Mapped[datetime] = mapped_column(sa.DateTime, nullable=False)
    date_update: Mapped[datetime] = mapped_column(sa.DateTime, nullable=False)

    training_data = relationship("TrainingCheck", back_populates="check")


class TrainingCheck(Base):
    __tablename__ = "TrainingChecks"
    check_id: Mapped[int] = mapped_column(sa.ForeignKey("Checks.id"), primary_key=True)
    check = relationship("Check", back_populates="training_data")

    training_id: Mapped[int] = mapped_column(sa.ForeignKey("Trainings.id"), primary_key=True)
    training = relationship("Training", back_populates="check_data")

    repetitions: Mapped[int] = mapped_column(sa.Integer, nullable=True)
    assessment: Mapped[int] = mapped_column(sa.Integer, nullable=True)
