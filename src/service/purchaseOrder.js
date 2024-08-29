import axios from 'axios';
// http://10.140.6.22/inventory_api/api/UnitOfMeasurement/create_update_unit_of_measurement
// http://10.140.6.22/inventory_api/api/PurchaseOrder/create_purchase_order
// http://10.140.6.22/inventory_api/api/PurchaseOrder/get_purchase_orders_details?order_id=PO2024071800001
// http://10.140.6.22/inventory_api/api/PurchaseOrder/get_create_purchase_receive_details?order_id=PO2024073100002
const BASE_URL = 'http://10.140.6.22/inventory_api/api/PurchaseOrder/';
class purchaseDataService {
    create_purchase_order(purchaseData) {
        console.log(purchaseData);
        return axios.post(BASE_URL + 'create_purchase_order', purchaseData);
    }
    create_purchase_order_details(purchaseData) {
        console.log(purchaseData);
        return axios.post(BASE_URL + 'create_purchase_order_details', purchaseData);
    }

    get_purchase_orders_details(order_id) {
        console.log(order_id);
        return axios.get(BASE_URL + 'get_purchase_orders_details?order_id=' + order_id);
    }

    // get_order_details_by_id?order_id=PO2024073000005
    get_order_details_by_id(order_id) {
        console.log(order_id);
        return axios.get(BASE_URL + 'get_order_details_by_id?order_id=' + order_id);
    }
    create_purchase_receive_details(purchaseData) {
        console.log(purchaseData);
        return axios.post(BASE_URL + 'create_purchase_receive_details', purchaseData);
    }
    // // http://10.140.6.22/inventory_api/api/PurchaseOrder/get_purchase_orders?order_id=PO2024081900002
    get_purchase_orders(purchaseData) {
        console.log(purchaseData);
        return axios.get(BASE_URL + 'get_purchase_orders?order_id=' + purchaseData);
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
