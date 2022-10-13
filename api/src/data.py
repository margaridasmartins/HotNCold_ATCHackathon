import json
import requests
from datetime import datetime

#http://localhost:8000/api/v1/optimize?start=2021-12-01T00%3A00%3A00&end=2022-01-01T00%3A00%3A00&supplier=EDP&tariff=S

def get_prices(supplier: str, tariff: str) -> list:
    """
    Method to obtain the prices of energy based on a supplier and a type of tariff
    Parameters
    ----------
        supplier: str
            The name of the supplier
        tariff: str
            The type of tariff, can be simple, bi-hour or tri-hour
    Returns
    ---------
        response:  list with 24 float values each representing a price at the given hour
    """
    r = requests.get(f"http://localhost:8001/api/v1/billing?supplier={supplier}&tariff={tariff}")
    return r.json()["data"]


def get_data(start: datetime, end: datetime, city: int = 1040200) -> list:
    """
    Method to obtain the temperatures recorded/predicted in a certain time interval
    Parameters
    ----------
        data_path : `str`
            Path to the file with measurements.

        start : `DateTime`
            First day of the search interval.

        end : `DateTime`
            Last day of the search interval.
        
        city : `int`
            ipma city code

    Returns
    -------
        response : `list with tuples(float, str)`
            List with tuples with a temperature and its associated datetime
    """

    # TODO: add if to check if datetime is between the threshold presented in the file
    # if it is outside maybe use an external api to get the temperatures for the other dates

    if datetime.today().date() == start.date() or datetime.today().date() == end.date():
        try:
            r = requests.get(f"https://api.ipma.pt/public-data/forecast/aggregate/{city}.json")
            data = [d for d in r.json() if 'tMed' in d.keys() and start.date() <= datetime.fromisoformat(d['dataPrev'][:-6]).date() <= end.date()]
                
            data = [(float(d['tMed']), d['dataPrev']) for d in data]

            # fix missing temperatures 00:00 and 01:00
            data = [(data[0][0]+0.2, data[0][1][0:12]+"0"+data[0][1][13:]), (data[0][0]+0.1, data[0][1][0:12]+"1"+data[0][1][13:])] + data

            data = [data[i:i+24] for i in range(0,len(data),24)]

            return data

        except Exception as e:
            print(e)
            print("error while reading file")
            exit(1)
    else:
        try:
           r=requests.get(f"http://localhost:8002/api/v1/temperatures/{city}?start={start}&end={end}")
           r= r.json()
           data = [r["data"][i:i+24] for i in range(0,len(r["data"]),24)]
           return data
        except Exception as e:
            print(e)
            print("error while reading file")
            exit(1)     # FIXME: change this to return a error response

