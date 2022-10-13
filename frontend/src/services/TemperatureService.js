

class TemperatureService {
    get_locations() {
        return fetch(`http://localhost:8002/api/v1/locations`, {
            method: 'GET',
            mode: 'cors',
        })
    }
}

export default new TemperatureService();