<template>
    <div class="card flex justify-content-center">
        {{ warehouseData.id }}
        <Dialog
            v-model:visible="visible"
            header="Warehouse Information"
            :style="{ width: '30rem' }"
            :pt="{
                root: 'border-none',
                mask: {
                    style: 'backdrop-filter: blur(2px)'
                }
            }"
        >
            <span class="p-text-secondary block mb-5">{{ warehouseData.id ? 'Update Warehouse Information' : 'Add Warehouse Information' }}</span>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="Name" class="font-semibold w-6rem">Name</label>
                <InputText v-model="warehouseData.warehouse_name" id="username" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="font-semibold w-6rem">Description</label>
                <InputText id="Description" v-model="warehouseData.description" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="font-semibold w-6rem">Address</label>
                <InputText id="Address" v-model="warehouseData.address" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="font-semibold w-6rem">Email</label>
                <InputText id="Email" v-model="warehouseData.email" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="font-semibold w-6rem">Branch</label>
                <InputText id="Email" v-model="warehouseData.branch_id" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="modalClose"></Button>
                <div v-if="warehouseData.warehouse_id">
                    <Button type="button" label="Update" @click="Update()"></Button>
                </div>
                <div v-else>
                    <Button type="button" label="Save" @click="CreatedWarehouse()"></Button>
                </div>
            </div>
        </Dialog>
        <!-- <Button type="button" label="Cancel" severity="secondary" @click="childData('childToParent data')">Child to Parent</Button> -->
    </div>
</template>
<script>
import warehouse_Info from '../../models/warehouse';
import warehouseService from '../../service/warehouseData';
import toast from '../../common/toast';
export default {
    data() {
        return {
            warehouseData: new warehouse_Info(),
            visible: false
        };
    },
    methods: {
        CreatedWarehouse() {
            console.log(this.warehouseData);
            warehouseService.create_update_warehouse_info(this.warehouseData).then((res) => {
                console.log('create', res);
                if (res) {
                    if (res.data.status_code) {
                        this.visible = false;
                        toast.confirmation_box(res);
                    } else {
                        this.visible = false;
                        this.$toast.add({ severity: 'error', summary: 'Error Message', detail: 'Response not found!', life: 3000 });
                        // toast.error_message('Response not found!');
                    }
                } else {
                    this.visible = false;
                    this.$toast.add({ severity: 'error', summary: 'Error Message', detail: 'Response not found!', life: 3000 });
                    // toast.error_message('Response not found!');
                }
            });
        },
        Update() {
            this.warehouseData.auth_1st_by = '';
            this.warehouseData.auth_1st_dt = '';
            this.warehouseData.auth_2nd_by = '';
            this.warehouseData.auth_2nd_dt = '';
            this.warehouseData.last_action = '';
            this.warehouseData.make_by = '';
            this.warehouseData.phone_number = '';

            warehouseService.create_update_warehouse_info(this.warehouseData).then((res) => {
                console.log('update', res);
                if (res.data.error_msg) {
                    this.visible = false;
                    toast.error_message(res.data.error_msg);
                } else {
                    toast.confirmation_box(res);
                }
                // this.visible = false;
            });
        },
        updatePermission(data) {
            console.log(data);
            if (data.warehouse_id) {
                this.visible = true;
                this.warehouseData.loadModel(data);
                console.log('get data', this.warehouseData);
            } else {
                this.visible = true;
                console.log('get data1', this.warehouseData);
            }
        },
        modalClose() {
            this.visible = false;
            this.warehouseData = '';
        }
    }
};
</script>
