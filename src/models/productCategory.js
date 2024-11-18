export default class productCategory {
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
        this.category_id = '';
        this.category_name = '';
        this.category_description = '';
    }

    loadModel(productCategory) {
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
        this.queue_id = productCategory.queue_id;
        this.category_id = productCategory.category_id;
        this.category_name = productCategory.category_name;
        this.category_description = productCategory.category_description;
    }
}
