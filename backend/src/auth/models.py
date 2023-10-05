import sqlalchemy as sa
from src.database import metadata


user = sa.Table(
    "user",
    metadata,
    sa.Column("id", sa.BigInteger, primary_key=True),
    sa.Column("email", sa.String(254), nullable=False),
    sa.Column("password", sa.String(128), nullable=False),
    sa.Column("is_superuser", sa.Boolean, default=False, nullable=False),
    sa.Column("is_active", sa.Boolean, default=True, nullable=False),
    sa.Column("is_verified", sa.Boolean, default=False, nullable=False),
    sa.Column("firstname", sa.String(50), nullable=False),
    sa.Column("lastname", sa.String(50), nullable=False),
    sa.Column("surname", sa.String(50)),
    sa.Column("birthday", sa.Date, nullable=False),
    sa.Column("photo", sa.String),
    sa.Column("type_id", sa.Integer, sa.ForeignKey("user_type.id")),
    sa.Column("gender", sa.String, nullable=False),
    sa.Column("group_id", sa.Integer, sa.ForeignKey("user_group.id")),
    sa.Column("rank_id", sa.Integer, sa.ForeignKey("user_rank.id")),
    sa.Column("contact", sa.String)
)

user_type = sa.Table(
    "user_type",
    metadata,
    sa.Column("id", sa.BigInteger, primary_key=True),
    sa.Column('name', sa.String, nullable=False)
)

user_group = sa.Table(
    "user_group",
    metadata,
    sa.Column("id", sa.BigInteger, primary_key=True),
    sa.Column("name", sa.String, nullable=False),
    sa.Column("trainer_id", sa.Integer, sa.ForeignKey("user.id", use_alter=True))
)

user_rank = sa.Table(
    "user_rank",
    metadata,
    sa.Column("id", sa.BigInteger, primary_key=True),
    sa.Column("name", sa.String, nullable=False),
    sa.Column("task", sa.Integer, sa.ForeignKey("task.id"))
)

task = sa.Table(
    "task",
    metadata,
    sa.Column("id", sa.BigInteger, primary_key=True),
    sa.Column("name", sa.String, nullable=False),
    sa.Column("description", sa.Text)
)
