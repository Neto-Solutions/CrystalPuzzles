from datetime import datetime
from typing import List, Any, Type, get_origin, get_args, ClassVar, TYPE_CHECKING, Dict
import sqlalchemy as sa
from sqlalchemy import Integer, BigInteger, SmallInteger
from sqlalchemy.orm import MappedAsDataclass, declared_attr
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from typing import TypeVar, Generic

from typing_extensions import Self

T = TypeVar("T", bound=Any)


class GenericMixin(MappedAsDataclass, Generic[T]):
    __type_t: ClassVar[Type[T]]  # type: ignore[misc]

    def __init_subclass__(cls: Type[Self], /, **kwargs: Dict[str, Any]) -> None:
        """Set __type_t to the type of T."""
        # find GenericMixin and its type annotations in the list of base classes
        orig_bases: List[Type[Self]] = [orig_base for orig_base in cls.__orig_bases__ if
                                        get_origin(orig_base) is GenericMixin]  # type: ignore[attr-defined]
        assert len(orig_bases) == 1
        orig_base = orig_bases[0]
        # get the type of T from the type annotations
        generic_types = get_args(orig_base)
        assert len(generic_types) == 1
        cls.__type_t = generic_types[0]

        super().__init_subclass__(**kwargs)  # type: ignore[arg-type]

    date_add: Mapped[datetime] = mapped_column(sa.DateTime)
    date_update: Mapped[datetime] = mapped_column(sa.DateTime)

    def __id_impl(cls) -> Mapped[T]:
        """
        define the column.

        have to use a property because the type is variable and retrieved in __init_subclass__.
        """
        type_mapping = {
            int: Integer,
            BigInteger: BigInteger,
            SmallInteger: SmallInteger,
        }
        assert cls.__type_t in type_mapping, "Type not supported."
        return mapped_column(
            "Id",
            type_mapping[cls.__type_t],
            primary_key=True,
            unique=True,
            autoincrement=True,
            nullable=False,
            init=False)

    if TYPE_CHECKING:
        id: Mapped[T] = mapped_column("Id", Integer, primary_key=True, unique=True, autoincrement=True, nullable=False,
                                      init=False)
    else:
        @declared_attr
        def id(cls) -> Mapped[T]:
            return cls.__id_impl(cls)
