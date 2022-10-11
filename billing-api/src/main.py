import logging
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from random import random

from utils import create_response


# Logger
logging.basicConfig(
    format="%(module)-20s:%(levelname)-15s| %(message)s",
    level=logging.INFO
)

app = FastAPI()

supliers = ["EDP", "GALP", "ENDESA"] # list of available suppliers

@app.get("/api/v1/billing")
def simple_request(
        supplier:  str,
        tariff: str = "S",
    )-> JSONResponse:
    """
    Endpoint ``/billing`` that accepts the method GET. Returns the energy price for each hour of the day.
    Parameters:
        supplier:
            The name of the supplier
        tariff: `str`
            The corresponding tariff type. Available "S", "B", "T"
    Returns
    -------
        response : `JSONResponse`
            Json response with the status code and data.
    """
    try:
        if supplier in supliers:
            if tariff == "S":
                return create_response(status_code=200, data=[0.15 + random() * 0.15]*24) #  generates random billing value between 0.15 and 0.3

            elif tariff == "B":
                #TODO
                pass
            elif tariff == "T":
                pass
                #TODO
            
            return create_response(status_code=400, message="Wrong billing type")

        return create_response(status_code=400, message="Suplier not supported")
    except BaseException as e:
        logging.debug(e)
        print(e)
        return create_response(status_code=400, message="Bad arguments")
    

