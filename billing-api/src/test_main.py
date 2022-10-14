from fastapi.testclient import TestClient
import os
from .main import app

client = TestClient(app)

def test_billing_endpoint_simple_tariff():
    """
    Given a user
    When he requests the billing for a simple tariff
    Then all hourly prices should be the same
    """
    response = client.get("/api/v1/billing?supplier=EDP&tariff=S")
    data = response.json()
    data = data["data"]

    assert response.status_code == 200
    assert len(data) == 24
    assert data.count(data[0]) == 24 # check if there is only one value

def test_billing_endpoint_bihour_tariff():
    """
    Given a user
    When he requests the billing for a bi-hour tariff
    Then there should be two different hourly prices 
    """
    response = client.get("/api/v1/billing?supplier=EDP&tariff=B")
    data = response.json()
    data = data["data"]

    assert response.status_code == 200
    assert len(data) == 24
    # check if there is only two different values
    assert len(set(data)) == 2

def test_billing_endpoint_trihour_tariff():
    """
    Given a user
    When he requests the billing for a tri-hour tariff
    Then there should be three different hourly prices 
    """
    response = client.get("/api/v1/billing?supplier=EDP&tariff=T")
    data = response.json()
    data = data["data"]

    assert response.status_code == 200
    assert len(data) == 24
    # check if there is only three different values
    assert len(set(data)) == 3


def test_suppliers_endpoint():
    """
    Given a user
    When he requests the available energy suppliers
    The the API should return a list with all the suppliers available
    """
    response = client.get("/api/v1/suppliers")
    data = response.json()
    data = data["data"]

    # check if request was sucessefull and suppliers were sent
    assert response.status_code == 200
    assert len(data) > 0

def test_tariffs_valid_supplier():
    """
    Given a user
    When he requests the tariffs types for  a valid supplier
    The the API should return all available tariff types for the given supplier
    """
    response = client.get("/api/v1/tariffs/GALP")
    data = response.json()
    data = data["data"]

    assert response.status_code == 200
    assert len(data) == 3


def test_temperatures_invalid_supplier():
    """
    Given a user
    When he requests the tariffs types for  a invalid supplier
    The the API should respond with a 404 status code
    """
    response = client.get("/api/v1/tariffs/INVALID")
    assert response.status_code == 404

