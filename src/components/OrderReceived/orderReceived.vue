<template>
    <div class="headerSection1">
        <h4>Order Receive</h4>
    </div>
    <div class="headerSection">
        <div class="flex flex-wrap gap-1">
            <div class="flex align-items-center gap-3 mb-1">
                <label class="font-semibold w-8rem">Branch/Division</label>
                <InputText id="Address" value="PO2024073100002" size="small" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-1 ml-2" @change="searchOrderId($event)">
                <label class="font-semibold w-8rem">Order Number</label>
                <InputText id="Address" size="small" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-1 ml-2">
                <label class="font-semibold w-5rem">Supplier</label>
                <InputText id="Address" v-model="orderReceiveData.supplier_id" size="small" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-1">
                <label class="font-semibold w-8rem">Order Date</label>
                <InputText id="Address" v-model="orderReceiveData.order_date" size="small" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-1 ml-2">
                <label class="font-semibold w-8rem">Created By</label>
                <InputText id="Address" v-model="orderReceiveData.make_by" size="small" class="flex-auto" autocomplete="off" />
            </div>
            <br />
        </div>
    </div>
    <div class="card p-fluid p-5">
        <br />
        <!-- <p>{{ this.purchaseReceive.product_name }}</p> -->
        <!-- <p>{{ result }}</p> -->
        <DataTable v-model:editingRows="editingRows" :value="products" editMode="row" dataKey="id" @row-edit-save="onRowEditSave">
            <Column field="product_id" header="Item Name" style="width: 20%">
                <template #body="{ data }">
                    {{ data.product_id }}
                </template>
            </Column>
            <Column field="order_quantity" header="Unit Price" style="width: 20%">
                <template #body="{ data }">
                    {{ data.receive_unit_price }}
                </template>
            </Column>
            <Column field="order_quantity" header="Order Quantity" style="width: 20%">
                <template #body="{ data }">
                    {{ data.order_quantity }}
                </template>
            </Column>
            <Column field="Received_quantity" header="Received Quantity" style="width: 20%">
                <template #body="{ data }">
                    {{ data.receive_quantity }}
                </template>
                <template #editor="{ data }">
                    <InputNumber v-model="data.receive_quantity" />
                </template>
            </Column>
            <Column field="Returned Quantity" header="Returned Quantity" style="width: 20%">
                <template #body="{ data }">
                    {{ data.return_quantity }}
                </template>
                <!-- <template #editor="{ data, field }">
                    <InputNumber v-model="data[field]" mode="currency" currency="BDT" locale="en-US" />
                </template> -->
            </Column>
            <Column field="remarks" header="Remarks" style="width: 20%">
                <template #body="{ data }">
                    {{ data.remarks }}
                </template>
                <template #editor="{ data }">
                    <InputText v-model="data.remarks" style="width: 150%" />
                </template>
            </Column>
            <Column field="price" header="Return Price" style="width: 20%">
                <template #body="{ data }">
                    {{ formatCurrency(data.return_amount) }}
                </template>
            </Column>
            <Column field="price" header="Receive Price" style="width: 20%">
                <template #body="{ data }">
                    {{ formatCurrency(data.receive_amount) }}
                </template>
                <!-- <template #editor="{ data }">
                    <InputNumber v-model="data.total_amount" mode="currency" currency="USD" locale="en-US" />
                </template> -->
            </Column>
            <Column header="Action" :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
        </DataTable>
        <div v-if="submitionButton">
            <!-- <div style="margin-left: 18%" class="mt-4">
                <h6>Remarks:</h6>
                <Textarea style="margin-top: -10px" v-model="products.remarks" placeholder="Your Message" :autoResize="true" rows="2" cols="40" />
            </div> -->
            <div class="flex justify-content-evenly mt-5">
                <Button style="width: auto; margin-top: -10px" icon="pi pi-check" label="Received" @click="ordered()" />
            </div>
        </div>
    </div>
</template>

