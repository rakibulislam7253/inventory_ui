import axios from 'axios';
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
class requisitionDataService {
    create_product_requisition(purchaseData) {
        console.log(purchaseData);
        return axios.post(BASE_URL + '/api/Requisition/create_product_requisition', purchaseData);
    }
    create_requisition_details(purchaseData) {
        console.log(purchaseData);
        return axios.post(BASE_URL + '/api/Requisition/create_requisition_details', purchaseData);
    }
    create_requisition_issue(purchaseData) {
        console.log(purchaseData);
        return axios.post(BASE_URL + '/api/Requisition/create_requisition_issue', purchaseData);
    }
    create_requisition_receive(purchaseData) {
        console.log(purchaseData);
        return axios.post(BASE_URL + '/api/Requisition/create_requisition_receive', purchaseData);
    }
    create_requisition_product_adjustment(purchaseData) {
        console.log(purchaseData);
        return axios.post(BASE_URL + '/api/Requisition/create_requisition_product_adjustment', purchaseData);
    }
    get_requisition_details(purchaseData) {
        console.log(purchaseData);
        return axios.get(BASE_URL + '/api/Requisition/get_requisition_details?requisition_id=' + purchaseData);
    }
    get_requisition_issue(purchaseData) {
        console.log(purchaseData);
        return axios.get(BASE_URL + '/api/Requisition/get_requisition_issue?requisition_id=' + purchaseData);
    }
    get_requisition_receive(purchaseData) {
        console.log(purchaseData);
        return axios.get(BASE_URL + '/api/Requisition/get_requisition_receive?requisition_id=' + purchaseData);
    }
    get_product_requisition(purchaseData) {
        console.log(purchaseData);
        return axios.get(BASE_URL + '/api/Requisition/get_product_requisition?requisition_id=' + purchaseData);
    }
}

export default new requisitionDataService();
