import sqlalchemy as sa
from src.database import metadata

lesson = sa.Table(
    "lesson",
    metadata,
    sa.Column("id", sa.Integer, primary_key=True),
    sa.Column("trainer_id", sa.Integer, sa.ForeignKey("user.id")),
    sa.Column("date", sa.Date),
    sa.Column("space_id", sa.Integer, sa.ForeignKey("space.id")),
    sa.Column("comments", sa.Text),
    sa.Column("check", sa.Integer, sa.ForeignKey("check.id"))
)

space = sa.Table(
    "space",
    metadata,
    sa.Column("id", sa.Integer, primary_key=True),
    sa.Column("name", sa.String)
)

check = sa.Table(
    "check",
    metadata,
    sa.Column("id", sa.Integer, primary_key=True),
    sa.Column("student_id", sa.Integer, sa.ForeignKey("user.id")),
    sa.Column("training_check_id", sa.Integer, sa.ForeignKey("training_check.id"))
)

training_check = sa.Table(
    "training_check",
    metadata,
    sa.Column("id", sa.Integer, primary_key=True),
    sa.Column("training_id", sa.Integer, sa.ForeignKey("training.id")),
    sa.Column("repetitions", sa.Integer),
    sa.Column("assessment", sa.Integer)
)

training = sa.Table(
    "training",
    metadata,
    sa.Column("id", sa.Integer, primary_key=True),
    sa.Column("name", sa.String)
)
