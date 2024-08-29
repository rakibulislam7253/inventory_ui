export default class productRequsitionDetails {
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

    loadModel(productRequsitionDetails) {
        this.last_action = productRequsitionDetails.last_action;
        this.auth_status_id = productRequsitionDetails.auth_status_id;
        this.auth_1st_by = productRequsitionDetails.auth_1st_by;
        this.auth_1st_dt = productRequsitionDetails.auth_1st_dt;
        this.make_by = productRequsitionDetails.make_by;
        this.make_dt = productRequsitionDetails.make_dt;
        this.auth_2nd_by = productRequsitionDetails.auth_2nd_by;
        this.auth_2nd_dt = productRequsitionDetails.auth_2nd_dt;
        this.table_name = productRequsitionDetails.table_name;
        this.primary_table_column = productRequsitionDetails.primary_table_column;
        this.queue_id = productRequsitionDetails.queue_id;
        this.requisition_id = productRequsitionDetails.requisition_id;
        this.product_id = productRequsitionDetails.product_id;
        this.product_category_id = productRequsitionDetails.product_category_id;
        this.requisition_quantity = productRequsitionDetails.requisition_quantity;
        this.unit_price = productRequsitionDetails.unit_price;
        this.receive_status = productRequsitionDetails.receive_status;
        this.total_prod_price = productRequsitionDetails.total_prod_price;
    }
}
