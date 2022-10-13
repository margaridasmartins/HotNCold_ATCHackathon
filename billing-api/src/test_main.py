from fastapi.testclient import TestClient
import os
from .main import app

client = TestClient(app)

