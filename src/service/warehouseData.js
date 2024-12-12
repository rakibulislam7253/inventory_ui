import axios from 'axios';
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const Branch_URL = 'http://10.140.6.22/cPoint/api/Branch/get-branch_list';
class warehouseService {
    get_all_warehouse_info() {
        return axios.get(BASE_URL + '/api/Warehouse/get_all_warehouse_info');
    }
    branch_list() {
        return axios.get(Branch_URL + 'branch_list');
    }
    create_update_warehouse_info(warehouseData) {
        console.log(warehouseData);
        return axios.post(BASE_URL + '/api/Warehouse/create_update_warehouse_info', warehouseData);
    }
}

export default new warehouseService();
