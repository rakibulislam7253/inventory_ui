<template>
    <div class="headerSection1">
        <h4>Dashboard</h4>
    </div>
    <div class="headerSection">
        <div class="flex flex-wrap gap-1">
            <div class="flex align-items-center gap-2 mb-1">
                <label class="font-semibold w-15em">Purchase Requisition</label>
                <InputText id="Address" size="small" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-1">
                <label class="font-semibold w-8rem">Order Number</label>
                <InputText id="Address" size="small" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-1">
                <label class="font-semibold w-6rem">From Date</label>
                <InputText id="Address" type="date" v-model="purchaseData.delivery_date" size="small" class="flex-auto w-full md:w-14rem" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-2 mb-1">
                <label class="font-semibold w-10rem">Category</label>
                <Dropdown v-model="productCty" :options="supplierData" optionLabel="suppliers_name" placeholder="Select Category" class="w-full md:w-14rem" />
            </div>
            <div class="flex align-items-center gap-3 mb-1">
                <label class="font-semibold w-8rem">Delivery Date</label>
                <InputText id="Address" type="date" v-model="purchaseData.delivery_date" size="small" class="flex-auto w-full md:w-14rem" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-1">
                <label class="font-semibold w-6rem">To Date</label>
                <InputText id="Address" type="date" v-model="purchaseData.delivery_date" size="small" class="flex-auto w-full md:w-14rem" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-2 mb-1">
                <label class="font-semibold w-10rem">Supplier</label>
                <Dropdown v-model="purchaseData.supplier_id" :options="supplierData" optionLabel="suppliers_name" placeholder="Select Supplier" class="w-full md:w-14rem" />
            </div>
        </div>
        <div style="margin-left: 40%; margin-top: 3%">
            <Button label="search" severity="search" class="mb-2 mr-5" @click="searchData()" />
            <Button label="Cancel" severity="danger" class="mb-2 mr-2" />
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
                <div v-if="GetsearchOrderId">
                    <Column field="product_category_id" header="Category" sortable style="min-width: 12rem"></Column>
                    <Column field="product_id" header="Item Name" sortable style="min-width: 8rem"></Column>
                    <Column field="unit_price" header="Unit Of Price" sortable style="min-width: 10rem"></Column>
                    <Column field="requisition_quantity" header="Requisition Quentity" sortable style="min-width: 10rem"></Column>
                    <Column field="order_quantity" header="Order Quentity" sortable style="min-width: 10rem"></Column>
                    <Column field="total_amount" header="Total Amount" sortable style="min-width: 10rem"></Column>
                    <Column :exportable="false" header="Action" style="min-width: 12rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
                            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                    </Column>
                </div>
                <div v-else>
                    <Column field="product_category_id.category_name" header="Category" sortable style="min-width: 12rem"></Column>
                    <Column field="product_id.product_name" header="Item Name" sortable style="min-width: 8rem"></Column>
                    <Column field="unit_price" header="Unit Of Price" sortable style="min-width: 10rem"></Column>
                    <Column field="requisition_quantity" header="Requisition Quentity" sortable style="min-width: 10rem"></Column>
                    <Column field="order_quantity" header="Order Quentity" sortable style="min-width: 10rem"></Column>
                    <Column field="total_amount" header="Total Amount" sortable style="min-width: 10rem"></Column>
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
            </div>
        </div>
        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details" :modal="true">
            <div class="">
                <div class="flex align-items-center gap-3 mb-3">
                    <label class="font-semibold w-6rem">Category</label>
                    <Dropdown v-model="product.product_category_id" :options="productCty" optionLabel="category_name" placeholder="Select Product Category" class="w-full md:w-14rem" />
                </div>
                <div class="flex align-items-center gap-3 mb-3">
                    <label class="font-semibold w-6rem">Item</label>
                    <Dropdown v-model="product.product_id" :options="productItem" optionLabel="product_name" placeholder="Select Product " class="w-full md:w-14rem" />
                </div>
                <div class="flex align-items-center gap-3 mb-3">
                    <label class="font-semibold w-6rem">Unit of Price</label>
                    <InputText id="unit_price" type="number" v-model.number="product.unit_price" class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex align-items-center gap-3 mb-3">
                    <label class="font-semibold w-6rem">Order Quantity</label>
                    <InputText id="order_quantity" type="number" v-model.number="product.order_quantity" class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex align-items-center gap-3 mb-3">
                    <label class="font-semibold w-6rem">Requisition Quantity</label>
                    <InputText id="requisition_quantity" type="number" v-model="product.requisition_quantity" class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex align-items-center gap-3 mb-3">
                    <label class="font-semibold w-6rem">Total Amount</label>
                    <InputText id="total_amount" type="number" disabled :value="sum" v-model="product.total_amount" class="flex-auto" autocomplete="off" />
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import { CustomerService } from '../../service/servicesData';
import { ProductService } from '../../service/crudData';
import supplier from '../../service/supplier';
import purchaseData from '../../models/purchaseAdd';
import purchaseDetailsData from '../../models/purchaseDetails';
import productCategoryService from '../../service/productCategory';
import purchaseOrderData from '../../service/purchaseOrder';
import itemService from '../../service/item';
export default {
    data() {
        return {
            productDetailsModule: new purchaseDetailsData(),
            purchaseData: new purchaseData(),
            GetsearchOrderId: false,
            // NotGetsearchOrderId: false,
            visible: false,
            customers: null,
            // icondisplay: null,
            date: null,
            selectedProducts: null,
            supplierData: '',
            productCty: '',
            productItem: '',
            GrandPrice: '',
            products: [],
            detailspush: [],
            orderCreationId: [],
            totalCount: [],
            submitted: false,
            placeOrder: false,
            updateOrder: false,
            loading: true,
            productDialog: false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            updateButton: false,

            product: {},
            filters: {},
            count: 0,
            totalPrice: 0
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
        supplier.get_all_suppliers_info().then((data) => {
            this.supplierData = this.getCustomers(data.data);
            // console.log(this.supplierData);
            this.loading = false;
        });
        productCategoryService.get_all_product_category().then((res) => {
            // console.log(res.data);
            this.productCty = res.data;
            // console.log('this.productCty');
            // console.log(this.productCty);
        });
        itemService.get_all_product_details().then((data) => {
            this.productItem = data.data;
            // console.log(this.productItem);
        });
    },
    methods: {
        searchData() {
            console.log('search data');
        },
        searchOrderId(event) {
            this.GetsearchOrderId = true;
            console.log(event.target.value);
        },
        saveProduct() {
            this.submitted = true;
            this.placeOrder = true;
            this.product.total_amount = this.sum;
            this.totalPrice = this.totalPrice + this.sum; //Grand price calculation
            this.totalCount.push(this.totalPrice);
            console.log(this.totalCount);
            this.GrandPrice = this.totalCount[this.totalCount.length - 1];
            let sum = 0;
            this.products.push(this.product);
            for (let i = 0; i < this.products.length; i++) {
                // console.log(this.products[i].total_amount);
                sum = sum + this.products[i].total_amount;
                console.log('sum', sum);
                this.GrandPrice = sum;
            }
            console.log(this.products);
            this.productDialog = false;
        },
        updateProduct() {
            this.submitted = true;
            // console.log(updateData);
            this.product.total_amount = this.sum;
            this.totalPrice = this.totalPrice + this.sum; //Grand price calculation
            this.totalCount.push(this.totalPrice);
            console.log(this.totalCount);

            this.products[this.findIndexById(this.product)] = this.product;
            let sum = 0;
            for (let i = 0; i < this.products.length; i++) {
                console.log(this.products[i].total_amount);
                sum = sum + this.products[i].total_amount;
                console.log('sum', sum);
                this.GrandPrice = sum;
            }
            // console.log(this.products);
            this.productDialog = false;
        },

        Ordered() {
            // -----------------------------Order create(amount all sum)-----------------------------
            console.log(this.products.length);
            if (this.products.length) {
                for (let i = 0; i < this.products.length; i++) {
                    this.count = this.count + this.products[i].total_amount;
                }
                this.purchaseData.total_amount = this.count;
                this.purchaseData.supplier_id = this.purchaseData.supplier_id.suppliers_id;
                this.productDetailsModule.make_by = this.purchaseData.make_by;
                purchaseOrderData.create_purchase_order(this.purchaseData).then(async (res) => {
                    this.orderCreationId = res.data.result_id; //order ID genarate
                    console.log(res.data);

                    // -----------------------------order details-----------------------------
                    if (this.orderCreationId) {
                        for (let i = 0; i < this.products.length; i++) {
                            this.productDetailsModule.order_id = this.orderCreationId;
                            this.productDetailsModule.product_category_id = this.products[i].product_category_id.category_id;
                            this.productDetailsModule.product_id = this.products[i].product_id.product_id;
                            this.productDetailsModule.order_quantity = this.products[i].order_quantity;
                            this.productDetailsModule.requisition_quantity = this.products[i].requisition_quantity;
                            this.productDetailsModule.unit_price = this.products[i].unit_price;
                            this.productDetailsModule.total_amount = this.products[i].total_amount;
                            this.productDetailsModule.last_action = res.data.status_code;
                            this.productDetailsModule.queue_id = res.data.result_guid;
                            this.detailspush.push({ ...this.productDetailsModule }); //array of object creation
                        }
                        console.log(this.detailspush);
                        // order details successfully
                        purchaseOrderData.create_purchase_order_details(this.detailspush).then((res) => {
                            console.log(res.data);
                            if (res.data.result_id) {
                                this.$toast.add({ severity: 'success', summary: 'Order Details', detail: 'Successful Order', life: 3000 });
                                this.productDetailsModule.loadModel('');
                                this.purchaseData.loadModel('');
                                this.products = [];
                                // location.reload();
                            } else {
                                this.$toast.add({ severity: 'error', summary: 'Order Details', detail: 'Same Item  ID!', life: 3000 });
                            }
                        });
                    } else {
                        this.$toast.add({ severity: 'error', summary: 'Order Creation Id', detail: 'Response not found!', life: 3000 });
                    }
                });
            } else {
                this.$toast.add({ severity: 'error', summary: 'Order Creation Id', detail: 'Create Order ID!', life: 3000 });
            }
        },

        formatCurrency(value) {
            if (value) return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            return;
        },
        openNew() {
            console.log(this.product);
            this.product = {};
            this.updateButton = false;
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
            this.productDialog = true;
        },
        confirmDeleteProduct(product) {
            this.product = product;
            this.deleteProductDialog = true;
        },
        deleteProduct() {
            this.products = this.products.filter((val) => val.id !== this.product.id);
            this.deleteProductDialog = false;
            this.product = {};
            this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        },
        findIndexById(id) {
            let index = -1;
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
    height: 220px;
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
