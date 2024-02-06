import smtplib
from email.message import EmailMessage

from celery import Celery

from src.Users.config import SMTP_PASSWORD, SMTP_USER, SMTP_HOST, SMTP_PORT

celery = Celery('tasks', broker='redis://localhost:6379')


def get_email_template(user_dict: dict):
    """ Email-шаблон """
    email = EmailMessage()
    email['Subject'] = 'Натрейдил Отчет Дашборд'
    email['From'] = SMTP_USER
    email['To'] = user_dict["email"]
    email.set_content(f'Ваш код подтверждения - {user_dict["code"]}')
    return email


@celery.task
def send_code_email_verified(user_dict: dict):
    """ Отправка кода для верификации email """
    email = get_email_template(user_dict)
    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT) as server:
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(email)
