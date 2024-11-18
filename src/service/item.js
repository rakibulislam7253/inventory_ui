import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const unit_URL = import.meta.env.VITE_APP_API_BASE_URL;
const item_URL = import.meta.env.VITE_APP_API_BASE_URL;
const warehouse_URL = import.meta.env.VITE_APP_API_BASE_URL;

class itemService {
    get_all_product_details() {
        return axios.get(BASE_URL + '/api/Product/get_all_product_details');
    }
    // get_product_details_by_id(product_id) {
    //     return axios.get(BASE_URL + 'get_product_details_by_id?product_id='+ product_id);
    // }
    create_update_product_details(itemData) {
        return axios.post(BASE_URL + '/api/Product/create_update_product_details', itemData);
    }
    get_all_unit_of_measurements() {
        return axios.get(unit_URL + '/api/UnitOfMeasurement/get_all_unit_of_measurements');
    }
    get_all_product_category() {
        return axios.get(item_URL + '/api/ProductCategory/get_all_product_category');
    }
    get_all_warehouse_info() {
        return axios.get(warehouse_URL + '/api/Warehouse/get_all_warehouse_info');
    }

    getProductName(name) {
        console.log(name);
        axios.get(BASE_URL + '/api/Product/get_product_details_by_id?product_id=' + name).then((res) => {
            let result = res.data[0].product_name;
            console.log(result);
            return result;
        });
    }
}

export default new itemService();
