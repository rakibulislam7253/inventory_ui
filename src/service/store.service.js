import axios from 'axios';
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
class storeHouse {
    get_store_product_information() {
        //http://cbptest.citizensbankbd.com/inventory_service/api/Store/get_store_product_information
        return axios.get(BASE_URL + '/api/Store/get_store_product_information');
    }
}

export default new storeHouse();
