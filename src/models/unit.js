export default class unit_info {
    constructor() {
        this.queue_id = '';
        this.unit_id = '';
        this.unit_name = '';
        this.unit_description = '';
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
    }

    loadModel(unit_info) {
        this.queue_id = unit_info.queue_id;
        this.unit_id = unit_info.unit_id;
        this.unit_name = unit_info.unit_name;
        this.unit_description = unit_info.unit_description;
        this.last_action = unit_info.last_action;
        this.auth_status_id = unit_info.auth_status_id;
        this.auth_1st_by = unit_info.auth_1st_by;
        this.auth_1st_dt = unit_info.auth_1st_dt;
        this.make_by = unit_info.make_by;
        this.make_dt = unit_info.make_dt;
        this.auth_2nd_by = unit_info.auth_2nd_by;
        this.auth_2nd_dt = unit_info.auth_2nd_dt;
        this.table_name = unit_info.table_name;
        this.primary_table_column = unit_info.primary_table_column;
    }
}
