# Hot N Cold Temperature API

## Temperature Data

Temperature data, *temperatureData.json*, was retrieved using [Stormglass](stormglass.io)
api. It's data source is the Germany’s National Meteorological Service, the Deutscher Wetterdiens.

## Endpoints:

-  /api/v3/locations - GET
    - Gives a list of available locations and its ID   
    Example
    ```
    /api/v3/locations
    ```
-  /api/v3/temperatures/{id} - GET
    - Gives hourly temperatures for the given time range
    - Parameters:
        - Start - the start datetime as string (inclusive)
        - End - the end datetime as string (exclusive)
        - Id - the id of the location
    Example
    ```
    /api/v3/temperatures/1010500?start=2021-12-01T00:00:00&end=2022-01-01T00:00:00
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

4. Testing
```
pytest
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