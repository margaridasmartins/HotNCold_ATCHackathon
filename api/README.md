# Hot N Cold API

## Endpoints:

-  /api/v1/optimize - GET
    - Gives hourly heat pump mode, confort score, energy spent and cost for the best price considering a minimum of 124 of confort score
    - Parameters:
        - Supplier - the name of the energy suplier
        - Tariff - the type of the tariff, can be simple, bi-hour or tri-hour
        - Start - the start datetime as string (inclusive)
        - End - the end datetime as string (exclusive)
    
    Example
    ```
    /api/v1/optimize?start=2021-12-01T00:00:00&end=2022-01-01T00:00:00&supplier=EDP&tariff=S
    ```
-  /api/v1/bestratio - GET
    - Gives hourly heat pump mode, confort score, energy spent and cost for the best ratio confort score / price
    - Parameters:
        - Supplier - the name of the energy suplier
        - Tariff - the type of the tariff, can be simple, bi-hour or tri-hour
        - Start - the start datetime as string (inclusive)
        - End - the end datetime as string (exclusive)
    
    Example
    ```
    /api/v1/bestratio?start=2021-12-01T00:00:00&end=2022-01-01T00:00:00&supplier=EDP&tariff=S
    ```
-  /api/v1/deadhours - GET
     - Gives hourly heat pump mode, confort score, energy spent and cost for the best price with a minimum confort score of 124 considering dead hours, i. e. hours where it does not matter if the house is warm
    - Parameters:
        - Supplier - the name of the energy suplier
        - Tariff - the type of the tariff, can be simple, bi-hour or tri-hour
        - Start - the start datetime as string (inclusive)
        - End - the end datetime as string (exclusive)
        - Hours - a list of ints representing the dead hours
    
    Example
    ```
    /api/v1/deadhours?start=2021-12-01T00:00:00&end=2022-01-01T00:00:00&supplier=EDP&tariff=B&hours=10,&hours=11,&hours=12,&hours=13,&hours=14
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
python -m uvicorn main:app --reload
```

## Docker Instalation

1. Build Image
```
sudo docker build -f Dockerfile -t api .
```

2. Run Container
```
sudo docker run --network=host api
```