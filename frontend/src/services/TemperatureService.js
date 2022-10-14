

class TemperatureService {
    get_locations() {
        return fetch(`http://46.101.92.174/api/v3/locations`, {
            method: 'GET',
            mode: 'cors',
        })
    }
}

export default new TemperatureService();