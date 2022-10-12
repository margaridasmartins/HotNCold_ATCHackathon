import logging
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from typing import List
from fastapi import Query
import datetime
import os

from utils import create_response

from data import get_prices
from algorithms import dead_hours, min_cost, best_ratio

# Logger
logging.basicConfig(
    format="%(module)-20s:%(levelname)-15s| %(message)s",
    level=logging.INFO
)


app = FastAPI()

@app.get("/api/v1/optimize")
def simple_request(
        start:  datetime.datetime,
        end: datetime.datetime,
        supplier: str,
        tariff: str = "S",
        city: int = 1040200
    )-> JSONResponse:
    """
    Endpoint ``/optimize`` that accepts the method GET. Returns the best price for a minimum of 124 confort score.
    Parameters:
        start: `str`
            The start datetime as string (inclusive)
        end: `str`
            The end datetime as string (exclusive)
        supplier:
            The name of the supplier
        tariff: `str`
            The corresponding tariff type. Available "S", "B", "T"
        city :  int
            Temperature Location ID
    Returns
    -------
        response : `JSONResponse`
            Json response with the status code and data.
    """
    try:
        prices = get_prices(supplier, tariff)

        if len(prices) == 0:
            return create_response(status_code=400, message="Wrong billing type")
        
        return create_response(status_code=200, data=min_cost( prices, start, end, city))
        
    except BaseException as e:
        logging.debug(e)
        print(e)
        return create_response(status_code=400, message="Bad arguments")

@app.get("/api/v1/bestratio")
def simple_request(
        start:  datetime.datetime,
        end: datetime.datetime,
        supplier: str,
        tariff: str = "S",
        city: int = 1040200
    )-> JSONResponse:
    """
    Endpoint ``/bestratio`` that accepts the method GET. Returns the best confort score / price ratio.
    Parameters:
        start: `str`
            The start datetime as string (inclusive)
        end: `str`
            The end datetime as string (exclusive)
        supplier:
            The name of the supplier
        tariff: `str`
            The corresponding tariff type. Available "S", "B", "T"
        city :  int
            Temperature Location ID
    Returns
    -------
        response : `JSONResponse`
            Json response with the status code and data.
    """
    try:
        prices = get_prices(supplier, tariff)

        if len(prices) == 0:
            return create_response(status_code=400, message="Wrong billing type")
        
        return create_response(status_code=200, data=best_ratio(prices, start, end, city))
        
    except BaseException as e:
        logging.debug(e)
        print(e)
        return create_response(status_code=400, message="Bad arguments")

@app.get("/api/v1/deadhours")
def deadhours_request(
        start: datetime.datetime,
        end: datetime.datetime,
        supplier: str,
        tariff: str = "S",
        hours: List[int] = Query(...),
        city: int = 1040200
    ) -> JSONResponse:
    """
    Endpoint ``/deadhours`` that accepts the method GET. Returns the best price for a minimum confort score of 124 considering dead hours,
    i.e. hours where it does not matter whether the house is hot or not.
    Parameters:
        start: `str`
            The start datetime as string (inclusive)
        end: `str`
            The end datetime as string (exclusive)
        supplier:
            The name of the supplier
        tariff: `str`
            The corresponding tariff type. Available "S", "B", "T"
        hours: `List[int]`
            The list with the dead hours
        city :  int
            Temperature Location ID
    Returns
    --------
        response : `JSONResponse`
            Json response with the status code and data.
    """
    try:
        prices = get_prices(supplier, tariff)

        if len(prices) == 0:
            return create_response(status_code=400, message="Wrong billing type")
        

        return create_response(status_code=200, data=dead_hours( prices, start, end, hours, city))
        
    except BaseException as e:
        logging.debug(e)
        print(e)
        return create_response(status_code=400, message="Bad arguments")


