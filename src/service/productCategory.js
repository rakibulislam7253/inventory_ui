import axios from 'axios';
// http://10.140.6.22/inventory_api/api/ProductCategory/get_all_product_category
// http://10.140.6.22/inventory_api/api/ProductCategory/create_update_warehouse_info
const BASE_URL = 'http://10.140.6.22/inventory_api/api/ProductCategory/';
class productCategoryService {
    get_all_product_category() {
        return axios.get(BASE_URL + 'get_all_product_category');
    }
    create_update_product_category(categoryData) {
        console.log(categoryData);
        return axios.post(BASE_URL + 'create_update_product_category', categoryData);
    }
}

export default new productCategoryService();
