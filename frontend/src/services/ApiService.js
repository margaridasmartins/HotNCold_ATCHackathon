import {BASE_API_URL} from "../Config"

class ApiService {
    constructor() {
        this.get_data = this.get_data.bind(this);
        this.get_last_24h = this.get_last_24h.bind(this);
        this.get_last_week = this.get_last_week.bind(this);
        this.get_last_month = this.get_last_month.bind(this);
    }

    get_data(location, start, end, supplier, tariff) {
        return fetch(`${BASE_API_URL}optimize/?city=${location}&start=${start}&end=${end}&supplier=${supplier}&tariff=${tariff}`, {
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
        return this.get_data(location, "2021-12-30T00:00:00", "2021-12-31T00:00:00", supplier, tariff);
    }

    get_last_week(location, supplier, tariff) {
        let curr_date = new Date();
        const end = convertDateToFormat(curr_date);
        curr_date.setDate(curr_date.getDate() - 7);
        const start = convertDateToFormat(curr_date);

        // TODO: hardcoded
        return this.get_data(location, "2021-12-23T00:00:00", "2021-12-31T00:00:00", supplier, tariff);
    }

    get_last_month(location, supplier, tariff) {
        let curr_date = new Date();
        const end = convertDateToFormat(curr_date);
        curr_date.setMonth(curr_date.getMonth() - 1);
        const start = convertDateToFormat(curr_date);

        // TODO: hardcoded
        return this.get_data(location, "2021-12-01T00:00:00", "2021-12-31T00:00:00", supplier, tariff);
    }

    forecast(location, supplier, tariff, hours) {
        let curr_date = new Date();
        const start = convertDateToFormat(curr_date);
        curr_date.setDate(curr_date.getDate() + 2);
        const end = convertDateToFormat(curr_date);
        return this.deadhours(location, start, end, supplier, tariff, hours);
    }

    deadhours(location, start, end, supplier, tariff, hours) {
        if (hours?.length > 0) {
            let temp = hours.map((d, i) => { return d ? i : null }).filter((d) => d != null);
            if(temp.length > 0) {
                start = "2021-12-01T00:00:00"; end = "2021-12-02T00:00:00";
                return fetch(`http://localhost:8000/api/v1/deadhours/?city=${location}&start=${start}&end=${end}&supplier=${supplier}&tariff=${tariff}&hours=${temp.join("&hours=")}`, {
                    method: 'GET',
                    mode: 'cors',
                })
            } 
        }
        return this.get_data(location, start, end, supplier, tariff);

    }

}

function convertDateToFormat(d) {
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}T${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}

export default new ApiService();