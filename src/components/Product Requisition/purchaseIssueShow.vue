<template>
    <div class="card flex justify-content-center">
        <Dialog
            v-model:visible="visible"
            header="Product Issue"
            :style="{ width: '30rem' }"
            :pt="{
                root: 'border-none',
                mask: {
                    style: 'backdrop-filter: blur(2px)'
                }
            }"
        >
            <span class="p-text-secondary block mb-5">{{ requisition.id ? 'Update Product Issue' : 'Search Product Issue' }}</span>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="font-semibold w-6rem">Requisition Number</label>
                <InputText id="Address" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="font-semibold w-6rem">Branch / Division</label>
                <InputText id="Address" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="font-semibold w-6rem">Created By</label>
                <InputText id="Address" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="font-semibold w-6rem">Requisition Date</label>
                <InputText id="Address" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="font-semibold w-6rem">From Date</label>
                <Calendar v-model="buttondisplay2" showIcon :showOnFocus="false" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="font-semibold w-6rem">To Date</label>
                <Calendar v-model="buttondisplay1" showIcon :showOnFocus="false" />
            </div>
            <!-- <div class="flex align-items-center gap-3 mb-3">
                <label class="font-semibold w-6rem">From Date</label>
                <Calendar v-model="date" dateFormat="dd/mm/yy" />
            </div> -->
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="modalClose"></Button>
                <div v-if="requisition.id">
                    <Button type="button" label="Update" @click="visible = false"></Button>
                </div>
                <div v-else>
                    <Button type="button" label="Search" @click="visible = false"></Button>
                </div>
            </div>
        </Dialog>
        <!-- <Button type="button" label="Cancel" severity="secondary" @click="childData('childToParent data')">Child to Parent</Button> -->
    </div>
</template>
<script>
// import testing from '../uikit/Testing.vue';
// import { ref } from 'vue';
// const childToParent = ref(0);
export default {
    // components: { testing },
    data() {
        return {
            buttondisplay1: null,
            buttondisplay2: null,
            visible: false,
            requisition: ''
        };
    },
    methods: {
        childData(PermissionData) {
            this.$emit('reload', { mydata: 'item.id' });
            console.log('selection data: ', PermissionData);
            // this.$refs.PermissionData.childToParent(PermissionData);
        },
        updatePermission(data) {
            this.requisition = data;
            if (this.requisition) {
                this.visible = true;
            } else {
                console.log('child data', this.requisition);
                this.visible = true;
            }
        },
        modalClose() {
            this.visible = false;
            this.requisition = '';
        }
    }
};
</script>
