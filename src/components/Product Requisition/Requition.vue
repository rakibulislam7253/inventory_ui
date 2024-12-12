<template>
    <div class="headerSection1">
        <h4>Product Requisition</h4>
    </div>
    <div class="headerSection">
        <div class="flex flex-wrap gap-1">
            <div class="flex align-items-center gap-3 mb-1" @change="searchRequisitionId($event)">
                <label class="font-semibold w-10rem">Requisition Number</label>
                <InputText id="Address" size="small" class="flex-auto" autocomplete="off" />
            </div>
            <!-- <div class="flex align-items-center gap-3 mb-1 ml-3">
                <label class="font-semibold w-5rem">Branch</label>
                <Dropdown :options="branchs" optionLabel="name" v-model="productRequisition." placeholder="Select Branch" class="w-full md:w-15rem" />
            </div> -->
            <div class="flex align-items-center gap-3 mb-1 ml-3">
                <label class="font-semibold w-6rem">WareHouse</label>
                <Dropdown :options="warehouseData" optionLabel="warehouse_name" v-model="productRequisition.warehouse_id" placeholder="Select Branch" class="w-full md:w-15rem" />
            </div>
            <div class="flex align-items-center gap-3 mb-1 ml-3">
                <label class="font-semibold w-5rem">Make By</label>
                <InputText id="Address" size="small" v-model="productRequisition.make_by" class="flex-auto" autocomplete="off" />
            </div>
            <!--<div class="flex align-items-center gap-3 mb-1 ml-3">
                <label class="font-semibold w-7rem">Delivery Date</label>
                <InputText id="Address" type="date" v-model="productRequisition.delivery_date" size="small" class="flex-auto" autocomplete="off" />
            </div> -->
            <div class="flex align-items-center gap-3 mb-1">
                <label class="font-semibold w-10rem">Tentative Date</label>
                <InputText id="Address" type="date" v-model="productRequisition.tntv_dlvry_date" size="small" class="flex-auto" autocomplete="off" />
            </div>
        </div>
    </div>
    <div>
        <div class="card">
            <DataTable
                ref="dt"
                v-model:selection="selectedProducts"
                :value="products"
                dataKey="id"
                :paginator="true"
                :rows="10"
                :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            >
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <Toolbar class="mb-2">
                            <template #start>
                                <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                            </template>
                        </Toolbar>
                    </div>
                </template>
                <div v-if="GetsearchOrderId">
                    <!-- <Column field="product_category_id" header="Branch / Division" sortable style="min-width: 12rem"></Column> -->
                    <Column field="product_category_id" header="Category" sortable style="min-width: 12rem"></Column>
                    <Column field="product_id" header="Item Name" sortable style="min-width: 8rem"></Column>
                    <!-- <Column field="unit_price" header="Unit Of Price" sortable style="min-width: 10rem"></Column> -->
                    <Column field="requisition_quantity" header="Requisition Quentity" sortable style="min-width: 10rem"></Column>
                    <!-- <Column field="order_quantity" header="Order Quentity" sortable style="min-width: 10rem"></Column> -->
                    <!-- <Column field="total_amount" header="Total Amount" sortable style="min-width: 10rem"></Column> -->
                    <Column :exportable="false" header="Action" style="min-width: 12rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
                            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                    </Column>
                </div>
                <div v-else>
                    <!-- <Column field="product_category_id.category_name" header="Branch / Division" sortable style="min-width: 12rem"></Column> -->
                    <Column field="product_category_id.category_name" header="Category" sortable style="min-width: 12rem"></Column>
                    <Column field="product_id.product_name" header="Item Name" sortable style="min-width: 8rem"></Column>
                    <!-- <Column field="unit_price" header="Unit Of Price" sortable style="min-width: 10rem"></Column> -->
                    <!-- <Column field="requisition_quantity" header="Requisition Quentity" sortable style="min-width: 10rem"></Column> -->
                    <Column field="requisition_quantity" header="Requisition Quantity" sortable style="min-width: 10rem"></Column>
                    <!-- <Column field="total_amount" header="Total Amount" sortable style="min-width: 10rem"></Column> -->
                    <Column :exportable="false" header="Action" style="min-width: 12rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
                            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                    </Column>
                </div>
            </DataTable>
            <!-- <p>Total Amount: {{ this.GrandPrice }}</p> -->
            <div style="display: flex; justify-content: flex-end">
                <Button v-if="updateOrder" label="Update Order" @click="updateOrdered()" />
                <Button v-if="placeOrder" class="ml-3" style="backgroundcolor: " label="Place Order" @click="Ordered()" />
                <!-- <Button label="Update Order" @click="updateOrdered()" /> -->
                <!-- <Button class="ml-3" style="backgroundcolor: " label="Place Order" @click="Orderedtest()" /> -->
            </div>
        </div>
        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details" :modal="true">
            <div class="">
                <!-- <div class="flex align-items-center gap-3 mb-3">
                    <label class="font-semibold w-8rem">Branch/Division</label>
                    <Dropdown v-model="product.product_id" :options="productItem" optionLabel="product_name" placeholder="Select Product " class="w-full md:w-14rem" />
                    
                </div> -->
                <div class="flex align-items-center gap-3 mb-3">
                    <label class="font-semibold w-8rem">Category</label>
                    <Dropdown v-model="product.product_category_id" :options="productCty" optionLabel="category_name" placeholder="Select Product Category" class="w-full md:w-14rem" />
                    <!-- <InputText id="product_category_id" v-model="product.product_category_id" class="flex-auto" autocomplete="off" /> -->
                </div>
                <div class="flex align-items-center gap-3 mb-3">
                    <label class="font-semibold w-8rem">Item</label>
                    <Dropdown v-model="product.product_id" :options="productItem" optionLabel="product_name" placeholder="Select Product " class="w-full md:w-14rem" />
                    <!-- <InputText id="product_id" v-model="product.product_id" class="flex-auto" autocomplete="off" /> -->
                </div>
                <!-- <div class="flex align-items-center gap-3 mb-3">
                    <label class="font-semibold w-8rem">Unit of Price</label>
                    <InputText id="unit_price" type="number" v-model.number="product.unit_price" class="flex-auto" autocomplete="off" />
                </div> -->
                <div class="flex align-items-center gap-3 mb-3">
                    <label class="font-semibold w-8rem">Order Quantity</label>
                    <InputText id="requisition_quantity" type="number" v-model.number="product.requisition_quantity" class="flex-auto" autocomplete="off" />
                </div>

                <!-- <div class="flex align-items-center gap-3 mb-3">
                    <label class="font-semibold w-8rem">Total Amount</label>
                    <InputText id="total_amount" type="number" disabled :value="sum" v-model="product.total_amount" class="flex-auto" autocomplete="off" />
                </div> -->
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button v-if="submitionButton" label="Save" icon="pi pi-check" @click="saveProduct()" />
                <Button v-if="updateButton" label="update" icon="pi pi-check" @click="updateProduct()" />
            </template>
        </Dialog>
        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product"
                    >Are you sure you want to delete <b>{{ product.name }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="deleteProduct()" />
            </template>
        </Dialog>
    </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import { CustomerService } from '../../service/servicesData';
import { ProductService } from '../../service/crudData';
import warehouse from '../../service/warehouseData';
import productRequisition from '../../models/productRequisition';
import requsitionDetailsData from '../../models/productRequsitionDetails';
import productCategoryService from '../../service/productCategory';
// import purchaseOrderData from '../../service/purchaseOrder';
import product_requisition from '../../service/productRequsition';
import itemService from '../../service/item';
import GlobalFunctions from '../../common/GlobalFunction';
import { category_name, fetchData, category_namedToId, product_name } from '../../service/globalApiService';
export default {
    data() {
        return {
            requsitionDetailsModule: new requsitionDetailsData(),
            productRequisition: new productRequisition(),
            GetsearchOrderId: false,
            NotGetsearchOrderId: false,
            visible: false,
            customers: null,
            // icondisplay: null,
            date: null,
            selectedProducts: null,
            warehouseData: '',
            productCty: '',
            productItem: '',
            GrandPrice: '',
            products: [],
            detailspush: [],
            requsitionCreationId: [],
            totalCount: [],
            submitted: false,
            placeOrder: false,
            updateOrder: false,
            loading: true,
            productDialog: false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            updateButton: false,
            submitionButton: false,
            product: {},
            filters: {},
            count: 0,
            totalPrice: 0,
            update: ''
        };
    },
    created() {
        this.initFilters();
    },
    computed: {
        sum() {
            return this.product.unit_price * this.product.order_quantity;
        }
    },
    mounted() {
        ProductService.getProducts().then((data) => (this.products = data));
        CustomerService.getCustomersMedium().then((data) => {
            this.customers = this.getCustomers(data);
            this.loading = false;
        });
        warehouse.get_all_warehouse_info().then((data) => {
            this.warehouseData = this.getCustomers(data.data);
            console.log(this.warehouseData);
            this.loading = false;
        });
        productCategoryService.get_all_product_category().then((res) => {
            this.productCty = res.data;
            console.log(this.productCty);
        });
        itemService.get_all_product_details().then((data) => {
            this.productItem = data.data;
            console.log(this.productItem);
        });
    },
    methods: {
        searchRequisitionId(event) {
            this.GetsearchOrderId = true;
            console.log(event.target.value);
            product_requisition.get_product_requisition(event.target.value).then(async (res) => {
                console.log(res.data);

                if (res.data.length != 0) {
                    this.update = 1;
                    this.productRequisition.loadModel(res.data[0]);
                    console.log(this.productRequisition);
                    product_requisition.get_requisition_details(event.target.value).then(async (res) => {
                        console.log(res.data);
                        if (res.data.length != 0) {
                            this.updateOrder = true;
                            this.placeOrder = false;

                            this.product = res.data;
                            for (let i = 0; i < this.product.length; i++) {
                                console.log(this.product[i].product_category_id);
                                this.products.push(this.product[i]);

                                // product Id to product name
                                this.result = await fetchData(this.product[i].product_id);
                                this.products[i].product_id = this.result[0].product_name;

                                // category Id to category name
                                this.result = await category_name(this.product[i].product_category_id);
                                this.products[i].product_category_id = this.result[0].category_name;
                            }
                            let sum = 0;
                            for (let i = 0; i < this.products.length; i++) {
                                sum = sum + this.products[i].total_amount;
                                this.GrandPrice = sum;
                            }
                        } else {
                            this.$toast.add({ severity: 'error', summary: 'Requisition Details', detail: 'UnAuthorize!', life: 3000 });
                        }
                    });
                } else {
                    this.$toast.add({ severity: 'error', summary: 'Requisition ID', detail: 'UnAuthorize!', life: 3000 });
                }
            });
        },
        saveProduct() {
            this.submitted = true;
            this.placeOrder = true;
            this.products.push(this.product);
            console.log(this.products);
            this.productDialog = false;
            // this.product.total_amount = this.sum;
            // this.totalPrice = this.totalPrice + this.sum; //Grand price calculation
            // this.totalCount.push(this.totalPrice);
            // console.log(this.totalCount);
            // this.GrandPrice = this.totalCount[this.totalCount.length - 1];
            // let sum = 0;
            // for (let i = 0; i < this.products.length; i++) {
            //     // console.log(this.products[i].total_amount);
            //     sum = sum + this.products[i].total_amount;
            //     console.log('sum', sum);
            //     this.GrandPrice = sum;
            // }
        },
        updateProduct() {
            this.submitted = true;
            // console.log(updateData);
            // this.product.total_amount = this.sum;
            // this.totalPrice = this.totalPrice + this.sum; //Grand price calculation
            // this.totalCount.push(this.totalPrice);
            // console.log(this.totalCount);
            console.log(this.product);
            this.products[this.findIndexById(this.product)] = this.product;
            // let sum = 0;
            // for (let i = 0; i < this.products.length; i++) {
            //     console.log(this.products[i].total_amount);
            //     sum = sum + this.products[i].total_amount;
            //     console.log('sum', sum);
            //     this.GrandPrice = sum;
            // }
            console.log(this.products);
            this.productDialog = false;
        },
        Ordered() {
            // this.productRequisition.status_id="1";
            console.log(this.productRequisition);
            this.productRequisition.warehouse_id = this.productRequisition.warehouse_id.warehouse_id;

            let time = GlobalFunctions.formatDate(this.productRequisition.tntv_dlvry_date);
            this.productRequisition.tntv_dlvry_date = time;
            console.log(this.productRequisition);
            if (this.productRequisition.warehouse_id) {
                // -----------------------------requisition create-------------------------
                product_requisition.create_product_requisition(this.productRequisition).then((res) => {
                    console.log('Orderedtest', res.data);
                    this.requsitionCreationId = res.data.result_id;
                    if (res.data.result_id) {
                        for (let i = 0; i < this.products.length; i++) {
                            this.requsitionDetailsModule.requisition_id = this.requsitionCreationId;
                            this.requsitionDetailsModule.queue_id = res.data.result_guid;
                            this.requsitionDetailsModule.product_category_id = this.products[i].product_category_id.category_id;
                            this.requsitionDetailsModule.product_id = this.products[i].product_id.product_id;
                            this.requsitionDetailsModule.requisition_quantity = this.products[i].requisition_quantity;
                            this.requsitionDetailsModule.last_action = '1';
                            this.detailspush.push({ ...this.requsitionDetailsModule }); //array of object creation
                        }
                        console.log(this.detailspush);
                    }
                    // -----------------------------requisition details----------------------------
                    product_requisition.create_requisition_details(this.detailspush).then((res) => {
                        console.log(res.data);
                        if (res.data.result_id) {
                            this.requsitionDetailsModule.loadModel('');
                            this.productRequisition.loadModel('');
                            this.products = [];
                            // location.reload();
                            this.$toast.add({ severity: 'success', summary: 'Requisition Details', detail: 'Successful Order', life: 3500 });
                        } else {
                            this.$toast.add({ severity: 'error', summary: 'Requisition Details', detail: res.data.error_msg, life: 3000 });
                        }
                    });
                });
            } else {
                this.$toast.add({ severity: 'error', summary: 'Select WareHouse', detail: 'Please Select WareHouse !', life: 3000 });
            }
        },
        async updateOrdered() {
            console.log(this.productRequisition);
            if (this.productRequisition.warehouse_id) {
                this.productRequisition.auth_status_id = 'U';
                this.productRequisition.last_action = '2';
                this.productRequisition.auth_1st_by = '';
                this.productRequisition.auth_1st_dt = '';
                this.productRequisition.auth_2nd_by = '';
                this.productRequisition.auth_2nd_dt = '';
                this.productRequisition.delivery_date = '';
                this.productRequisition.priority = '';
                this.productRequisition.receive_status = '';
                this.productRequisition.tntv_dlvry_date = '';
                console.log(this.productRequisition);
                // -----------------------------requisition create-------------------------
                product_requisition.create_product_requisition(this.productRequisition).then(async (res) => {
                    console.log('Orderedtest', res.data);
                    this.requsitionCreationId = res.data.result_id;
                    if (res.data.result_id) {
                        for (let i = 0; i < this.products.length; i++) {
                            console.log(this.products[i]);
                            this.requsitionDetailsModule.requisition_id = this.requsitionCreationId;
                            this.requsitionDetailsModule.queue_id = res.data.result_guid;

                            this.result = await category_namedToId(this.products[i].product_category_id);
                            this.requsitionDetailsModule.product_category_id = this.result[0].category_id;
                            //product name to id

                            this.result = await product_name(this.products[i].product_id);
                            this.requsitionDetailsModule.product_id = this.result[0].product_id;

                            // this.requsitionDetailsModule.product_id = this.products[i].product_id;
                            this.requsitionDetailsModule.requisition_quantity = this.products[i].requisition_quantity;
                            this.requsitionDetailsModule.last_action = '2';
                            this.requsitionDetailsModule.auth_status_id = 'U';
                            this.detailspush.push({ ...this.requsitionDetailsModule }); //array of object creation
                        }
                        console.log(this.detailspush);
                    }
                    // -----------------------------requisition details----------------------------
                    product_requisition.create_requisition_details(this.detailspush).then((res) => {
                        console.log(res.data);
                        if (res.data.result_id) {
                            this.requsitionDetailsModule.loadModel('');
                            this.productRequisition.loadModel('');
                            this.products = [];
                            // location.reload();
                            this.$toast.add({ severity: 'success', summary: 'Requisition Details', detail: 'Successful Order', life: 3500 });
                        } else {
                            this.$toast.add({ severity: 'error', summary: 'Requisition Details', detail: res.data.error_msg, life: 3000 });
                        }
                    });
                });
            } else {
                this.$toast.add({ severity: 'error', summary: 'Select WareHouse', detail: 'Please Select WareHouse !', life: 3000 });
            }
            // console.log(this.products);
            // for (let i = 0; i < this.products.length; i++) {
            //     this.productDetailsModule.order_id = this.products[i].order_id;
            //     this.productDetailsModule.product_category_id = this.products[i].product_category_id;
            //     //category name to id
            //     this.result = await category_namedToId(this.productDetailsModule.product_category_id);
            //     console.log(this.result);
            //     this.productDetailsModule.product_category_id = this.result[0].category_id;
            //     //product name to id
            //     this.productDetailsModule.product_id = this.products[i].product_id;
            //     this.result = await product_name(this.productDetailsModule.product_id);

            //     this.productDetailsModule.product_id = this.result[0].product_id;
            //     this.productDetailsModule.order_quantity = this.products[i].order_quantity;
            //     this.productDetailsModule.requisition_quantity = this.products[i].requisition_quantity;
            //     this.productDetailsModule.unit_price = this.products[i].unit_price;
            //     this.productDetailsModule.total_amount = this.products[i].total_amount;
            //     this.detailspush.push({ ...this.productDetailsModule }); //array of object creation
            // }
            // console.log(this.detailspush);
            // purchaseOrderData.create_purchase_order_details(this.detailspush).then((res) => {
            //     console.log(res.data);
            //     if (res.data.result_id) {
            //         this.$toast.add({ severity: 'success', summary: 'Update Order', detail: 'Update Successful', life: 3000 });
            //         this.productDetailsModule.loadModel('');
            //         this.purchaseData.loadModel('');
            //         this.products = [];
            //         // location.reload();
            //     } else {
            //         this.$toast.add({ severity: 'error', summary: 'Order Details', detail: 'Same Cetagory or Item  ID!', life: 3000 });
            //     }
            // });
            // this.$toast.add({ severity: 'error', summary: 'Order Creation Id', detail: 'Create Order ID!', life: 3000 });
        },

        formatCurrency(value) {
            if (value) return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            return;
        },
        openNew() {
            console.log(this.product);
            this.product = {};
            // this.product.loadModel("");
            this.placeOrder = true;
            this.updateButton = false;
            this.submitionButton = true;
            this.submitted = false;
            this.productDialog = true;
        },
        hideDialog() {
            this.productDialog = false;
            this.submitted = false;
        },
        editProduct(product) {
            console.log(product);
            this.product = { ...product };
            this.updateButton = true;
            this.submitionButton = false;
            this.productDialog = true;
        },
        confirmDeleteProduct(product) {
            this.product = product;
            // this.tableData.splice(this.product, 1);
            // console.log(this.product);
            // this.product = {};
            this.deleteProductDialog = true;
        },
        deleteProduct() {
            console.log(this.products);
            // this.products = this.products.filter((val) => this.products.splice(val.product_id.product_id, 1));
            // this.products = this.products.filter((val) => val.product_id.product_id !== this.product_id.product_id );
            this.deleteProductDialog = false;
            // this.product = {};
            this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        },
        findIndexById(id) {
            let index = -1;
            // console.log(id.product_category_id.category_id);
            for (let i = 0; i < this.products.length; i++) {
                console.log(this.products[i].product_id);
                if (this.products[i].product_id) {
                    if (this.products[i].product_id === id.product_id) {
                        index = i;
                        break;
                    }
                } else {
                    console.log(this.products[i].product_id.product_id);
                    if (this.products[i].product_id.product_id === id.product_id.product_id) {
                        index = i;
                        break;
                    }
                }
            }

            return index;
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        confirmDeleteSelected() {
            this.deleteProductsDialog = true;
        },

        initFilters() {
            this.filters = {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS }
            };
        },

        getCustomers(data) {
            return [...(data || [])].map((d) => {
                d.date = new Date(d.date);

                return d;
            });
        },
        formatDate(value) {
            return value.toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
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
</style>
