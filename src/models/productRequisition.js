// import inv_requisition from '../models/inv_requisition_details';
export default class productRequsition {
    constructor() {
        {
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
            this.requisition_date = '';
            this.priority = '';
            this.total_amount = 100;
            this.total_receive_amount = 0;
            this.total_return_amount = 0;
            this.status_id = '1';
            this.tntv_dlvry_date = '';
            this.delivery_date = '';
            this.receive_date = '';
            this.remarks = '';
            this.warehouse_id = '';
            this.receive_status = '';
            this.inv_requisition_details = [];
            this.inv_requisition_issue = [];
            this.inv_requisition_receive = [];
            this.inv_product_adjustment = [];
        }
    }

    loadModel(productRequsition) {
        this.last_action = productRequsition.last_action;
        this.auth_status_id = productRequsition.auth_status_id;
        this.auth_1st_by = productRequsition.auth_1st_by;
        this.auth_1st_dt = productRequsition.auth_1st_dt;
        this.make_by = productRequsition.make_by;
        this.make_dt = productRequsition.make_dt;
        this.auth_2nd_by = productRequsition.auth_2nd_by;
        this.auth_2nd_dt = productRequsition.auth_2nd_dt;
        this.table_name = productRequsition.table_name;
        this.primary_table_column = productRequsition.primary_table_column;
        this.queue_id = productRequsition.queue_id;
        this.requisition_id = productRequsition.requisition_id;
        this.requisition_date = productRequsition.requisition_date;
        this.priority = productRequsition.priority;
        this.total_amount = productRequsition.total_amount;
        this.total_receive_amount = productRequsition.total_receive_amount;
        this.total_return_amount = productRequsition.total_return_amount;
        this.status_id = productRequsition.status_id;
        this.tntv_dlvry_date = productRequsition.tntv_dlvry_date;
        this.delivery_date = productRequsition.delivery_date;
        this.receive_date = productRequsition.receive_date;
        this.remarks = productRequsition.remarks;
        this.warehouse_id = productRequsition.warehouse_id;
        this.receive_status = productRequsition.receive_status;
        this.inv_requisition_details = productRequsition.inv_requisition_details;
        this.inv_requisition_issue = productRequsition.inv_requisition_issue;
        this.inv_requisition_receive = productRequsition.inv_requisition_receive;
        this.inv_product_adjustment = productRequsition.inv_product_adjustment;
    }
}
