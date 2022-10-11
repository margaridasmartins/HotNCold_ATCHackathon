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
python -m uvicorn main:app --reload
```

## Docker Instalation

1. Build Image
```
sudo docker build -f Dockerfile -t api ..
```

2. Run Container
```
sudo docker run -p 8000:8000 api
```