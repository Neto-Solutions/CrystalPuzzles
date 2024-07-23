from datetime import datetime

from core.abstractions.initializer_abstract import AbstractInitializer
from service.training.models import Training, TrainingLevel


class TrainingLevelInitialize(AbstractInitializer):
    model = TrainingLevel
    create_time = datetime.now()
    entities = [
        {
            "level": "beginner",
            "date_add": create_time,
            "date_update": create_time,
            "trainings": [
                Training(
                    name="Стойка на месте без посторонней помощи",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Самостоятельный подъем после падения",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Проезд на 2 ногах",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Саночки",
                    date_add=create_time,
                    date_update=create_time
                )
            ]
        },
        {
            "level": "base",
            "trainings": [
                Training(
                    name="Фонарики вперед",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Змейка вперед",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Ёлочка вперед",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Цапля вперед",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Прыжок на 2 ногах вперед",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Циркуль вперед",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Фонарики назад",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Ёлочка назад",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Перебежка вперед",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Выпад вперед",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Козлик",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Вращение на 2 ногах с заходом через циркуль",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Перебежка назад",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Змейка назад",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Дуга впереди внутрь",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Дуга впереди наружу",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Дуга назад внутрь",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Дуга назад наружу",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Шассе",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Тройка внутрь",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Тройка наружу",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Вальсовая тройка",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Обманный шаг",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Риттбергеровый шаг",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Моухок внутрь",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Мокхок наружу",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Шаг Джаксон",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Кросс роллы вперед",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Кросс роллы назад",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Перетяжки вперед",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Перетяжки назад",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Ласточка вперед",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Перекидной прыжок",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Вращение на 1 ноге",
                    date_add=create_time,
                    date_update=create_time
                )
            ],
            "date_add": create_time,
            "date_update": create_time,
        },
        {
            "level": "single_jumps",
            "trainings": [
                Training(
                    name="Тулуп",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Сальхов",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Риттбергер",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Флип",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Лутц",
                    date_add=create_time,
                    date_update=create_time
                )
            ],
            "date_add": create_time,
            "date_update": create_time,
        },
        {
            "level": "rotations",
            "trainings": [
                Training(
                    name="Вращение винт",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Вращение волчок",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Спираль в цапле",
                    date_add=create_time,
                    date_update=create_time
                )
            ],
            "date_add": create_time,
            "date_update": create_time,
        },
        {
            "level": "advanced",
            "trainings": [
                Training(
                    name="Каскад из одинарных прыжков",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Спираль в ласточке",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Вращение со сменой ноги",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Аксель",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Комбинированное вращение",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Спираль с захватом ноги",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Двойные прыжки (кроме 2А)",
                    date_add=create_time,
                    date_update=create_time
                ),
                Training(
                    name="Прыжок во вращение",
                    date_add=create_time,
                    date_update=create_time
                )
            ],
            "date_add": create_time,
            "date_update": create_time,
        }
    ]
