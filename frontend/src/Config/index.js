export let BASE_API_URL = null;
export let BASE_TEMP_API_URL = null;
export let BASE_BILL_API_URL = null;

if (process.env.REACT_APP_ENV === "production") {
    BASE_API_URL = "46.101.92.174/api/v1/";
    BASE_BILL_API_URL = "46.101.92.174/api/v2/";
    BASE_TEMP_API_URL = "46.101.92.174/api/v3/";
}
else {
    BASE_API_URL = "http://localhost:8000/api/v1/";
    BASE_TEMP_API_URL = "http://localhost:8002/api/v3/";
    BASE_BILL_API_URL = "http://localhost:8001/api/v2/";
}