<template>
    <div class="card flex justify-content-center">
        {{ category.id }}
        <Dialog
            v-model:visible="visible"
            header="Product Category"
            :style="{ width: '30rem' }"
            :pt="{
                root: 'border-none',
                mask: {
                    style: 'backdrop-filter: blur(2px)'
                }
            }"
        >
            <span class="p-text-secondary block mb-5">{{ category.id ? 'Update Product Category' : 'Add Product Category' }}</span>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="font-semibold w-6rem">Category</label>
                <InputText v-model="category.id" id="category" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="font-semibold w-6rem">Description</label>
                <InputText id="Description" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="modalClose"></Button>
                <div v-if="category.id">
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
            category: ''
        };
    },
    methods: {
        childData(PermissionData) {
            this.$emit('reload', { mydata: 'item.id' });
            console.log('selection data: ', PermissionData);
            // this.$refs.PermissionData.childToParent(PermissionData);
        },
        updatePermission(data) {
            this.category = data;
            if (this.category) {
                this.visible = true;
            } else {
                console.log('child data', this.category);
                this.visible = true;
            }
        },
        modalClose() {
            this.visible = false;
            this.category = '';
        }
    }
};
</script>
