import logging
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from utils import create_response

from simple import simple

# Logger
logging.basicConfig(
    format="%(module)-20s:%(levelname)-15s| %(message)s",
    level=logging.INFO
)

app = FastAPI()

@app.get("/api/v1/simple")
def simple_request()-> JSONResponse:
    
    return create_response(status_code=200, data=simple(1))

