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
tariffs = [{"label": "Simple", "value": "S"}, {"label": "Bi-Hour", "value": "B"}, {"label": "Tri-Hour", "value": "T"}] # list of available tariffs

@app.get("/api/v2/billing")
def get_billing(
        supplier:  str,
        tariff: str = "S",
    )-> JSONResponse:
    """
    Endpoint ``/billing`` that accepts the method GET. Returns the energy price for each hour of the day.
    Parameters:
        supplier: `str`
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
                # low price hour between 10pm to 8am, 35% less expensive than normal value
                normal_price = 0.20 + random() * 0.15
                low_price = 0.65 * normal_price
                return create_response(status_code=200, data=[low_price]*8 + [normal_price]*14 + [low_price]*2) 

            elif tariff == "T":
                # high price hour between 8am to 10am and 6pm to 9 pm, 50% more expensive than normal value
                # medium price hour between 10am to 6pm and 9pm to 11 pm
                # low price hour in the left hours, 50% less expensive than normal value
                normal_price = 0.20 + random() * 0.15
                low_price = 0.5 * normal_price
                high_price = 1.5 * normal_price
                return create_response(status_code=200, data=[low_price]*8 + [high_price]*2 + [normal_price]*8 + [high_price]*3 + [normal_price]*2 + [low_price]) 
                
            return create_response(status_code=400, message="Wrong billing type")

        return create_response(status_code=400, message="Suplier not supported")
    except BaseException as e:
        logging.debug(e)
        print(e)
        return create_response(status_code=400, message="Bad arguments")
    

@app.get("/api/v2/suppliers")
def get_suppliers() -> JSONResponse:
    """
    Endpoint ``/suppliers`` that accepts the method GET. Returns a list of available suppliers
    Returns
    -------
        response : `JSONResponse`
            Json response with the status code and data.
    """
    try:
        return create_response(status_code=200, data=supliers) 
    except BaseException as e:
        logging.debug(e)
        print(e)
        return create_response(status_code=400, message="Bad arguments")

@app.get("/api/v2/tariffs/{supplier}")
def get_tariffs(
        supplier: str
    ) -> JSONResponse:
    """
    Endpoint ``/tariffs`` that accepts the method GET. Returns a list of available 
    types of tariffs for the given supplier.
    Parameters:
        supplier: `str`
            The name of the supplier
    Returns
    -------
        response : `JSONResponse`
            Json response with the status code and data.
    """
    try:
        if supplier in supliers:
            return create_response(status_code=200, data=tariffs) 
        return create_response(status_code=404, message="Supplier not found")
    except BaseException as e:
        logging.debug(e)
        print(e)
        return create_response(status_code=400, message="Bad arguments")