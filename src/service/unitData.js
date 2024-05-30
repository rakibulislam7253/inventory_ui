import axios from 'axios';
// http://10.140.6.22/inventory_api/api/UnitOfMeasurement/create_update_unit_of_measurement
const BASE_URL = 'http://10.140.6.22/inventory_api/api/UnitOfMeasurement/';
class UnitService {
    get_all_unit_of_measurements() {
        return axios.get(BASE_URL + 'get_all_unit_of_measurements');
    }
    create_update_unit_of_measurement(unitData) {
        console.log(unitData);
        return axios.post(BASE_URL + 'create_update_unit_of_measurement', unitData);
    }
}

export default new UnitService();
