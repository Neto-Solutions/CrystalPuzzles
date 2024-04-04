import logging

from alembic import command, config
import uvicorn


def run_migrations() -> None:
    """
    Подключает Alembic и выполняет миграции БД
    """
    try:
        logging.info('Start Alembic migrations')
        alembic_cfg = config.Config("alembic.ini")
        command.upgrade(alembic_cfg, "head")
        logging.info('Alembic migrations success')
    except Exception as e:
        logging.error(f'Error while running Alembic migrations: {e}')


if __name__ == '__main__':

    run_migrations()

    uvicorn.run(
        'src.main:app',
        host="0.0.0.0",
        port=8000,
        lifespan='on',
        loop='uvloop',
        reload=True,
        )
