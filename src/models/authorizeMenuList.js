export default class authrizeMenuList {
    constructor() {
        this.table_name = '';
        this.column_name = '';
        this.data_type = '';
        this.value = '';
        this.old_value = '';
    }
    loadModel(authrizeMenuList) {
        this.table_name = authrizeMenuList.table_name;
        this.column_name = authrizeMenuList.column_name;
        this.data_type = authrizeMenuList.data_type;
        this.value = authrizeMenuList.value;
        this.old_value = authrizeMenuList.old_value;
    }
}
