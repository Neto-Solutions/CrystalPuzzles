from sqlalchemy.orm import Mapped, mapped_column, relationship
import sqlalchemy as sa

from common.model.base_model import Base


class Notification(Base):
    __tablename__ = "Notifications"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    text: Mapped[str] = mapped_column(sa.Text, nullable=False)
    status: Mapped[bool] = mapped_column(sa.Boolean, default=False)

    # receiver: Mapped[int] = mapped_column(sa.ForeignKey("Users.id"), nullable=False)




