export default class productCategory {
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

    loadModel(productCategory) {
        this.queue_id = productCategory.queue_id;
        this.order_id = productCategory.order_id;
        this.product_id = productCategory.product_id;
        this.product_category_id = productCategory.product_category_id;
        this.unit_price = productCategory.unit_price;
        this.order_quantity = productCategory.order_quantity;
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
        this.requisition_quantity = productCategory.requisition_quantity;
        this.total_amount = productCategory.total_amount;
        this.remarks = productCategory.remarks;
        this.recieve_status = productCategory.recieve_status;
    }
}
