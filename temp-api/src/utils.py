from fastapi.responses import JSONResponse

def create_response(status_code=200, message="", data=[]) -> JSONResponse:
    """
    Util function to send HTTP responses.
    Parameters
    ----------
        status_code : `int`
            The status code of the response
        data : `Any`
            Some data to return, usually the object that was created/deleted
        message : `str`
            Message to return in the response
    Returns
    -------
        response : `JSONResponse`
            Json object with the aggregated response information
    """

    return JSONResponse(
        status_code=status_code,
        content={
            "message": message,
            "data": data,
        },
        headers={"Access-Control-Allow-Origin": "*"}
    )
