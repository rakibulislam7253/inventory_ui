export default class item_info {
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
            this.product_id = '';
            this.product_alias = '';
            this.product_name = '';
            this.product_description = '';
            this.product_price = 0;
            this.unit_id = '';
            this.unit_name = '';
            this.category_id = '';
            this.category_name = '';
            this.warehouse_id = '';
            this.warehouse_name = '';
            this.minimum_stock = 0;
            this.maximum_stock = 0;
            this.current_stock = 0;
            this.reorder_level = 0;
        }
    }

    loadModel(item_info) {
        this.last_action = item_info.last_action;
        this.auth_status_id = item_info.auth_status_id;
        this.auth_1st_by = item_info.auth_1st_by;
        this.auth_1st_dt = item_info.auth_1st_dt;
        this.make_by = item_info.make_by;
        this.make_dt = item_info.make_dt;
        this.auth_2nd_by = item_info.auth_2nd_by;
        this.auth_2nd_dt = item_info.auth_2nd_dt;
        this.table_name = item_info.table_name;
        this.primary_table_column = item_info.primary_table_column;
        this.queue_id = item_info.queue_id;
        this.product_id = item_info.product_id;
        this.product_alias = item_info.product_alias;
        this.product_name = item_info.product_name;
        this.product_description = item_info.product_description;
        this.product_price = item_info.product_price;
        this.unit_id = item_info.unit_id;
        this.unit_name = item_info.unit_name;
        this.category_id = item_info.category_id;
        this.category_name = item_info.category_name;
        this.warehouse_id = item_info.warehouse_id;
        this.warehouse_name = item_info.warehouse_name;
        this.minimum_stock = item_info.minimum_stock;
        this.maximum_stock = item_info.maximum_stock;
        this.current_stock = item_info.current_stock;
        this.reorder_level = item_info.reorder_level;
    }
}
