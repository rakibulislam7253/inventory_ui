import axios from 'axios';
// http://10.140.6.22/inventory_api/api/Requisition/get_product_requisition?requisition_id=PR2024081900013
const BASE_URL = 'http://10.140.6.22/inventory_api/api/Requisition/';
class requisitionDataService {
    create_product_requisition(purchaseData) {
        console.log(purchaseData);
        return axios.post(BASE_URL + 'create_product_requisition', purchaseData);
    }
    create_requisition_details(purchaseData) {
        console.log(purchaseData);
        return axios.post(BASE_URL + 'create_requisition_details', purchaseData);
    }
    create_requisition_issue(purchaseData) {
        console.log(purchaseData);
        return axios.post(BASE_URL + 'create_requisition_issue', purchaseData);
    }
    create_requisition_receive(purchaseData) {
        console.log(purchaseData);
        return axios.post(BASE_URL + 'create_requisition_receive', purchaseData);
    }
    create_requisition_product_adjustment(purchaseData) {
        console.log(purchaseData);
        return axios.post(BASE_URL + 'create_requisition_product_adjustment', purchaseData);
    }
    get_requisition_details(purchaseData) {
        console.log(purchaseData);
        return axios.get(BASE_URL + 'get_requisition_details?requisition_id=' + purchaseData);
        // return axios.post(BASE_URL + 'get_requisition_details?requisition_id=PR2024081100010', purchaseData);
    }
    get_requisition_issue(purchaseData) {
        console.log(purchaseData);
        return axios.get(BASE_URL + 'get_requisition_issue?requisition_id=' + purchaseData);
    }
    get_requisition_receive(purchaseData) {
        console.log(purchaseData);
        return axios.get(BASE_URL + 'get_requisition_receive?requisition_id=' + purchaseData);
    }
    get_product_requisition(purchaseData) {
        console.log(purchaseData);
        return axios.get(BASE_URL + 'get_product_requisition?requisition_id=' + purchaseData);
    }
}

export default new requisitionDataService();
