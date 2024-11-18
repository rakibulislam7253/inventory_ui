export default class purchaseOrderDetails {
    constructor() {
        this.queue_id = '';
        this.order_id = '';
        this.product_id = '';
        this.product_category_id = '';
        this.unit_price = 0;
        this.order_quantity = 0;
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
        this.requisition_quantity = 0;
        this.total_amount = 0;
        this.remarks = '';
        this.recieve_status = '';
    }

    loadModel(purchaseOrderDetails) {
        this.queue_id = purchaseOrderDetails.queue_id;
        this.order_id = purchaseOrderDetails.order_id;
        this.product_id = purchaseOrderDetails.product_id;
        this.product_category_id = purchaseOrderDetails.product_category_id;
        this.unit_price = purchaseOrderDetails.unit_price;
        this.order_quantity = purchaseOrderDetails.order_quantity;
        this.last_action = purchaseOrderDetails.last_action;
        this.auth_status_id = purchaseOrderDetails.auth_status_id;
        this.auth_1st_by = purchaseOrderDetails.auth_1st_by;
        this.auth_1st_dt = purchaseOrderDetails.auth_1st_dt;
        this.make_by = purchaseOrderDetails.make_by;
        this.make_dt = purchaseOrderDetails.make_dt;
        this.auth_2nd_by = purchaseOrderDetails.auth_2nd_by;
        this.auth_2nd_dt = purchaseOrderDetails.auth_2nd_dt;
        this.table_name = purchaseOrderDetails.table_name;
        this.primary_table_column = purchaseOrderDetails.primary_table_column;
        this.requisition_quantity = purchaseOrderDetails.requisition_quantity;
        this.total_amount = purchaseOrderDetails.total_amount;
        this.remarks = purchaseOrderDetails.remarks;
        this.recieve_status = purchaseOrderDetails.recieve_status;
    }
}
