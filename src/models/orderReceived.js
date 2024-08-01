export default class orderReceived {
    constructor() {
        this.order_id = '';
        this.requisition_id = '';
        this.supplier_id = '';
        this.order_date = '';
        this.total_amount = 0;
        this.status_id = '';
        this.delivery_date = '';
        this.receive_date = '';
        this.remarks = '';
        this.purchase_order_details = [];
        this.purchase_receive_details = [];
        this.last_action = '';
        this.auth_status_id = '';
        this.auth_1st_by = '';
        this.auth_1st_dt = '';
        this.make_by = '';
        this.make_dt = '';
        this.auth_2nd_by = '';
        this.auth_2nd_dt = '';
        this.table_name = '';
        this.primary_table_column = '';
        this.queue_id = '';
    }

    loadModel(orderReceived) {
        this.order_id = orderReceived.order_id;
        this.requisition_id = orderReceived.requisition_id;
        this.supplier_id = orderReceived.supplier_id;
        this.order_date = orderReceived.order_date;
        this.total_amount = orderReceived.total_amount;
        this.status_id = orderReceived.status_id;
        this.delivery_date = orderReceived.delivery_date;
        this.receive_date = orderReceived.receive_date;
        this.remarks = orderReceived.remarks;
        this.purchase_order_details = orderReceived.purchase_order_details;
        this.purchase_receive_details = orderReceived.purchase_receive_details;
        this.last_action = orderReceived.last_action;
        this.auth_status_id = orderReceived.auth_status_id;
        this.auth_1st_by = orderReceived.auth_1st_by;
        this.auth_1st_dt = orderReceived.auth_1st_dt;
        this.make_by = orderReceived.make_by;
        this.make_dt = orderReceived.make_dt;
        this.auth_2nd_by = orderReceived.auth_2nd_by;
        this.auth_2nd_dt = orderReceived.auth_2nd_dt;
        this.table_name = orderReceived.table_name;
        this.primary_table_column = orderReceived.primary_table_column;
        this.queue_id = orderReceived.queue_id;
    }
}
