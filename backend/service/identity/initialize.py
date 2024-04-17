from datetime import datetime

from core.abstractions.initializer import Initializer
from service.identity.models import Role


class RolesInitialize(Initializer):
    model = Role
    entities = [
        {
            "name": "admin",
            "date_add": datetime.now(),
            "date_update": datetime.now()
        },
        {
            "name": "trainer",
            "date_add": datetime.now(),
            "date_update": datetime.now()
        },
        {
            "name": "student",
            "date_add": datetime.now(),
            "date_update": datetime.now()
        },
        {
            "name": "supervisor",
            "date_add": datetime.now(),
            "date_update": datetime.now()
        }
    ]
