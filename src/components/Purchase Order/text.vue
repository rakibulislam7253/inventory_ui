<template>
    <div class="headerSection1">
        <h4>Purchase Order</h4>
    </div>
    <div class="headerSection">
        <div class="flex flex-wrap gap-1">
            <div class="flex align-items-center gap-3 mb-1">
                <label class="font-semibold w-8rem">Purchase Requisition</label>
                <InputText id="Address" size="small" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-1" @change="searchOrderId($event)">
                <label class="font-semibold w-8rem">Order Number</label>
                <InputText id="Address" size="small" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-1">
                <label class="font-semibold w-5rem">Supplier</label>
                <Dropdown v-model="purchaseData.supplier_id" :options="supplierData" optionLabel="suppliers_name" placeholder="Select Supplier" class="w-full md:w-20rem" />
            </div>
            <div class="flex align-items-center gap-3 mb-1">
                <label class="font-semibold w-8rem">Make By</label>
                <InputText id="Address" size="small" v-model="purchaseData.make_by" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-1">
                <label class="font-semibold w-8rem">Delivery Date</label>
                <InputText id="Address" type="date" v-model="purchaseData.delivery_date" size="small" class="flex-auto" autocomplete="off" />
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
            <p>Total Amount: {{ this.GrandPrice }}</p>
            <div style="display: flex; justify-content: flex-end">
                <Button label="Update Order" @click="updateOrdered()" />
                <Button class="ml-3" style="backgroundcolor: " label="Place Order" @click="Ordered()" />
            </div>
        </div>
        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details" :modal="true">
            <div class="">
                <div class="flex align-items-center gap-3 mb-3">
                    <label class="font-semibold w-6rem">Category</label>
                    <Dropdown v-model="product.product_category_id" :options="productCty" optionLabel="category_name" placeholder="Select Product Category" class="w-full md:w-14rem" />
                    <!-- <InputText id="product_category_id" v-model="product.product_category_id" class="flex-auto" autocomplete="off" /> -->
                </div>
                <div class="flex align-items-center gap-3 mb-3">
                    <label class="font-semibold w-6rem">Item</label>
                    <Dropdown v-model="product.product_id" :options="productItem" optionLabel="product_name" placeholder="Select Product " class="w-full md:w-14rem" />
                    <!-- <InputText id="product_id" v-model="product.product_id" class="flex-auto" autocomplete="off" /> -->
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

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button v-if="submitionButton" label="Save" icon="pi pi-check" @click="saveProduct()" />
                <Button v-if="updateButton" label="update" icon="pi pi-check" @click="updateProduct()" />
            </template>
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
import { category_name, fetchData, category_namedToId, product_name } from '../../service/globalApiService';
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
            loading: true,
            productDialog: false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            updateButton: false,
            submitionButton: false,
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
            console.log(this.supplierData);
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
        searchOrderId(event) {
            this.GetsearchOrderId = true;
            console.log(event.target.value);
            purchaseOrderData.get_purchase_orders_details(event.target.value).then(async (res) => {
                console.log(res.data);
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
            });
        },
        saveProduct() {
            this.submitted = true;
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
            if (this.products.length) {
                for (let i = 0; i < this.products.length; i++) {
                    this.count = this.count + this.products[i].total_amount;
                }
                this.purchaseData.total_amount = this.count;
                this.purchaseData.supplier_id = this.purchaseData.supplier_id.suppliers_id;
                this.productDetailsModule.make_by = this.purchaseData.make_by;
                purchaseOrderData.create_purchase_order(this.purchaseData).then(async (res) => {
                    this.orderCreationId = res.data.result_id; //genarate order ID

                    // -----------------------------order details-----------------------------
                    if (this.orderCreationId) {
                        for (let i = 0; i < this.products.length; i++) {
                            this.productDetailsModule.order_id = this.orderCreationId;
                            this.productDetailsModule.product_category_id = this.products[i].product_category_id.category_id;
                            this.productDetailsModule.product_id = this.products[i].product_id.product_id;

                            // this.productDetailsModule.product_id = this.products[i].product_id.product_id;
                            // console.log(this.result[0].product_name);
                            this.productDetailsModule.order_quantity = this.products[i].order_quantity;
                            this.productDetailsModule.requisition_quantity = this.products[i].requisition_quantity;
                            this.productDetailsModule.unit_price = this.products[i].unit_price;
                            this.productDetailsModule.total_amount = this.products[i].total_amount;
                            this.detailspush.push({ ...this.productDetailsModule }); //array of object creation
                        }
                        console.log(this.detailspush);
                        // order details successfully
                        purchaseOrderData.create_purchase_order_details(this.detailspush).then((res) => {
                            if (res.data.result_id) {
                                this.$toast.add({ severity: 'success', summary: 'Order Details', detail: 'Successful Order', life: 3000 });
                                this.productDetailsModule.loadModel('');
                                this.purchaseData.loadModel('');
                                this.products = [];
                                location.reload();
                            } else {
                                this.$toast.add({ severity: 'error', summary: 'Order Details', detail: 'Same Cetagory or Item  ID!', life: 3000 });
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
        async updateOrdered() {
            console.log(this.products);
            for (let i = 0; i < this.products.length; i++) {
                this.productDetailsModule.order_id = this.products[i].order_id;
                this.productDetailsModule.product_category_id = this.products[i].product_category_id;
                //
                this.result = await category_namedToId(this.productDetailsModule.product_category_id);
                console.log(this.result);
                this.productDetailsModule.product_category_id = this.result[0].category_id;
                //
                this.productDetailsModule.product_id = this.products[i].product_id;
                this.result = await product_name(this.productDetailsModule.product_id);

                this.productDetailsModule.product_id = this.result[0].product_id;
                this.productDetailsModule.order_quantity = this.products[i].order_quantity;
                this.productDetailsModule.requisition_quantity = this.products[i].requisition_quantity;
                this.productDetailsModule.unit_price = this.products[i].unit_price;
                this.productDetailsModule.total_amount = this.products[i].total_amount;
                this.detailspush.push({ ...this.productDetailsModule }); //array of object creation
            }
            console.log(this.detailspush);
            purchaseOrderData.create_purchase_order_details(this.detailspush).then((res) => {
                console.log(res.data);
                if (res.data.result_id) {
                    this.$toast.add({ severity: 'success', summary: 'Update Order', detail: 'Update Successful', life: 3000 });
                    this.productDetailsModule.loadModel('');
                    this.purchaseData.loadModel('');
                    this.products = [];
                    // location.reload();
                } else {
                    this.$toast.add({ severity: 'error', summary: 'Order Details', detail: 'Same Cetagory or Item  ID!', life: 3000 });
                }
            });
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
        // deleteSelectedProducts() {
        //     this.products = this.products.filter((val) => !this.selectedProducts.includes(val));
        //     this.deleteProductsDialog = false;
        //     this.selectedProducts = null;
        //     this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        // },
        initFilters() {
            this.filters = {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS }
            };
        },
        // getReload(PermissionData) {
        //     console.log('come from child to parent data ', PermissionData.mydata);
        //     this.customers.push(PermissionData.mydata);
        //     console.log(this.customers);
        // },
        // editUnit(PermissionData) {
        //     this.visible = true;
        //     console.log('selection data: ', PermissionData);
        //     this.$refs.PermissionData.updatePermission(PermissionData);
        // },
        // addUnit() {
        //     // this.visible = true;
        //     console.log('Add data');
        //     this.$refs.PermissionData.updatePermission(PermissionData);
        // },
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
