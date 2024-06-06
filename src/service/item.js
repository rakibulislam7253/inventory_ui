import axios from 'axios';
// http://10.140.6.22/inventory_api/api/Product/get_all_product_details
// http://10.140.6.22/inventory_api/api/Product/create_update_product_details
const BASE_URL = 'http://10.140.6.22/inventory_api/api/Product/';
const unit_URL = 'http://10.140.6.22/inventory_api/api/UnitOfMeasurement/';
const item_URL = 'http://10.140.6.22/inventory_api/api/ProductCategory/';
const warehouse_URL = 'http://10.140.6.22/inventory_api/api/Warehouse/';
class itemService {
    get_all_product_details() {
        return axios.get(BASE_URL + 'get_all_product_details');
    }
    create_update_product_details(itemData) {
        console.log(itemData);
        return axios.post(BASE_URL + 'create_update_product_details', itemData);
    }
    get_all_unit_of_measurements() {
        return axios.get(unit_URL + 'get_all_unit_of_measurements');
    }
    get_all_product_category() {
        return axios.get(item_URL + 'get_all_product_category');
    }
    get_all_warehouse_info() {
        return axios.get(warehouse_URL + 'get_all_warehouse_info');
    }
}

export default new itemService();
