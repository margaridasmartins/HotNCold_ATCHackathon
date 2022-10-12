# Hot N Cold Temperature API

## Temperature Data

Temperature data, *temperatureData.json*, was retrieved using [Stormglass](stormglass.io)
api. It's data source is the Germany’s National Meteorological Service, the Deutscher Wetterdiens.

## Endpoints:

-  /api/v1/locations - GET
    - Gives a list of available locations and its ID   
    Example
    ```
    /api/v1/locations
    ```

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
python -m uvicorn main:app --reload --port 8002
```

## Docker Instalation

1. Build Image
```
sudo docker build -f Dockerfile -t temp-api .
```

2. Run Container
```
sudo docker run --network=host temp-api
```