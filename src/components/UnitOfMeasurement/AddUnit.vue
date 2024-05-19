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
            <span class="p-text-secondary block mb-5">{{ unitData.id ? 'Update Unit information.' : 'Add Unit information.' }}</span>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="Name" class="font-semibold w-6rem">Name</label>
                <InputText v-model="unitData.id" id="username" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-5">
                <label for="country" class="font-semibold w-6rem">Description</label>
                <InputText id="Description" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="modalClose"></Button>
                <div v-if="unitData.id">
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
            unitData: ''
        };
    },
    methods: {
        childData(PermissionData) {
            this.$emit('reload', { mydata: 'item.id' });
            console.log('selection data: ', PermissionData);
            // this.$refs.PermissionData.childToParent(PermissionData);
        },
        updatePermission(data) {
            this.unitData = data;
            if (this.unitData) {
                this.visible = true;
            } else {
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
