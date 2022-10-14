from datetime import datetime
import logging
from fastapi import FastAPI
from fastapi.responses import JSONResponse

import os
import json

from utils import create_response


# Logger
logging.basicConfig(
    format="%(module)-20s:%(levelname)-15s| %(message)s",
    level=logging.INFO
)

app = FastAPI()

data_path= "../data/" # data temperature files

@app.get("/api/v1/locations")
def locations()-> JSONResponse:
    """
    Endpoint ``/locations`` that accepts the method GET. Returns the list of locations and its id
    Returns
    -------
        response : `JSONResponse`
            Json response with the status code and data.
    """
    try:
        temp_files = os.listdir(data_path)
        response = []

        # loop through each file name
        for f in temp_files:
            city_vals = f.replace(".json", "").split("-")
            response.append({"label": city_vals[1], "value": city_vals[0]})
        return create_response(status_code=200,data=response)
    except BaseException as e:
        logging.debug(e)
        print(e)
        return create_response(status_code=400, message="Sorry something went wrong")

@app.get("/api/v1/temperatures/{id}")
def temperatures(
        id,
        start: datetime,
        end: datetime
    )-> JSONResponse:
    """
    Endpoint ``/temperatures`` that accepts the method GET. Returns the hourly temperature for a given location
        id: int
            The location id
        start: `datetime`
            The start datetime as string (inclusive)
        end: `datetime`
            The end datetime as string (exclusive)
    Returns
    -------
        response : `JSONResponse`
            Json response with the status code and data.
    """
    try:
        temp_files = os.listdir(data_path)

        for f in temp_files:
            if f[:7] == id:
                with open(data_path+f) as temp_file:
                    data = json.loads(temp_file.read())
                    data = [(d['airTemperature'], d['time']) for d in data if start <= datetime.fromisoformat(d['time'][:-6]) < end]
                    return  create_response(status_code=200, data=data)

        return create_response(status_code=404,message="Location does not exist")
    except BaseException as e:
        logging.debug(e)
        print(e)
        return create_response(status_code=400, message="Sorry something went wrong")


