export default class supplier_info {
    constructor() {
        (this.suppliers_id = ''),
            (this.suppliers_name = ''),
            (this.contact_person = ''),
            (this.address = ''),
            (this.phone_number = ''),
            (this.email = ''),
            (this.website = ''),
            (this.last_action = ''),
            (this.auth_status_id = ''),
            (this.auth_1st_by = ''),
            (this.auth_1st_dt = ''),
            (this.make_by = ''),
            (this.make_dt = ''),
            (this.auth_2nd_by = ''),
            (this.auth_2nd_dt = ''),
            (this.table_name = ''),
            (this.primary_table_column = ''),
            (this.queue_id = '');
    }

    loadModel(supplier_info) {
        this.suppliers_id = supplier_info.suppliers_id;
        this.suppliers_name = supplier_info.suppliers_name;
        this.contact_person = supplier_info.contact_person;
        this.address = supplier_info.address;
        this.phone_number = supplier_info.phone_number;
        this.email = supplier_info.email;
        this.website = supplier_info.website;
        this.last_action = supplier_info.last_action;
        this.auth_status_id = supplier_info.auth_status_id;
        this.auth_1st_by = supplier_info.auth_1st_by;
        this.auth_1st_dt = supplier_info.auth_1st_dt;
        this.make_by = supplier_info.make_by;
        this.make_dt = supplier_info.make_dt;
        this.auth_2nd_by = supplier_info.auth_2nd_by;
        this.auth_2nd_dt = supplier_info.auth_2nd_dt;
        this.table_name = supplier_info.table_name;
        this.primary_table_column = supplier_info.primary_table_column;
        this.queue_id = supplier_info.queue_id;
    }
}
