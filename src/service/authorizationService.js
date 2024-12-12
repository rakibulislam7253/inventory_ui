import axios from 'axios';
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
// const BASE_URL = 'http://cbptest.citizensbankbd.com/inventory_service';

class authorization {
    get_unauthorized_menu_list(moduleId, uderId) {
        console.log(moduleId, uderId);
        return axios.get(BASE_URL + '/api/InventoryAuthorization/get_unauthorized_menu_list?_module_id=' + moduleId + '&_user_id=' + uderId);
    }
    get_unauthorized_data_list(moduleId, menu_id) {
        console.log(moduleId, menu_id);
        return axios.get(BASE_URL + '/api/InventoryAuthorization/get_unauthorized_data_list?_module_id=' + moduleId + '&_menu_id=' + menu_id);
    }
    get_unauthorized_data(queue_id) {
        console.log(queue_id);
        return axios.get(BASE_URL + '/api/InventoryAuthorization/get_unauthorized_data?_queue_id=' + queue_id);
    }

    authorization_decline_by_queue_id(authData) {
        console.log(authData);
        return axios.post(BASE_URL + '/api/InventoryAuthorization/authorization_decline_by_queue_id', authData);
    }
}
export default new authorization();
