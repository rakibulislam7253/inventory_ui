export default class productRequsition_details {
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
        this.requisition_id = '';
        this.product_id = '';
        this.product_category_id = '';
        this.requisition_quantity = 0;
        this.unit_price = 0;
        this.receive_status = '';
        this.total_prod_price = 0;
    }

    loadModel(productRequsition_details) {
        this.last_action = productRequsition_details.last_action;
        this.auth_status_id = productRequsition_details.auth_status_id;
        this.auth_1st_by = productRequsition_details.auth_1st_by;
        this.auth_1st_dt = productRequsition_details.auth_1st_dt;
        this.make_by = productRequsition_details.make_by;
        this.make_dt = productRequsition_details.make_dt;
        this.auth_2nd_by = productRequsition_details.auth_2nd_by;
        this.auth_2nd_dt = productRequsition_details.auth_2nd_dt;
        this.table_name = productRequsition_details.table_name;
        this.primary_table_column = productRequsition_details.primary_table_column;
        this.queue_id = productRequsition_details.queue_id;
        this.requisition_id = productRequsition_details.requisition_id;
        this.product_id = productRequsition_details.product_id;
        this.product_category_id = productRequsition_details.product_category_id;
        this.requisition_quantity = productRequsition_details.requisition_quantity;
        this.unit_price = productRequsition_details.unit_price;
        this.receive_status = productRequsition_details.receive_status;
        this.total_prod_price = productRequsition_details.total_prod_price;
    }
}