<script>
// import productIssue from '../../service/productRequsition';
import productdetails from '../../service/purchaseOrder';
import orderReceiveData from '../../models/orderReceived';
import purchaseReceive from '../../models/createPurchaseReceiveDetails';
import { fetchData } from '../../service/globalApiService';
import { supplierData, product_name } from '../../service/globalApiService';
export default {
    data() {
        return {
            orderReceiveData: new orderReceiveData(),
            purchaseReceive: new purchaseReceive(),
            submitionButton: false,
            products: [],
            editingRows: [],
            purchase: '',
            purchaseData: [],
            detailspush: [],
            supplierName: '',
            result: '',
            param1: 'PROD00001',
            statuses: [
                { label: 'In Stock', value: 'INSTOCK' },
                { label: 'Low Stock', value: 'LOWSTOCK' },
                { label: 'Out of Stock', value: 'OUTOFSTOCK' }
            ]
        };
    },

    methods: {
        async searchOrderId(event) {
            console.log(event.target.value);

            productdetails.get_order_details_by_id(event.target.value).then(async (data) => {
                console.log(data.data);
                this.orderReceiveData.loadModel(data.data);
                console.log(this.orderReceiveData.purchase_order_details);
                if (this.orderReceiveData.order_id) {
                    this.submitionButton = true;
                }
                if (this.orderReceiveData.purchase_order_details.length) {
                    // supplier id to supplier name function
                    this.supplierName = await supplierData(this.orderReceiveData.supplier_id);
                    this.orderReceiveData.supplier_id = this.supplierName[0].suppliers_name;
                    console.log(this.supplierName[0].suppliers_name);
                    this.purchase = this.orderReceiveData.purchase_order_details;

                    for (let i = 0; i < this.purchase.length; i++) {
                        console.log(this.purchase[i]);
                        this.purchaseReceive.order_id = this.purchase[i].order_id;
                        this.purchaseReceive.product_id = this.purchase[i].product_id;
                        // product id to product name function
                        this.result = await fetchData(this.purchaseReceive.product_id);
                        this.purchaseReceive.product_id = this.result[0].product_name;
                        this.purchaseReceive.receive_unit_price = this.purchase[i].unit_price;
                        this.purchaseReceive.order_quantity = this.purchase[i].order_quantity;
                        // this.purchaseReceive.receive_quantity = 20;
                        console.log(this.purchaseReceive.receive_quantity);
                        // this.purchaseReceive.return_quantity = this.purchaseReceive.order_quantity - this.purchaseReceive.receive_quantity;
                        this.purchaseReceive.receive_amount = this.purchase[i].total_amount;
                        this.products.push({ ...this.purchaseReceive });
                    }
                } else {
                    this.$toast.add({ severity: 'error', summary: 'Unauthorization', detail: 'Order Details Unauthorized', life: 3500 });
                }
            });
        },

        async ordered() {
            // console.log(this.purchaseReceive);
            console.log(this.products);
            // for(let i = 0; i < this.products.length; i++) {

            // }
            for (let i = 0; i < this.products.length; i++) {
                this.purchaseReceive.order_id = this.products[i].order_id;
                this.purchaseReceive.product_id = this.products[i].product_id;
                this.result = await product_name(this.purchaseReceive.product_id);
                this.purchaseReceive.product_id = this.result[0].product_id;
                console.log(this.purchaseReceive.product_id);
                this.purchaseReceive.order_quantity = this.products[i].order_quantity;
                this.purchaseReceive.receive_quantity = this.products[i].receive_quantity;
                this.purchaseReceive.receive_amount = this.products[i].receive_amount;
                this.purchaseReceive.return_quantity = this.products[i].return_quantity;
                this.purchaseReceive.return_amount = this.products[i].return_amount;
                this.purchaseReceive.receive_unit_price = this.products[i].receive_unit_price;
                this.purchaseReceive.total_amount = this.products[i].receive_amount;
                this.purchaseReceive.last_action = '1';
                // this.purchaseReceive.last_action = ;
                this.detailspush.push({ ...this.purchaseReceive }); //array of object creation
            }
            console.log(this.detailspush);
            productdetails.create_purchase_receive_details(this.detailspush).then((data) => {
                console.log(data.data);

                if (data.data.result_id) {
                    this.$toast.add({ severity: 'success', summary: 'Purchase Receive Details', detail: 'Successful Order Receive', life: 3000 });
                    this.orderReceiveData.loadModel('');
                    this.purchaseReceive.loadModel('');
                    this.products = [];
                    // location.reload();
                } else {
                    this.$toast.add({ severity: 'error', summary: 'Order Details', detail: ' Product Already Received', life: 3000 });
                }
            });
        },
        onRowEditSave(event) {
            console.log(event);
            let { newData, index } = event;
            if (newData.order_quantity >= newData.receive_quantity) {
                if (newData.receive_quantity != 0) {
                    let returnQuantity = newData.order_quantity - newData.receive_quantity;
                    let returnPrice = returnQuantity * newData.receive_unit_price;
                    let receivePrice = newData.receive_quantity * newData.receive_unit_price;
                    newData.receive_amount = receivePrice;
                    newData.return_quantity = returnQuantity;
                    newData.return_amount = returnPrice;
                }
            } else {
                this.$toast.add({ severity: 'error', summary: 'Order Creation Id', detail: 'Received Quentity must be lessthen or equal Order Quentity', life: 4000 });
                newData.receive_quantity = newData.order_quantity;
            }
            // console.log(multy);

            console.log(newData);
            this.products[index] = newData;
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'BDT' }).format(value);
        }
    }
};
</script>
<style scoped>
.headerSection {
    background-color: #e2e8f0;
    padding: 20px;
    padding-left: 45px;
    height: 100px;
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
.p-fluid .p-inputtextarea {
    width: 68%;
}
</style>
