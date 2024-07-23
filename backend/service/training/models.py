from datetime import datetime

from sqlalchemy.orm import Mapped, mapped_column, relationship
import sqlalchemy as sa

from common.model.base_model import Base


class Training(Base):
    __tablename__ = "Trainings"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    name: Mapped[str] = mapped_column(sa.String(50), nullable=False)
    description: Mapped[str] = mapped_column(sa.Text, nullable=True)

    level_id: Mapped[int] = mapped_column(sa.ForeignKey("TrainingLevels.id"), nullable=False)
    level = relationship("TrainingLevel")

    deleted: Mapped[bool] = mapped_column(sa.Boolean, default=False, nullable=False)
    date_add: Mapped[datetime] = mapped_column(sa.DateTime, nullable=False)
    date_update: Mapped[datetime] = mapped_column(sa.DateTime, nullable=False)

    check_data = relationship("TrainingCheck")


class TrainingLevel(Base):
    __tablename__ = "TrainingLevels"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    level: Mapped[str] = mapped_column(sa.String(50), nullable=False)

    trainings = relationship("Training", back_populates="level")

    date_add: Mapped[datetime] = mapped_column(sa.DateTime, nullable=False)
    date_update: Mapped[datetime] = mapped_column(sa.DateTime, nullable=False)
