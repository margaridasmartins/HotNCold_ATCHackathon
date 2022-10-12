# Hot N Cold Mock Billing API

## Endpoints:

-  /api/v1/billing - GET
    - Gives a list of prices per hour
    - Parameters:
        - Supplier - the name of the energy suplier
        - Tariff - the type of the tariff, can be simple, bi-hour or tri-hour
    
    Example
    ```
    /api/v1/billing?supplier=EDP&tariff=B
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
python -m uvicorn main:app --reload --port 8001
```

## Docker Instalation

1. Build Image
```
sudo docker build -f Dockerfile -t billing-api .
```

2. Run Container
```
sudo docker run --network=host billing-api
```