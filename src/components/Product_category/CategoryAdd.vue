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
            <span class="p-text-secondary block mb-5">{{ productCategory.category_id ? 'Update Product Category' : 'Add Product Category' }}</span>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="font-semibold w-6rem">Category</label>
                <InputText v-model="productCategory.category_name" id="category" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="font-semibold w-6rem">Description</label>
                <InputText id="Description" v-model="productCategory.category_description" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="modalClose()"></Button>
                <div v-if="productCategory.category_id">
                    <Button type="button" label="Update" @click="updateCategory()"></Button>
                </div>
                <div v-else>
                    <Button type="button" label="Save" @click="addCategory()"></Button>
                </div>
            </div>
        </Dialog>
        <!-- <Button type="button" label="Cancel" severity="secondary" @click="childData('childToParent data')">Child to Parent</Button> -->
    </div>
</template>
<script>
import toast from '../../common/toast';
import productCategory from '../../models/productCategory';
import productCategoryData from '../../service/productCategory';
export default {
    data() {
        return {
            productCategory: new productCategory(),
            visible: false,
            category: ''
        };
    },
    methods: {
        updateCategory() {
            this.productCategory.auth_1st_by = '';
            this.productCategory.auth_1st_dt = '';
            this.productCategory.auth_2nd_by = '';
            this.productCategory.auth_2nd_dt = '';
            this.productCategory.last_action = '2';
            this.productCategory.make_by = '';
            this.productCategory.auth_status_id = 'U';
            console.log(this.productCategory);
            productCategoryData.create_update_product_category(this.productCategory).then((res) => {
                console.log('update', res);
                if (res.data.error_msg) {
                    this.visible = false;
                    toast.error_message(res.data.error_msg);
                    this.itemData.loadModel('');
                } else {
                    toast.confirmation_box(res);
                    this.visible = false;
                    this.productCategory.loadModel('');
                }
            });
        },
        addCategory() {
            console.log('add data', this.productCategory);
            productCategoryData.create_update_product_category(this.productCategory).then((res) => {
                console.log(res);
                if (this.productCategory.category_name) {
                    if (res.data.status_code) {
                        this.visible = false;
                        this.$emit('whisperedSecret');
                        this.productCategory.loadModel('');
                        toast.confirmation_box(res);
                    } else {
                        this.visible = false;
                        this.$toast.add({ severity: 'error', summary: 'Error Message', detail: 'Response not found!', life: 3000 });
                        // toast.error_message('Response not found!');
                    }
                } else {
                    this.$toast.add({ severity: 'error', summary: 'Input Required', detail: 'Please insert Category Name!', life: 3000 });
                    // toast.error_message('Response not found!');
                }
                // this.loading = false;
            });
        },
        updatePermission(data) {
            if (data.category_id) {
                this.visible = true;
                this.productCategory.loadModel(data);
                console.log('get data', this.productCategory);
            } else {
                this.visible = true;
                console.log('get data1', this.productCategory);
            }
        },
        modalClose() {
            this.visible = false;
            this.category = '';
            this.productCategory.loadModel('');
        }
    }
};
</script>
