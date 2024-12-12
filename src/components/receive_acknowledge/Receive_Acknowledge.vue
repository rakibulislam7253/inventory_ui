<template>
    <div class="headerSection1">
        <h4>Product Received And Requsition</h4>
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
                <label class="font-semibold w-6rem">To Date</label>
                <InputText id="Address" size="small" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-1">
                <label class="font-semibold w-8rem">Created By</label>
                <InputText id="Address" v-model="product.make_by" size="small" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-1 ml-2">
                <label class="font-semibold w-8rem">Priority</label>
                <InputText id="Address" size="small" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-1 ml-2">
                <label class="font-semibold w-6rem">From Date</label>
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
            <Column field="order_quantity" header="Requsition Quantity" style="width: 20%">
                <template #body="{ data }">
                    {{ data.requisition_quantity }}
                </template>
                <!-- <template #editor="{ data }">
                    <InputText v-model="data.requisition_quantity" style="width: 150%" />
                </template> -->
            </Column>

            <Column field="issue_quantity" header="Delivered Quantity" style="width: 20%">
                <template #body="{ data }">
                    {{ data.issue_quantity }}
                </template>
                <!-- <template #editor="{ data }">
                    <InputNumber v-model="data.issue_quantity" />
                </template> -->
            </Column>
            <Column field="receive_quantity" header="Received Quantity" style="width: 20%">
                <template #body="{ data }">
                    {{ data.receive_quantity }}
                </template>
                <template #editor="{ data }">
                    <InputNumber v-model="data.receive_quantity" />
                </template>
            </Column>
            <Column field="return_quantity" header="Return Quantity" style="width: 20%">
                <template #body="{ data }">
                    {{ data.return_quantity }}
                </template>
                <!-- <template #editor="{ data }">
                    <InputNumber v-model="data.return_quantity" />
                </template> -->
            </Column>
            <Column field="issue_amount" header="Total Price" style="width: 20%">
                <template #body="{ data }">
                    {{ data.issue_amount }}
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
            <Button v-if="submitionButton" style="width: auto" icon="pi pi-check" label="Receive" @click="received()" />
            <Button v-if="submitionButton" style="width: auto" icon="pi pi-times" label="Cancel" @click="cancel()" />
        </div>
    </div>
    <!-- <purchaseIssueShow style="border: none; background-color: #f5f9ff" ref="PermissionData" @reload="getReload" /> -->
</template>

<script>
import productIssue from '../../service/productRequsition';
import requsitionIssue from '../../models/requsition_Issue';
import requsitionIssueReceive from '../../models/requsition_Issue_receive';
// import purchaseIssueShow from '../../components/Product Requisition/purchaseIssueShow.vue';
// import { category_name, fetchData, category_namedToId, product_name } from '../../service/globalApiService';
import { category_name, fetchData, product_name } from '../../service/globalApiService';

export default {
    // components: { purchaseIssueShow },
    data() {
        return {
            Issuerequsition: new requsitionIssue(),
            requsitionIssueReceive: new requsitionIssueReceive(),
            visible: false,
            products: [],
            editingRows: [],
            detailspush: [],
            product: {},
            unitPrice: '',
            updateButton: false,
            submitionButton: false,
            statuses: [
                { label: 'In Stock', value: 'INSTOCK' },
                { label: 'Low Stock', value: 'LOWSTOCK' },
                { label: 'Out of Stock', value: 'OUTOFSTOCK' }
            ]
        };
    },

    methods: {
        searchRequisitionId(event) {
            console.log(event.target.value);

            productIssue.get_requisition_issue(event.target.value).then(async (res) => {
                console.log(res.data);
                this.product = res.data;
                for (let i = 0; i < this.product.length; i++) {
                    this.products.push(this.product[i]);
                    // console.log('products', this.products);
                    // this.product[i].return_quantity = this.product[i].issue_amount / this.product[i].issue_quantity;
                    this.product[i].receive_quantity = 0;
                    this.product[i].return_quantity = 0;
                    this.result = await fetchData(this.product[i].product_id);
                    this.products[i].product_id = this.result[0].product_name;
                    console.log(this.products[i].product_id);
                    // category Id to category name
                    this.result = await category_name(this.product[i].product_category_id);
                    this.products[i].product_category_id = this.result[0].category_name;
                }
                this.submitionButton = true;
                // let sum = 0;
                // for (let i = 0; i < this.products.length; i++) {
                //     sum = sum + this.products[i].total_amount;
                //     this.GrandPrice = sum;
                // }
            });
        },
        async received() {
            console.log(this.products);
            for (let i = 0; i < this.products.length; i++) {
                //product name to id
                this.result = await product_name(this.products[i].product_id);
                this.requsitionIssueReceive.loadModel(this.products[i]);
                this.requsitionIssueReceive.product_id = this.result[0].product_id;
                this.requsitionIssueReceive.requisition_id = this.products[i].requisition_id;
                this.requsitionIssueReceive.last_action = '1';
                this.requsitionIssueReceive.auth_1st_by = '';
                this.requsitionIssueReceive.auth_1st_dt = '';
                this.requsitionIssueReceive.auth_2nd_by = '';
                this.requsitionIssueReceive.auth_2nd_dt = '';
                this.requsitionIssueReceive.receive_id = '';
                this.requsitionIssueReceive.receive_status = '';
                this.requsitionIssueReceive.remarks = '';
                this.requsitionIssueReceive.return_amount = this.unitPrice * this.products[i].return_quantity;
                this.requsitionIssueReceive.order_quantity = this.products[i].receive_quantity;
                this.requsitionIssueReceive.receive_amount = this.products[i].issue_amount;
                this.requsitionIssueReceive.return_quantity = this.products[i].return_quantity;
                // console.log(this.requsitionIssueReceive);
                this.detailspush.push({ ...this.requsitionIssueReceive });
            }
            console.log(this.detailspush);
            // create_requisition_receive
            productIssue.create_requisition_receive(this.detailspush).then(async (res) => {
                // console.log(res.data);
                if (res.data.result_id) {
                    this.$toast.add({ severity: 'success', summary: 'Product Received', detail: 'Successful Product Received', life: 3000 });
                    // location.reload();
                    this.requsitionIssueReceive.loadModel('');
                    this.products = [''];
                } else {
                    this.$toast.add({ severity: 'error', summary: 'Order Details', detail: 'Requsition Issue Already Existing', life: 3000 });
                }
            });
        },
        cancel() {
            location.reload();
        },

        onRowEditSave(event) {
            let { newData, index } = event;
            console.log(newData);
            console.log(this.product);
            if (newData.receive_quantity <= newData.issue_quantity) {
                newData.return_quantity = newData.issue_quantity - newData.receive_quantity;
                this.unitPrice = this.product[index].issue_amount / newData.issue_quantity;
                console.log(this.unitPrice);
                newData.issue_amount = this.unitPrice * newData.receive_quantity;

                this.products[index] = newData;
            } else {
                this.$toast.add({ severity: 'error', summary: 'Order Details', detail: 'Received Quentity must be less then or Delivery Order Quentity', life: 4000 });
            }
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
