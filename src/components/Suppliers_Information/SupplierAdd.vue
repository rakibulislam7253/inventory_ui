<template>
    <div class="card flex justify-content-center">
        <Dialog
            v-model:visible="visible"
            header="Supplier`s Information"
            :style="{ width: '30rem' }"
            :pt="{
                root: 'border-none',
                mask: {
                    style: 'backdrop-filter: blur(2px)'
                }
            }"
        >
            <span class="p-text-secondary block mb-5">{{ supplierData.suppliers_id ? 'Update Supplier Information' : 'Add Supplier Information' }}</span>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="Name" class="font-semibold w-6rem">Name</label>
                <InputText v-model="supplierData.suppliers_name" id="username" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="font-semibold w-6rem">Address</label>
                <InputText id="Address" v-model="supplierData.address" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="font-semibold w-6rem">Contact</label>
                <InputText id="Address" v-model="supplierData.phone_number" placeholder="+880xxxx-xxxxxx" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="font-semibold w-6rem">Email</label>
                <InputText id="Email" v-model="supplierData.email" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="modalClose()"></Button>
                <div v-if="supplierData.suppliers_id">
                    <Button type="button" label="Update" @click="updateSupplier()"></Button>
                </div>
                <div v-else>
                    <Button type="button" label="Save" @click="addSupplier()"></Button>
                </div>
            </div>
        </Dialog>
        <!-- <Button type="button" label="Cancel" severity="secondary" @click="childData('childToParent data')">Child to Parent</Button> -->
    </div>
</template>
<script>
import supplierService from '../../service/supplier';
import supplierData from '../../models/supplier';
import toast from '../../common/toast';
export default {
    // components: { testing },
    data() {
        return {
            supplierData: new supplierData(),
            visible: false,
            supplier: ''
        };
    },
    methods: {
        addSupplier() {
            supplierService.create_update_suppliers_info(this.supplierData).then((res) => {
                if (this.supplierData.suppliers_name) {
                    if (res.data.status_code) {
                        this.visible = false;
                        this.$emit('whisperedSecret');
                        this.supplierData.loadModel('');
                        toast.confirmation_box(res);
                    } else {
                        this.visible = false;
                        this.$toast.add({ severity: 'error', summary: 'Error Message', detail: 'Response not found!', life: 3000 });
                        this.supplierData.loadModel('');
                        // toast.error_message('Response not found!');
                    }
                } else {
                    // this.visible = false;
                    this.$toast.add({ severity: 'error', summary: 'Input Required', detail: 'Please Insert Supplier Name', life: 3000 });
                    this.supplierData.loadModel('');
                    this.visible = false;
                }
                this.loading = false;
            });
        },
        updateSupplier() {
            this.supplierData.auth_1st_by = '';
            this.supplierData.auth_1st_dt = '';
            this.supplierData.auth_2nd_by = '';
            this.supplierData.auth_2nd_dt = '';
            this.supplierData.last_action = '2';
            this.supplierData.make_by = '';
            this.supplierData.website = '';
            this.supplierData.contact_person = '';
            supplierService.create_update_suppliers_info(this.supplierData).then((res) => {
                console.log(res.data);

                if (res) {
                    if (res.data.error_msg) {
                        this.visible = false;
                        toast.error_message(res.data.error_msg);
                        this.supplierData.loadModel('');
                    } else {
                        toast.confirmation_box(res);
                        this.supplierData.loadModel('');
                    }
                }
                this.loading = false;
            });
        },
        updatePermission(data) {
            if (data.suppliers_id) {
                this.visible = true;
                this.supplierData.loadModel(data);
                console.log('get data', this.supplierData);
            } else {
                this.visible = true;
            }
        },
        modalClose() {
            this.visible = false;
            this.supplier = '';
            this.supplierData.loadModel('');
        }
    }
};
</script>
