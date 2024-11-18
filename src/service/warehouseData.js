import axios from 'axios';
// http://10.140.6.22/inventory_api/api/Warehouse/get_all_warehouse_info
// http://10.140.6.22/inventory_api/api/Warehouse/create_update_warehouse_info
const BASE_URL = 'http://10.140.6.22/inventory_api/api/Warehouse/';
const Branch_URL = 'http://10.140.6.22/cPoint/api/Branch/get-branch_list';
class warehouseService {
    get_all_warehouse_info() {
        return axios.get(BASE_URL + 'get_all_warehouse_info');
    }
    branch_list() {
        return axios.get(Branch_URL + 'branch_list');
    }
    create_update_warehouse_info(warehouseData) {
        console.log(warehouseData);
        return axios.post(BASE_URL + 'create_update_warehouse_info', warehouseData);
    }
}

export default new warehouseService();
