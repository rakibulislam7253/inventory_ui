import axios from 'axios';
const BASE_URL = 'http://10.140.6.22/inventory_api/api/Suppliers/';

class supplierService {
    get_all_suppliers_info() {
        return axios.get(BASE_URL + 'get_all_suppliers_info');
    }
    create_update_suppliers_info(supplidata) {
        console.log(supplidata);
        return axios.post(BASE_URL + 'create_update_suppliers_info', supplidata);
    }
}

export default new supplierService();
