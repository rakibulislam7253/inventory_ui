import axios from 'axios';
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
class purchaseDataService {
    create_purchase_order(purchaseData) {
        return axios.post(BASE_URL + '/api/PurchaseOrder/create_purchase_order', purchaseData);
    }
    create_purchase_order_details(purchaseData) {
        return axios.post(BASE_URL + '/api/PurchaseOrder/create_purchase_order_details', purchaseData);
    }
    get_purchase_orders_details(order_id) {
        return axios.get(BASE_URL + '/api/PurchaseOrder/get_purchase_orders_details?order_id=' + order_id);
    }
    get_order_details_by_id(order_id) {
        return axios.get(BASE_URL + '/api/PurchaseOrder/get_order_details_by_id?order_id=' + order_id);
    }
    create_purchase_receive_details(purchaseData) {
        return axios.post(BASE_URL + '/api/PurchaseOrder/create_purchase_receive_details', purchaseData);
    }
    get_purchase_orders(purchaseData) {
        return axios.get(BASE_URL + '/api/PurchaseOrder/get_purchase_orders?order_id=' + purchaseData);
    }
    // get_create_purchase_receive_details(order_id) {
    //     console.log(order_id);
    //     return axios.post(BASE_URL + 'get_create_purchase_receive_details', order_id);
    // }
    // create_requisition_details(purchaseData) {
    //     console.log(purchaseData);
    //     return axios.post('http://10.140.6.22/inventory_api/api/Requisition/create_requisition_details', purchaseData);
    // }
}

export default new purchaseDataService();
