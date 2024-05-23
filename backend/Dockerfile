FROM python:3.11-alpine

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONFAULTHANDLER 1

RUN pip install --upgrade pip
RUN  pip install pipenv

COPY Pipfile ./
RUN pipenv lock

RUN set -ex && pipenv install --deploy --system

COPY . .

EXPOSE 8000

CMD ["python", "main.py"]