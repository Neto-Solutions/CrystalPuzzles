FROM python:3.11
WORKDIR /app
COPY Pipfile Pipfile.lock /app/
RUN pip install pipenv && \
# pipenv install --system --deploy --ignore-pipfile
pipenv install --deploy
COPY . /app/
EXPOSE 8000
CMD ["pipenv", "run", "python", "start.py"]