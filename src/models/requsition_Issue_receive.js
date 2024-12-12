export default class RequsitionIssueReceived {
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
        this.requisition_id = '';
        this.product_id = '';
        this.order_quantity = 0;
        this.requisition_quantity = 0;
        this.issue_quantity = 0;
        this.receive_quantity = 0;
        this.return_quantity = 0;
        this.receive_amount = 0;
        this.return_amount = 0;
        this.remarks = '';
        this.receive_status = '';
    }
    loadModel(RequsitionIssueReceived) {
        this.last_action = RequsitionIssueReceived.last_action;
        this.auth_status_id = RequsitionIssueReceived.auth_status_id;
        this.auth_1st_by = RequsitionIssueReceived.auth_1st_by;
        this.auth_1st_dt = RequsitionIssueReceived.auth_1st_dt;
        this.make_by = RequsitionIssueReceived.make_by;
        this.make_dt = RequsitionIssueReceived.make_dt;
        this.auth_2nd_by = RequsitionIssueReceived.auth_2nd_by;
        this.auth_2nd_dt = RequsitionIssueReceived.auth_2nd_dt;
        this.table_name = RequsitionIssueReceived.table_name;
        this.primary_table_column = RequsitionIssueReceived.primary_table_column;
        this.queue_id = RequsitionIssueReceived.queue_id;
        this.receive_id = RequsitionIssueReceived.receive_id;
        this.requisition_id = RequsitionIssueReceived.requisition_id;
        this.product_id = RequsitionIssueReceived.product_id;
        this.order_quantity = RequsitionIssueReceived.order_quantity;
        this.requisition_quantity = RequsitionIssueReceived.requisition_quantity;
        this.issue_quantity = RequsitionIssueReceived.issue_quantity;
        this.receive_quantity = RequsitionIssueReceived.receive_quantity;
        this.return_quantity = RequsitionIssueReceived.receive_quantity;
        this.receive_amount = RequsitionIssueReceived.receive_amount;
        this.return_amount = RequsitionIssueReceived.return_amount;
        this.remarks = RequsitionIssueReceived.remarks;
        this.receive_status = RequsitionIssueReceived.receive_status;
    }
}
