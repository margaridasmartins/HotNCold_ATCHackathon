FROM python:3.9

ENV "ENV" "PROD"

WORKDIR /backend

COPY ./api/requirements.txt /backend/requirements.txt


RUN pip install  --upgrade -r /backend/requirements.txt

WORKDIR /backend/src

COPY data /backend/src/data

COPY api/src/ .

CMD [ "uvicorn", "main:app",  "--host", "0.0.0.0", "--port", "8000"]
