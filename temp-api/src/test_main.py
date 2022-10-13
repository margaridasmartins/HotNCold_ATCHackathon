from urllib import response
from fastapi.testclient import TestClient
import os
from .main import app

client = TestClient(app)

def test_locations_endpoint():
    """
    Given a user
    When he requests the available locations
    The the API should return all the locations labels and values
    """
    response = client.get("/api/v1/locations")
    data = response.json()
    data = data["data"]

    # check if request was sucessefull and all locations were sent
    assert response.status_code == 200
    assert len(data) == len(os.listdir("../data"))

def test_temperatures_valid_id():
    """
    Given a user
    When he requests the temperatures for a valid location
    The the API should return all the hourly temperatures for that location
    """
    response = client.get("/api/v1/temperatures/1040200?start=2021-12-01T00:00:00&end=2021-12-02T00:00:00")
    data = response.json()
    data = data["data"]

    assert response.status_code == 200
    assert len(data) == 24
    assert data[0][0] == 1.95


def test_temperatures_invalid_id():
    """
    Given a user
    When he requests the temperatures for a unknown location id
    The the API should respond with a 404 status code
    """
    response = client.get("/api/v1/temperatures/999999?start=2021-12-01T00:00:00&end=2022-01-01T00:00:00")
    assert response.status_code == 404
