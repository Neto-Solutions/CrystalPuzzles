FROM python:3.11

RUN pip3 install pipenv

WORKDIR /app

COPY Pipfile ./
RUN pipenv lock

RUN set -ex && pipenv install --deploy --system

COPY . .

EXPOSE 8000

CMD ["python", "main.py"]