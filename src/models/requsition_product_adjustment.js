export default class ProductAdjustment {
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
        this.adjustment_id = '';
        this.requisition_id = '';
        this.product_id = '';
        this.requisition_quantity = 0;
        this.issue_quantity = 0;
        this.receive_quantity = 0;
        this.return_quantity = 0;
        this.receive_amount = 0;
        this.return_amount = 0;
        this.issue_amount = 0;
        this.remarks = '';
        this.status = '';
    }
    loadModel(ProductAdjustment) {
        this.last_action = ProductAdjustment.last_action;
        this.auth_status_id = ProductAdjustment.auth_status_id;
        this.auth_1st_by = ProductAdjustment.auth_1st_by;
        this.auth_1st_dt = ProductAdjustment.auth_1st_dt;
        this.make_by = ProductAdjustment.make_by;
        this.make_dt = ProductAdjustment.make_dt;
        this.auth_2nd_by = ProductAdjustment.auth_2nd_by;
        this.auth_2nd_dt = ProductAdjustment.auth_2nd_dt;
        this.table_name = ProductAdjustment.table_name;
        this.primary_table_column = ProductAdjustment.primary_table_column;
        this.queue_id = ProductAdjustment.queue_id;
        this.adjustment_id = ProductAdjustment.adjustment_id;
        this.requisition_id = ProductAdjustment.requisition_id;
        this.product_id = ProductAdjustment.product_id;
        this.requisition_quantity = ProductAdjustment.requisition_quantity;
        this.issue_quantity = ProductAdjustment.issue_quantity;
        this.receive_quantity = ProductAdjustment.receive_quantity;
        this.return_quantity = ProductAdjustment.return_quantity;
        this.receive_amount = ProductAdjustment.receive_amount;
        this.return_amount = ProductAdjustment.return_amount;
        this.issue_amount = ProductAdjustment.issue_amount;
        this.remarks = ProductAdjustment.remarks;
        this.status = ProductAdjustment.status;
    }
}
