import sqlalchemy as sa
from src.database import metadata

schedule = sa.Table(
    "schedule",
    metadata,
    sa.Column("title", sa.String),
    sa.Column("description", sa.Text),
    sa.Column("datetime", sa.DateTime),
    sa.Column("lesson_id", sa.Integer, sa.ForeignKey("lesson.id")),
    sa.Column("group_id", sa.Integer, sa.ForeignKey("user_group.id"))
)
