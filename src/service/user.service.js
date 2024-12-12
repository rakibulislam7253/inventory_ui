import axios from 'axios';
// http://czbapp.citizensbankbd.com/control_center_service/api/Login/get_user_token
const BASE_URL = import.meta.env.VITE_APP_CONTROL_CENTER_API;
// VITE_APP_CONTROL_CENTER_API
const API_URL = BASE_URL + 'api';

class UserService {
    getCurrentUserData() {
        return axios.get(API_URL + '/Login/refresh-user-token', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        });
    }

    getUserById(userId) {
        return axios.get(API_URL + '/' + userId);
    }

    updateUserActiveStatus(userId, publishStatus) {
        return axios.post(API_URL + '/' + userId + '/change-status/' + publishStatus, null);
    }

    updateCurrentUser(userData) {
        return axios.post(API_URL + '/update/current-user', userData);
    }
    logout() {
        return axios.post(API_URL + '/Login/logout');
    }
    updateUser(user) {
        return axios.post(API_URL + '/update', user);
    }
    userToken() {
        console.log('API_URL');
        console.log(API_URL);
        return axios.get(API_URL + '/Login/get_user_token');
    }
    refreshAdminUserAccessToken() {
        return axios.get(API_URL + '/Login/refresh-user-token', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        });
    }
}

export default new UserService();
