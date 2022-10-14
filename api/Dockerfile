FROM python:3.9


WORKDIR /backend

COPY ./requirements.txt /backend/requirements.txt


RUN pip install  --upgrade -r /backend/requirements.txt

COPY config.json /backend/config.json

WORKDIR /backend/src

COPY src/ .

CMD [ "uvicorn", "main:app",  "--host", "0.0.0.0", "--port", "8000"]
