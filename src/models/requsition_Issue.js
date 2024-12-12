export default class RequsitionIssue {
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
        this.issue_id = '';
        this.requisition_id = '';
        this.product_id = '';
        this.product_category_id = '';
        this.requisition_quantity = 0;
        this.issue_quantity = 0;
        this.issue_amount = 0;
    }
    loadModel(RequsitionIssue) {
        this.last_action = RequsitionIssue.last_action;
        this.auth_status_id = RequsitionIssue.auth_status_id;
        this.auth_1st_by = RequsitionIssue.auth_1st_by;
        this.auth_1st_dt = RequsitionIssue.auth_1st_dt;
        this.make_by = RequsitionIssue.make_by;
        this.make_dt = RequsitionIssue.make_dt;
        this.auth_2nd_by = RequsitionIssue.auth_2nd_by;
        this.auth_2nd_dt = RequsitionIssue.auth_2nd_dt;
        this.table_name = RequsitionIssue.table_name;
        this.primary_table_column = RequsitionIssue.primary_table_column;
        this.queue_id = RequsitionIssue.queue_id;
        this.issue_id = RequsitionIssue.issue_id;
        this.requisition_id = RequsitionIssue.requisition_id;
        this.product_id = RequsitionIssue.product_id;
        this.product_category_id = RequsitionIssue.product_category_id;
        this.requisition_quantity = RequsitionIssue.requisition_quantity;
        this.issue_quantity = RequsitionIssue.issue_quantity;
        this.issue_amount = RequsitionIssue.issue_amount;
    }
}
