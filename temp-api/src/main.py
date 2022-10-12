import logging
from fastapi import FastAPI
from fastapi.responses import JSONResponse

import os

from utils import create_response


# Logger
logging.basicConfig(
    format="%(module)-20s:%(levelname)-15s| %(message)s",
    level=logging.INFO
)

app = FastAPI()

data_path= "../data/" # data temperature files

@app.get("/api/v1/locations")
def simple_request()-> JSONResponse:
    """
    Endpoint ``/locations`` that accepts the method GET. Returns the list of locations and its id
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
    

