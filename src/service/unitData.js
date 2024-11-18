import axios from 'axios';
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
class UnitService {
    get_all_unit_of_measurements() {
        return axios.get(BASE_URL + '/api/UnitOfMeasurement/get_all_unit_of_measurements');
    }
    create_update_unit_of_measurement(unitData) {
        console.log(unitData);
        return axios.post(BASE_URL + '/api/UnitOfMeasurement/create_update_unit_of_measurement', unitData);
    }
}

export default new UnitService();
