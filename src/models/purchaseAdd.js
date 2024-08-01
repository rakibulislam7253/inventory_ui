export default class productCategory {
    constructor() {
        this.queue_id = '';
        this.order_id = '';
        this.requisition_id = '';
        this.supplier_id = '';
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
        this.order_date = '';
        this.total_amount = 0;
        this.status_id = '';
        this.delivery_date = '';
        this.receive_date = '';
        this.remarks = '';
    }

    loadModel(productCategory) {
        this.queue_id = productCategory.queue_id;
        this.order_id = productCategory.order_id;
        this.requisition_id = productCategory.requisition_id;
        this.supplier_id = productCategory.supplier_id;
        this.last_action = productCategory.last_action;
        this.auth_status_id = productCategory.auth_status_id;
        this.auth_1st_by = productCategory.auth_1st_by;
        this.auth_1st_dt = productCategory.auth_1st_dt;
        this.make_by = productCategory.make_by;
        this.make_dt = productCategory.make_dt;
        this.auth_2nd_by = productCategory.auth_2nd_by;
        this.auth_2nd_dt = productCategory.auth_2nd_dt;
        this.table_name = productCategory.table_name;
        this.primary_table_column = productCategory.primary_table_column;
        this.order_date = productCategory.order_date;
        this.total_amount = productCategory.total_amount;
        this.status_id = productCategory.status_id;
        this.delivery_date = productCategory.delivery_date;
        this.receive_date = productCategory.receive_date;
        this.remarks = productCategory.remarks;
    }
}
