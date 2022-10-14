import {BASE_BILL_API_URL} from "../Config"

class BillingService {
    get_suppliers() {
        return fetch(`http://46.101.92.174/api/v2/suppliers`, {
            method: 'GET',
            mode: 'cors',
        })
    }

    get_tariffs(supplier) {
        return fetch(`http://46.101.92.174/api/v2/billing/${supplier}`, {
            method: 'GET',
            mode: 'cors',
        })
    }
}

export default new BillingService();