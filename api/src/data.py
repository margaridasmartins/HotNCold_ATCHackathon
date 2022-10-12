import json
import requests
from datetime import datetime

#http://localhost:8000/api/v1/optimize?start=2021-12-01T00%3A00%3A00&end=2022-01-01T00%3A00%3A00&supplier=EDP&tariff=S

def get_prices(supplier: str, tariff: str) -> list:
    r = requests.get(f"http://localhost:8001/api/v1/billing?supplier={supplier}&tariff={tariff}")
    return r.json()["data"]


def get_data(data_path: str, start: datetime, end: datetime) -> list:

    # TODO: add if to check if datetime is between the threshold presented in the file
    # if it is outside maybe use an external api to get the temperatures for the other dates

    try:
        with open(data_path) as f:

            data = json.loads(f.read())

            data = [(d['airTemperature'], d['time']) for d in data if start <= datetime.fromisoformat(d['time'][:-6]) <= end]

            data = [data[i:i+24] for i in range(0,len(data),24)]

            return data

    except Exception as e:
        print(e)
        print("error while reading file")
        exit(1)     # FIXME: change this to return a error response


def get_ipma_data(data_path: str) -> list:
    try:
        with open(data_path) as file:
            data = json.loads(file.read())
             
            data = [(d['tMed'], d['dataPrev']) for d in data][1:25] + [(d['tMed'], d['dataPrev']) for d in data][26:50] + [(d['tMed'], d['dataPrev']) for d in data][51:75]

            return data

    except Exception as e:
        print(e)
        print("error while reading file")
        exit(1)
