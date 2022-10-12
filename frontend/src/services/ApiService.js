class ApiService {
    get_data(start, end, supplier, tariff) {
        return fetch('http://localhost:8000/api/v1/optimize/?start='
            + start +'&end=' + end + '&supplier=' + supplier + '&tariff=' + tariff, {
            method: 'GET',
            mode: 'cors',
        })
    }

    get_last_24h(supplier, tariff) {
        let curr_date = new Date();
        const end = convertDateToFormat(curr_date);
        const start = convertDateToFormat(curr_date.setDate(curr_date.getDate() - 1));
        return get_data(start, end, supplier, tariff);
    }
}

function convertDateToFormat(d) {
    return `${d.getYear()}-${d.getMonth()}-${d.getDay()}T${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}