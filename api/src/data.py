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


def get_ipma_data(data_path: str, start: datetime, end: datetime, city: int = 1040200) -> list:
    try:
        r = requests.get(f"https://api.ipma.pt/public-data/forecast/aggregate/{city}.json")
        data = [d for d in r.json() if 'tMed' in d.keys()]
            
        data = [[(float(d['tMed']), d['dataPrev']) for d in data[0:22]], [(float(d['tMed']), d['dataPrev']) for d in data[22:46]], [(float(d['tMed']), d['dataPrev']) for d in data[46:70]]]

        example = data[0][0]

        # fix missing temperatures 00:00 and 01:00
        data[0] = [(example[0]+0.2, example[1][0:12]+"0"+example[1][13:]), (example[0]+0.1, example[1][0:12]+"1"+example[1][13:])] + data[0]

        return data

    except Exception as e:
        print(e)
        print("error while reading file")
        exit(1)
