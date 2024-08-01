export default class purchaseReceive {
    constructor() {
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
        this.receive_id = '';
        this.order_id = '';
        this.product_id = '';
        this.product_name = '';
        this.order_quantity = 0;
        this.receive_unit_price = 0;
        this.receive_quantity = 0;
        this.receive_amount = 0;
        this.return_quantity = 0;
        this.return_amount = 0;
        this.remarks = '';
        this.receive_status = '';
    }

    loadModel(purchaseReceive) {
        this.last_action = purchaseReceive.last_action;
        this.auth_status_id = purchaseReceive.auth_status_id;
        this.auth_1st_by = purchaseReceive.auth_1st_by;
        this.auth_1st_dt = purchaseReceive.auth_1st_dt;
        this.make_by = purchaseReceive.make_by;
        this.make_dt = purchaseReceive.make_dt;
        this.auth_2nd_by = purchaseReceive.auth_2nd_by;
        this.auth_2nd_dt = purchaseReceive.auth_2nd_dt;
        this.table_name = purchaseReceive.table_name;
        this.primary_table_column = purchaseReceive.primary_table_column;
        this.queue_id = purchaseReceive.queue_id;
        this.receive_id = purchaseReceive.receive_id;
        this.order_id = purchaseReceive.order_id;
        this.product_id = purchaseReceive.product_id;
        this.receive_unit_price = purchaseReceive.receive_unit_price;
        this.order_quantity = purchaseReceive.order_quantity;
        this.receive_quantity = purchaseReceive.receive_quantity;
        this.return_quantity = purchaseReceive.return_quantity;
        this.receive_amount = purchaseReceive.receive_amount;
        this.return_amount = purchaseReceive.return_amount;
        this.remarks = purchaseReceive.remarks;
        this.receive_status = purchaseReceive.receive_status;
    }
}
