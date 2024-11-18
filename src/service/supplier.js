import axios from 'axios';
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

class supplierService {
    get_all_suppliers_info() {
        return axios.get(BASE_URL + '/api/Suppliers/get_all_suppliers_info');
    }
    create_update_suppliers_info(supplidata) {
        console.log(supplidata);
        return axios.post(BASE_URL + '/api/Suppliers/create_update_suppliers_info', supplidata);
    }
}

export default new supplierService();
