

class BillingService {
    get_suppliers() {
        return fetch(`http://localhost:8001/api/v1/suppliers`, {
            method: 'GET',
            mode: 'cors',
        })
    }

    get_tariffs(supplier) {
        return fetch(`http://localhost:8001/api/v1/tariffs/${supplier}`, {
            method: 'GET',
            mode: 'cors',
        })
    }
}

export default new BillingService();