class ApiService {
    get_data(location, start, end, supplier, tariff) {
        return fetch(`http://localhost:8000/api/v1/optimize/?city=${location}&start=${start}&end=${end}&supplier=${supplier}&tariff=${tariff}`, {
            method: 'GET',
            mode: 'cors',
        })
    }

    get_last_24h(location, supplier, tariff) {
        let curr_date = new Date();
        const end = convertDateToFormat(curr_date);
        curr_date.setDate(curr_date.getDate() - 1)
        const start = convertDateToFormat(curr_date);

        // TODO: hardcoded
        return this.get_data(location, "2021-12-01T00:00:00", "2021-12-02T00:00:00", supplier, tariff);
    }

    forecast(location, supplier, tariff) {
        let curr_date = new Date();
        const start = convertDateToFormat(curr_date);
        curr_date.setDate(curr_date.getDate() + 2);
        const end = convertDateToFormat(curr_date);
        return this.get_data(location, start, end, supplier, tariff);
    }

    deadhours(location, start, end, supplier, tariff, hours) {
        start = "2021-12-01T00:00:00"; end = "2021-12-02T00:00:00";
        return fetch(`http://localhost:8000/api/v1/deadhours/?city=${location}&start=${start}&end=${end}&supplier=${supplier}&tariff=${tariff}&hours=${hours.map((d,i) => {return d ? i : null}).filter((d) => d != null).join("&hours=")}`, {
            method: 'GET',
            mode: 'cors',
        })
    }

}

function convertDateToFormat(d) {
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}T${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}

export default new ApiService();