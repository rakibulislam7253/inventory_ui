import axios from 'axios';
const BASE_URL = import.meta.env.VITE_APP_CONTROL_CENTER_API;
class userMenu {
    get_user_menu(userName, moduleId) {
        console.log(userName, moduleId);
        return axios.get(BASE_URL + 'api/Menu/get_user_menu?userName=' + userName + '&' + 'moduleId=' + moduleId);
    }
}

export default new userMenu();
