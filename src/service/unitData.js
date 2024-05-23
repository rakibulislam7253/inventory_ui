import axios from 'axios';

const BASE_URL = 'http://10.140.6.22/inventory_api/api/UnitOfMeasurement/';
class UnitService {
    get_all_unit_of_measurements() {
        return axios.get(BASE_URL + 'get_all_unit_of_measurements');
    }
}

export default new UnitService();
