<template>
    <div class="headerSection1">
        <h4>Product Return And Adjustment</h4>
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
                <InputText id="Address" v-model="products.make_by" size="small" class="flex-auto" autocomplete="off" />
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
                <!-- <template #editor="{ data }">
                    <InputNumber v-model="data.receive_quantity" />
                </template> -->
            </Column>
            <Column field="return_quantity" header="Return Quantity" style="width: 20%">
                <template #body="{ data }">
                    {{ data.return_quantity }}
                </template>
                <!-- <template #editor="{ data }">
                    <InputNumber v-model="data.return_quantity" />
                </template> -->
            </Column>
            <Column field="return_quantity" header="Return Amount" style="width: 20%">
                <template #body="{ data }">
                    {{ data.return_amount }}
                </template>
                <!-- <template #editor="{ data }">
                    <InputNumber v-model="data.return_quantity" />
                </template> -->
            </Column>
            <Column field="issue_amount" header="Total Price" style="width: 20%">
                <template #body="{ data }">
                    {{ data.receive_amount }}
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
            <Button v-if="submitionButton" style="width: auto" icon="pi pi-check" label="Acknowledged" @click="acknowledged()" />
            <Button v-if="submitionButton" style="width: auto" icon="pi pi-times" label="Cancel" @click="cancel()" />
        </div>
    </div>
</template>

<script>
import productIssue from '../../service/productRequsition';
// import requsitionIssue from '../../models/requsition_Issue';
// import requsitionIssueReceive from '../../models/requsition_Issue_receive';
import requsition_product_adjustment from '../../models/requsition_product_adjustment';
import { fetchData, product_name } from '../../service/globalApiService';

export default {
    data() {
        return {
            // Issuerequsition: new requsitionIssue(),
            // requsitionIssueReceive: new requsitionIssueReceive(),
            requsition_product_adjustment: new requsition_product_adjustment(),

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

            productIssue.get_requisition_receive(event.target.value).then(async (res) => {
                console.log(res.data);
                this.product = res.data;
                for (let i = 0; i < this.product.length; i++) {
                    this.products.push(this.product[i]);
                    console.log('products', this.products);
                    // product Id to product name
                    this.result = await fetchData(this.product[i].product_id);
                    this.products[i].product_id = this.result[0].product_name;
                    console.log(this.products[i].product_id);
                    this.submitionButton = true;
                }
            });
        },
        async acknowledged() {
            console.log(this.products);
            for (let i = 0; i < this.products.length; i++) {
                console.log(this.products[i]);

                //product name to id
                console.log(this.products[i].product_id);
                this.requsition_product_adjustment.loadModel(this.products[i]);
                this.result = await product_name(this.products[i].product_id);
                console.log(this.result[0].product_id);
                this.requsition_product_adjustment.product_id = this.result[0].product_id;
                // console.log(this.requsition_product_adjustment);

                this.requsition_product_adjustment.adjustment_id = '';
                this.requsition_product_adjustment.last_action = '1';
                this.requsition_product_adjustment.auth_1st_by = '';
                this.requsition_product_adjustment.auth_1st_dt = '';
                this.requsition_product_adjustment.auth_2nd_by = '';
                this.requsition_product_adjustment.auth_2nd_dt = '';
                this.requsition_product_adjustment.receive_id = '';
                this.requsition_product_adjustment.receive_status = '';
                this.requsition_product_adjustment.remarks = '';
                this.requsition_product_adjustment.status = '';
                this.requsition_product_adjustment.issue_amount = 0;
                // // console.log(this.requsitionIssueReceive);
                this.detailspush.push({ ...this.requsition_product_adjustment });
            }
            console.log(this.detailspush);
            // create_requisition_receive
            productIssue.create_requisition_product_adjustment(this.detailspush).then(async (res) => {
                // console.log(res.data);
                if (res.data.result_id) {
                    this.$toast.add({ severity: 'success', summary: 'Product Received', detail: 'Successful Product Received', life: 3000 });
                    this.products = '';
                    // location.reload();
                } else {
                    this.$toast.add({ severity: 'error', summary: 'Order Details', detail: 'Request Already Existing', life: 3000 });
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

            newData.return_quantity = newData.issue_quantity - newData.receive_quantity;
            this.unitPrice = this.product[index].issue_amount / newData.issue_quantity;
            console.log(this.unitPrice);
            newData.issue_amount = this.unitPrice * newData.receive_quantity;

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
