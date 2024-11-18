export default class authrizeList {
    constructor() {
        this.last_action = '';
        this.auth_status_id = '';
        this.auth_1st_by = '';
        this.auth_1st_dt = '';
        this.make_by = '';
        this.make_dt = '';
        this.auth_2nd_by = '';
        this.auth_2nd_dt = '';
        this.primary_table_column = '';
        this.queue_id = '';
        this.module_id = '';
        this.menu_id = '';
        this.table_name = '';
        this.table_rowid = '';
        this.column_name = '';
        this.data_type = '';
        this.old_value = '';
        this.new_value = '';
        this.action_status = '';
        this.primary_table_flag = 0;
        this.remarks = '';
        this.log_status = '';
        this.reason_decline = '';
    }
    loadModel(authrizeList) {
        this.last_action = authrizeList.last_action;
        this.auth_status_id = authrizeList.auth_status_id;
        this.auth_1st_by = authrizeList.auth_1st_by;
        this.auth_1st_dt = authrizeList.auth_1st_dt;
        this.make_by = authrizeList.make_by;
        this.make_dt = authrizeList.make_dt;
        this.auth_2nd_by = authrizeList.auth_2nd_by;
        this.auth_2nd_dt = authrizeList.auth_2nd_dt;
        this.primary_table_column = authrizeList.primary_table_column;
        this.queue_id = authrizeList.queue_id;
        this.module_id = authrizeList.module_id;
        this.menu_id = authrizeList.menu_id;
        this.table_name = authrizeList.table_name;
        this.table_rowid = authrizeList.table_rowid;
        this.column_name = authrizeList.column_name;
        this.data_type = authrizeList.data_type;
        this.old_value = authrizeList.old_value;
        this.new_value = authrizeList.new_value;
        this.action_status = authrizeList.action_status;
        this.primary_table_flag = authrizeList.primary_table_flag;
        this.remarks = authrizeList.remarks;
        this.log_status = authrizeList.log_status;
        this.reason_decline = authrizeList.reason_decline;
    }
}
