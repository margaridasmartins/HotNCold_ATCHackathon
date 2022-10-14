import {BASE_TEMP_API_URL} from "config"

class TemperatureService {
    get_locations() {
        return fetch(`${BASE_TEMP_API_URL}locations`, {
            method: 'GET',
            mode: 'cors',
        })
    }
}

export default new TemperatureService();