from pydantic import AfterValidator
from typing_extensions import Annotated


class ExtendedTypes:

    @staticmethod
    def validate_int16(value: int) -> int:
        if value > 32767 or value <= 0:
            raise ValueError("Value must be of type int16 and not 0")
        return value

    Int16 = Annotated[int, AfterValidator(validate_int16)]

    @staticmethod
    def validate_int64(value: int) -> int:
        if value > 9223372036854775807 or value <= 0:
            raise ValueError("Value must be of type int64 and not 0")
        return value

    Int64 = Annotated[int, AfterValidator(validate_int64)]
