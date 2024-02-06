# import sqlalchemy as sa
# from sqlalchemy.orm import mapped_column, Mapped
# from src.database import Base
#
#
# class Schedule(Base):
#     __tablename__ = "schedule"
#     id: Mapped[int] = mapped_column(primary_key=True)
#     title: Mapped[str]
#     description = mapped_column(sa.Text)
#     datetime = mapped_column(sa.DateTime)
#     lesson_id: Mapped[int] = mapped_column(sa.ForeignKey("lesson.id"))
#     group_id: Mapped[int] = mapped_column(sa.ForeignKey("user_group.id"))
#
