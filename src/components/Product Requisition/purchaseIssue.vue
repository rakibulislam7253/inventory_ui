<template>
    <div class="headerSection1">
        <h4>Product Issue</h4>
    </div>
    <div class="headerSection">
        <div class="flex flex-wrap gap-1">
            <div class="flex align-items-center gap-3 mb-1">
                <label class="font-semibold w-8rem">Branch/Division</label>
                <InputText id="Address" size="small" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-1 ml-2" @change="searchRequisitionId($event)">
                <label class="font-semibold w-8rem">Requisition Number</label>
                <InputText id="Address" size="small" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-1 ml-2">
                <label class="font-semibold w-5rem">To Date</label>
                <InputText id="Address" size="small" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-1">
                <label class="font-semibold w-8rem">Created By</label>
                <InputText id="Address" size="small" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-1 ml-2">
                <label class="font-semibold w-8rem">From Date</label>
                <InputText id="Address" size="small" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-1 ml-2">
                <label class="font-semibold w-5rem">Priority</label>
                <InputText id="Address" size="small" class="flex-auto" autocomplete="off" />
            </div>
            <br />
        </div>
    </div>
    <div class="card p-fluid">
        <br />
        <!-- <Button type="button" icon="pi pi-search" label="search" style="width: 10%" @click="addUnit()" /> -->
        <hr />
        <br />
        <DataTable v-model:editingRows="editingRows" :value="products" editMode="row" dataKey="id" @row-edit-save="onRowEditSave">
            <Column field="product_id" header="Item Name" style="width: 20%">
                <template #body="{ data }">
                    {{ data.product_id }}
                </template>
            </Column>
            <Column field="order_quantity" header="Unit Price" style="width: 20%">
                <template #body="{ data }">
                    {{ data.unit_price }}
                </template>
                <template #editor="{ data }">
                    <InputText v-model="data.unit_price" style="width: 150%" />
                </template>
            </Column>

            <Column field="requisition_quantity" header="Requisition Quantity" style="width: 20%">
                <template #body="{ data }">
                    {{ data.requisition_quantity }}
                </template>
                <template #editor="{ data }">
                    <InputNumber v-model="data.requisition_quantity" />
                </template>
            </Column>
            <Column field="order_quantity" header="Total Price" style="width: 20%">
                <template #body="{ data }">
                    {{ data.total_prod_price }}
                </template>
            </Column>

            <Column field="make_dt" header="Issue Date" style="width: 20%">
                <template #body="{ data }">
                    {{ data.make_dt }}
                </template>
            </Column>
            <Column header="Action" :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
        </DataTable>

        <div class="flex justify-content-evenly mt-4">
            <Button style="width: auto" icon="pi pi-check" label="Issue" @click="issues()" />
            <Button style="width: auto" icon="pi pi-times" label="Cancel" @click="ordered()" />
        </div>
    </div>
    <!-- <purchaseIssueShow style="border: none; background-color: #f5f9ff" ref="PermissionData" @reload="getReload" /> -->
</template>

<script>
import { ref } from 'vue';
import productIssue from '../../service/productRequsition';
import requsitionIssue from '../../models/requsition_Issue';
// import purchaseIssueShow from '../../components/Product Requisition/purchaseIssueShow.vue';
import { category_name, fetchData, category_namedToId, product_name } from '../../service/globalApiService';
const PermissionData = ref(0);
export default {
    // components: { purchaseIssueShow },
    data() {
        return {
            Issuerequsition: new requsitionIssue(),
            visible: false,
            products: [],
            editingRows: [],
            detailspush: [],
            product: {},
            statuses: [
                { label: 'In Stock', value: 'INSTOCK' },
                { label: 'Low Stock', value: 'LOWSTOCK' },
                { label: 'Out of Stock', value: 'OUTOFSTOCK' }
            ]
        };
    },

    methods: {
        searchRequisitionId(event) {
            this.GetsearchOrderId = true;
            console.log(event.target.value);
            this.updateOrder = true;
            this.placeOrder = false;
            productIssue.get_requisition_details(event.target.value).then(async (res) => {
                this.product = res.data;
                for (let i = 0; i < this.product.length; i++) {
                    this.products.push(this.product[i]);
                    console.log('products', this.products);
                    // product Id to product name
                    this.result = await fetchData(this.product[i].product_id);
                    this.products[i].product_id = this.result[0].product_name;
                    console.log(this.products[i].product_id);
                    // category Id to category name
                    this.result = await category_name(this.product[i].product_category_id);
                    this.products[i].product_category_id = this.result[0].category_name;
                }
                let sum = 0;
                for (let i = 0; i < this.products.length; i++) {
                    sum = sum + this.products[i].total_amount;
                    this.GrandPrice = sum;
                }
            });
        },
        async issues() {
            console.log(this.products);
            for (let i = 0; i < this.products.length; i++) {
                console.log('products', this.products[i]);
                this.Issuerequsition.loadModel(this.products[i]);
                //category name to id
                this.result = await category_namedToId(this.products[i].product_category_id);
                console.log(this.result);
                this.Issuerequsition.product_category_id = this.result[0].category_id;
                //product name to id
                this.Issuerequsition.product_id = this.products[i].product_id;
                this.result = await product_name(this.Issuerequsition.product_id);
                this.Issuerequsition.product_id = this.result[0].product_id;
                this.Issuerequsition.issue_id = '';
                this.Issuerequsition.last_action = '';
                this.Issuerequsition.auth_1st_by = '';
                this.Issuerequsition.auth_1st_dt = '';
                this.Issuerequsition.auth_2nd_by = '';
                this.Issuerequsition.auth_2nd_dt = '';
                this.Issuerequsition.last_action = '1';
                this.Issuerequsition.issue_quantity = this.products[i].requisition_quantity;
                this.Issuerequsition.issue_amount = this.products[i].total_prod_price;
                console.log(this.Issuerequsition);
                this.detailspush.push({ ...this.Issuerequsition });
            }
            productIssue.create_requisition_issue(this.detailspush).then(async (res) => {
                console.log(res);
                if (res.data.result_id) {
                    this.$toast.add({ severity: 'success', summary: 'Requisition Issue', detail: 'Successful Requisition Issue', life: 3000 });
                    location.reload();
                } else {
                    this.$toast.add({ severity: 'error', summary: 'Order Details', detail: 'Requsition Issue Already Existing', life: 3000 });
                }
            });
        },
        // getReload(PermissionData) {
        //     console.log('come from child to parent data ', PermissionData.mydata);
        // },
        addUnit() {
            // this.visible = true;
            console.log('Add data');
            this.$refs.PermissionData.updatePermission(PermissionData);
        },
        onRowEditSave(event) {
            let { newData, index } = event;
            console.log(newData);
            newData.total_prod_price = newData.unit_price * newData.requisition_quantity;
            this.products[index] = newData;
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
        }
    }
};
</script>

<style scoped>
.headerSection {
    background-color: #e2e8f0;
    padding: 10px;
    padding-left: 45px;
    height: auto;
    margin-bottom: 5px;
    border-radius: 8px;
}
.headerSection1 {
    background-color: #ffffff;
    padding: 8px;
    height: 40px;
    margin-bottom: 20px;
    border-radius: 8px;
}
</style>
