<template>
    <div class="card flex justify-content-center">
        {{ unitData.id }}
        <Dialog
            v-model:visible="visible"
            header="Unit Of Measurement"
            :style="{ width: '30rem' }"
            :pt="{
                root: 'border-none',
                mask: {
                    style: 'backdrop-filter: blur(2px)'
                }
            }"
        >
            <span class="p-text-secondary block mb-5">{{ unitData.unit_id ? 'Update Unit information.' : 'Add Unit information.' }}</span>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="Name" class="font-semibold w-6rem">Name</label>
                <InputText type="text" v-model="unitData.unit_name" id="username" class="flex-auto" />
            </div>
            <div class="flex align-items-center gap-3 mb-5">
                <label for="country" class="font-semibold w-6rem">Description</label>
                <InputText id="Description" v-model="unitData.unit_description" class="flex-auto" />
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="modalClose()"></Button>
                <div v-if="unitData.unit_id">
                    <Button type="button" label="Update" @click="updateUnit()"></Button>
                </div>
                <div v-else>
                    <Button type="button" label="Save" @click="addUnit()"></Button>
                </div>
            </div>
        </Dialog>
    </div>
</template>
<script>
import Unit_Info from '../../models/unit';
import unitService from '../../service/unitData';
import toast from '../../common/toast';
// import sweet_alert from "@/common/sweet";
export default {
    // components: { testing },

    data() {
        return {
            unitData: new Unit_Info(),
            visible: false,
            unit_name: ''
        };
    },
    methods: {
        addUnit() {
            console.log(this.unitData);
            if (this.unitData.unit_name) {
                unitService.create_update_unit_of_measurement(this.unitData).then((res) => {
                    console.log(res);

                    if (res.data.status_code == 1) {
                        this.visible = false;
                        this.$emit('whisperedSecret');
                        this.unitData.loadModel('');
                        toast.confirmation_box(res);
                    } else {
                        this.visible = false;
                        this.$toast.add({ severity: 'error', summary: 'Error Message', detail: 'Response not found!', life: 3500 });
                    }
                });
            } else {
                this.$toast.add({ severity: 'error', summary: 'Input Required', detail: 'Please insert Unit Name!', life: 3000 });
            }
        },
        updateUnit() {
            console.log(this.unitData);
            this.unitData.auth_2nd_dt = '';
            this.unitData.auth_2nd_by = '';
            this.unitData.last_action = '2';
            this.unitData.auth_status_id = 'U';
            unitService.create_update_unit_of_measurement(this.unitData).then((res) => {
                console.log(res);
                if (res.data.error_msg) {
                    this.visible = false;
                    toast.error_message(res.data.error_msg);
                } else {
                    toast.confirmation_box(res);
                    this.visible = false;
                    this.unitData.loadModel('');
                }
            });
        },

        updatePermission(data) {
            // console.log(data);
            if (data.unit_id) {
                this.visible = true;
                this.unitData.loadModel(data);
                console.log('get data', this.unitData);
            } else {
                this.visible = true;
                console.log('get data1', this.unitData);
            }
        },
        modalClose() {
            this.visible = false;
            this.unitData = '';
            this.unitData.loadModel('');
        }
    }
};
</script>
../../common/toast
