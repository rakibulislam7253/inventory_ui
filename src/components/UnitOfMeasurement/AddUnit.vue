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
                <!-- <input type="text" v-model="unitData.unit_name" /> -->
                <InputText type="text" v-model="unitData.unit_name" id="username" class="flex-auto" />
            </div>
            <div class="flex align-items-center gap-3 mb-5">
                <label for="country" class="font-semibold w-6rem">Description</label>
                <InputText id="Description" v-model="unitData.unit_description" class="flex-auto" />
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="modalClose"></Button>
                <div v-if="unitData.unit_id">
                    <Button type="button" label="Update" @click="updateUnit()"></Button>
                </div>
                <div v-else>
                    <Button type="button" label="Save" @click ="addUnit()"></Button>
                </div>
            </div>
        </Dialog>
    </div>
</template>
<script>
import Unit_Info from '../../models/unit';
export default {
    // components: { testing },

    data() {
        return {
            unitData: new Unit_Info(),
            visible: false
        };
    },
    methods: {
        addUnit() {
            console.log(this.unitData);
            this.visible = true;
            // this.$toast.add({ severity: 'success', summary: 'Insert Successfully', detail: 'Message Content', life: 3000 });
            // this.$toast.add({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
        },
        updateUnit() {
            console.log(this.unitData);
            this.visible = false;
            this.$toast.add({ severity: 'success', summary: 'Update Successfully', detail: 'Message Content', life: 3000 });
            this.$toast.add({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
        },
        // childData(PermissionData) {
        //     this.$emit('reload', { mydata: 'item.id' });
        //     console.log('selection data: ', PermissionData);
        // },
        updatePermission(data) {
            this.unitData = "";
            console.log(this.unitData);
            if (data) {
                this.visible = true;
                this.unitData=data;
            } else {
                this.unitData = '';
                console.log('child data', this.unitData);
                this.visible = true;
            }
        },
        modalClose() {
            this.visible = false;
            this.unitData = '';
        }
    }
};
</script>
