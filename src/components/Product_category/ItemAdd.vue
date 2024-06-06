<template>
    <div class="card flex justify-content-center">
        <div>
            <!-- {{ warehouseData.id }} -->
            <Dialog
                v-model:visible="visible"
                header="Item Information"
                :style="{ width: '40rem', height: '35rem' }"
                :pt="{
                    root: 'border-none',
                    mask: {
                        style: 'backdrop-filter: blur(2px)'
                    }
                }"
            >
                <div class="ml-5">
                    <span class="p-text-secondary block mb-5">{{ itemData.product_id ? 'Update Item Information' : 'Add Item Information' }}</span>
                    <div class="flex align-items-center gap-3 mb-3">
                        <label for="Name" class="font-semibold w-6rem">Alias</label>
                        <InputText v-model="itemData.product_alias" id="username" class="edit" autocomplete="off" />
                    </div>
                    <div class="flex align-items-center gap-3 mb-3">
                        <label class="font-semibold w-6rem">Name</label>
                        <InputText class="edit" v-model="itemData.product_name" autocomplete="off" />
                    </div>
                    <div class="flex align-items-center gap-3 mb-3">
                        <label class="font-semibold w-6rem">Description</label>
                        <InputText class="edit" v-model="itemData.product_description" autocomplete="off" />
                    </div>

                    <div class="flex align-items-center gap-3 mb-3">
                        <label class="font-semibold w-6rem">UOM</label>
                        <!-- <Dropdown v-model="itemData.unit_id" :options="uom" optionLabel="unit_name" placeholder="Select UOM" class="w-full md:w-25rem" /> -->
                        <Dropdown v-model="itemData.unit_id" :options="uom" optionLabel="unit_name" placeholder="Select UOM" class="w-full md:w-25rem" />
                    </div>
                    <div class="flex align-items-center gap-3 mb-3">
                        <label class="font-semibold w-6rem">Category</label>
                        <Dropdown v-model="itemData.category_id" :options="category" optionLabel="category_name" placeholder="Select Category" class="w-full md:w-25rem" />
                    </div>
                    <div class="flex align-items-center gap-3 mb-3">
                        <label class="font-semibold w-6rem">Warehouse</label>
                        <Dropdown v-model="itemData.warehouse_id" :options="warehouse" optionLabel="warehouse_name" placeholder="Select Warehouse" class="w-full md:w-25rem" />
                    </div>
                    <div class="flex align-items-center gap-3 mb-3">
                        <label class="font-semibold w-6rem">Product Rate</label>
                        <InputNumber class="edit" v-model="itemData.product_price" autocomplete="off" />
                    </div>
                    <div class="flex align-items-center gap-3 mb-3">
                        <label class="font-semibold w-6rem">Reorder Level</label>
                        <InputNumber class="edit" v-model="itemData.reorder_level" autocomplete="off" />
                    </div>
                    <div class="flex justify-content-end gap-2">
                        <Button type="button" label="Cancel" severity="secondary" @click="modalClose()"></Button>
                        <div v-if="itemData.product_id">
                            <Button type="button" label="Update" @click="updateItem()"></Button>
                        </div>
                        <div v-else>
                            <Button type="button" label="Save" @click="addItem()"></Button>
                        </div>
                    </div>
                </div>
            </Dialog>
            <!-- <Button type="button" label="Cancel" severity="secondary" @click="childData('childToParent data')">Child to Parent</Button> -->
        </div>
    </div>
</template>
<script>
import itemService from '../../service/item';
import itemData from '../../models/item';
import toast from '../../common/toast';
export default {
    data() {
        return {
            itemData: new itemData(),
            visible: false,
            uom: '',
            category: '',
            warehouse: '',
            selectUnit: null
        };
    },
    mounted() {
        itemService.get_all_unit_of_measurements().then((data) => {
            this.uom = data.data;
        });
        itemService.get_all_product_category().then((data) => {
            this.category = data.data;
        });
        itemService.get_all_warehouse_info().then((data) => {
            this.warehouse = data.data;
            console.log(data.data);
        });
    },
    methods: {
        addItem() {
            console.log(this.itemData);
            this.itemData.unit_id = this.itemData.unit_id.unit_id;
            this.itemData.category_id = this.itemData.category_id.category_id;
            this.itemData.warehouse_id = this.itemData.warehouse_id.warehouse_id;
            itemService.create_update_product_details(this.itemData).then((res) => {
                console.log('addItem', res);
                if (this.itemData.unit_id && this.itemData.category_id && this.itemData.product_name && this.itemData.warehouse_id && this.itemData.product_alias) {
                    if (res.data.status_code) {
                        this.visible = false;
                        this.$emit('whisperedSecret');
                        this.itemData.loadModel('');
                        toast.confirmation_box(res);
                    } else {
                        this.visible = false;
                        this.$toast.add({ severity: 'error', summary: 'Error Message', detail: 'Response not found!', life: 3000 });
                        // toast.error_message('Response not found!');
                    }
                } else {
                    this.$toast.add({ severity: 'error', summary: 'Input Required', detail: 'Please fill out this field!', life: 3000 });
                }
            });
        },
        updateItem() {
            console.log(this.itemData);
            this.itemData.auth_1st_by = '';
            this.itemData.auth_1st_dt = '';
            this.itemData.auth_2nd_by = '';
            this.itemData.auth_2nd_dt = '';
            this.itemData.last_action = '';
            this.itemData.make_by = '';
            itemService.create_update_product_details(this.itemData).then((res) => {
                console.log('updateItem', res);
                if (res) {
                    if (res.data.error_msg) {
                        this.visible = false;
                        toast.error_message(res.data.error_msg);
                        this.itemData.loadModel('');
                    } else {
                        toast.confirmation_box(res);
                    }
                }
            });
        },
        changeDesigEvent(event) {
            console.log(event.target.value);
        },

        updatePermission(data) {
            if (data.product_id) {
                this.visible = true;
                this.itemData.loadModel(data);
                // console.log('get data', this.itemData);
            } else {
                this.visible = true;
                // console.log('get data1', this.itemData);
            }
        },
        modalClose() {
            this.visible = false;
            this.warehouseData = '';
            this.itemData.loadModel('');
        }
    }
};
</script>
<style>
.edit {
    width: 25rem;
}
.selectInput {
    width: 50%;
    height: 50%;
}
</style>
