from datetime import date
from fcntl import DN_DELETE
import logging
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from typing import List
import os

from utils import create_response

from simple import simple

# Logger
logging.basicConfig(
    format="%(module)-20s:%(levelname)-15s| %(message)s",
    level=logging.INFO
)

# Seperate prod from dev
env = os.getenv("ENV", "DEV")
if env == "PROD":
    data_path = "data/"
else:
    data_path = "../../data/"

app = FastAPI()

@app.get("/api/v1/optimize")
def simple_request(
        price: float,
        low_price: float = 0,
        high_price: float = 0,
        type: str = "S",
        start: int = 0,
        end: int = 744
    )-> JSONResponse:
    """
    Endpoint ``/optimize`` that accepts the method GET. Returns the best confort score / price ratio.
    Parameters:
        type : `str`
            The type of the energy pricing, can be S (simple), B (bi-hour) or T (tri-hour)
        price : `List[float]`
            The energy billing price is a list, with length 1 for S type, 2 for B and 3 for T.
        start : `int`
            index of first record to be considered (inclusive)
        end : `int`
            index of last record to be considered (exclusive)
    Returns
    -------
        response : `JSONResponse`
            Json response with the status code and data.
    """
    try:
        temp_data = data_path + 'temperatureData.json'
        if type == "S":
            return create_response(status_code=200, data=simple(temp_data,price, start, end))
        elif type == "B":
            #TODO
            pass
        elif type == "T":
            pass
            #TODO
        return create_response(status_code=400, message="Wrong billing type")
    except BaseException as e:
        logging.debug(e)
        return create_response(status_code=400, message="Bad arguments")
    

