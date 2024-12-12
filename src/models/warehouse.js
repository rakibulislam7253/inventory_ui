export default class warehouse_info {
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
        this.warehouse_id = '';
        this.warehouse_name = '';
        this.description = '';
        this.incharge = 'tafazzal';
        this.address = '';
        this.phone_number = '';
        this.email = '';
        this.branch_id = '';
    }

    loadModel(warehouse_info) {
        this.last_action = warehouse_info.last_action;
        this.auth_status_id = warehouse_info.auth_status_id;
        this.auth_1st_by = warehouse_info.auth_1st_by;
        this.auth_1st_dt = warehouse_info.auth_1st_dt;
        this.make_by = warehouse_info.make_by;
        this.make_dt = warehouse_info.make_dt;
        this.auth_2nd_by = warehouse_info.auth_2nd_by;
        this.auth_2nd_dt = warehouse_info.auth_2nd_dt;
        this.table_name = warehouse_info.table_name;
        this.primary_table_column = warehouse_info.primary_table_column;
        this.queue_id = warehouse_info.queue_id;
        this.warehouse_id = warehouse_info.warehouse_id;
        this.warehouse_name = warehouse_info.warehouse_name;
        this.description = warehouse_info.description;
        this.incharge = warehouse_info.incharge;
        this.address = warehouse_info.address;
        this.phone_number = warehouse_info.phone_number;
        this.email = warehouse_info.email;
        this.branch_id = warehouse_info.branch_id;
    }
}
