# Hot N Cold API

## Endpoints:

## Local Instalation

1. (Optional) Create a virtual environment
```
python3 -m venv venv
source venv/bin/activate
```

2. Install requirements
```
pip install -r requirements.txt
```

3. Running 
```
cd src
python -m gunicorn main:app -k uvicorn.workers.UvicornWorker
```