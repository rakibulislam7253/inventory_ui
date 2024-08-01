import axios from 'axios';
// http://10.140.6.22/inventory_api/api/ProductCategory/get_all_product_category
// http://10.140.6.22/inventory_api/api/ProductCategory/create_update_warehouse_info
// http://10.140.6.22/inventory_api/api/ProductCategory/get_product_category_by_id?category_id=PCAT00001
const BASE_URL = 'http://10.140.6.22/inventory_api/api/ProductCategory/';
class productCategoryService {
    get_all_product_category() {
        return axios.get(BASE_URL + 'get_all_product_category');
    }
    create_update_product_category(categoryData) {
        console.log(categoryData);
        return axios.post(BASE_URL + 'create_update_product_category', categoryData);
    }
    get_product_category_by_id(category_id) {
        console.log(category_id);
        return axios.get(BASE_URL + 'get_product_category_by_id?category_id=' + category_id);
    }
}

export default new productCategoryService();
