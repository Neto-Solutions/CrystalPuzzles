from sqlalchemy.orm import Mapped, mapped_column
from src.database import Base
import sqlalchemy as sa


class Lesson(Base):
    __tablename__ = "lesson"
    id: Mapped[int] = mapped_column(primary_key=True)
    trainer_id: Mapped[int] = mapped_column(sa.ForeignKey("user.id"))
    date = mapped_column(sa.Date)
    space_id: Mapped[int] = mapped_column(sa.ForeignKey("space.id"))
    comments = mapped_column(sa.Text, nullable=True)
    check: Mapped[int] = mapped_column(sa.ForeignKey("check.id"))


class Space(Base):
    __tablename__ = "space"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(sa.String)


class Check(Base):
    __tablename__ = "check"
    id: Mapped[int] = mapped_column(primary_key=True)
    student_id: Mapped[int] = mapped_column(sa.ForeignKey("user.id"))
    training_check_id: Mapped[int] = mapped_column(sa.ForeignKey("training_check.id"))


class TrainingCheck(Base):
    __tablename__ = "training_check"
    id: Mapped[int] = mapped_column(primary_key=True)
    training_id: Mapped[int] = mapped_column(sa.ForeignKey("training.id"))
    repetitions: Mapped[int]
    assessment: Mapped[int]


class Training(Base):
    __tablename__ = "training"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(sa.String)
