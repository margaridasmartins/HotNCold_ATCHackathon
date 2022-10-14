import {BASE_BILL_API_URL} from "../Config"

class BillingService {
    get_suppliers() {
        return fetch(`${BASE_BILL_API_URL}suppliers`, {
            method: 'GET',
            mode: 'cors',
        })
    }

    get_tariffs(supplier) {
        return fetch(`${BASE_BILL_API_URL}tariffs/${supplier}`, {
            method: 'GET',
            mode: 'cors',
        })
    }
}

export default new BillingService();