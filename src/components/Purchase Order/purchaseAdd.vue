<template>
    <div class="card flex justify-content-center">
        {{ warehouseData.id }}
        <Dialog
            v-model:visible="visible"
            header="Purchase Order"
            :style="{ width: '30rem' }"
            :pt="{
                root: 'border-none',
                mask: {
                    style: 'backdrop-filter: blur(2px)'
                }
            }"
        >
            <span class="p-text-secondary block mb-5">{{ warehouseData.id ? 'Update Purchase Order' : 'Add Purchase Order' }}</span>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="Name" class="font-semibold w-6rem">Orderd Date</label>
                <InputText v-model="warehouseData.id" id="username" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="font-semibold w-6rem">Category</label>
                <InputText id="Address" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="font-semibold w-6rem">Item</label>
                <InputText id="Address" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="font-semibold w-6rem">Rate</label>
                <InputText id="Email" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="font-semibold w-6rem">Order Quantity</label>
                <InputText id="Email" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="font-semibold w-6rem">UOM</label>
                <InputText id="Email" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="font-semibold w-6rem">Total Amount</label>
                <InputText id="Email" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="modalClose"></Button>
                <div v-if="warehouseData.id">
                    <Button type="button" label="Update" @click="visible = false"></Button>
                </div>
                <div v-else>
                    <Button type="button" label="Save" @click="visible = false"></Button>
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
            visible: false,
            warehouseData: ''
        };
    },
    methods: {
        childData(PermissionData) {
            this.$emit('reload', { mydata: 'item.id' });
            console.log('selection data: ', PermissionData);
            // this.$refs.PermissionData.childToParent(PermissionData);
        },
        updatePermission(data) {
            this.warehouseData = data;
            if (this.warehouseData) {
                this.visible = true;
            } else {
                console.log('child data', this.warehouseData);
                this.visible = true;
            }
        },
        modalClose() {
            this.visible = false;
            this.warehouseData = '';
        }
    }
};
</script>
