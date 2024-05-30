import axios from 'axios';
// http://10.140.6.22/inventory_api/api/Product/get_all_product_details
const BASE_URL = 'http://10.140.6.22/inventory_api/api/Product/';
class itemService {
    get_all_product_details() {
        return axios.get(BASE_URL + 'get_all_product_details');
    }
    create_update_unit_of_measurement(unitData) {
        console.log(unitData);
        return axios.post(BASE_URL + 'create_update_unit_of_measurement', unitData);
    }
}

export default new itemService();
