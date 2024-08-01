<template>
    <p>Requisition id order by requation product details.</p>
    <div class="headerSection1">
        <h4>Product Issue</h4>
    </div>
    <div class="headerSection">
        <div class="flex flex-wrap gap-1">
            <div class="flex align-items-center gap-3 mb-1">
                <label class="font-semibold w-8rem">Branch/Division</label>
                <InputText id="Address" size="small" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-1 ml-2">
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
        <Button type="button" icon="pi pi-search" label="search" style="width: 10%" @click="addUnit()" />
        <hr />
        <br />
        <DataTable v-model:editingRows="editingRows" :value="products" editMode="row" dataKey="id" @row-edit-save="onRowEditSave">
            <Column field="name" header="Item Name" style="width: 20%">
                <template #editor="{ data }">
                    {{ data.description }}
                </template>
            </Column>
            <Column field="inventoryStatus" header=" Quantity" style="width: 20%">
                <template #editor="{ data }">
                    {{ data.inventoryStatus }}
                </template>
                <template #body="slotProps">
                    <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                </template>
            </Column>
            <Column field="Delivered Quantity" header="Quantity available in store" style="width: 20%">
                <template #body="{ data }">
                    {{ data.inventoryStatus }}
                </template>
            </Column>
            <Column field="Returned Quantity" header="Approved Quantity" style="width: 20%">
                <template #body="{ data }">
                    {{ data.quantity }}
                </template>
            </Column>
            <Column field="Remarks" header="Remarks" style="width: 20%">
                <template #body="{ data }">
                    {{ data.rating }}
                </template>
            </Column>
            <Column header="Action" :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
            <Column header="Details" style="min-width: 10rem">
                <template #body="{ data }">
                    <Button type="button" style="width: 30px; height: 30px" icon="pi pi-eye" rounded @click="editUnit(data)" />
                </template>
            </Column>
        </DataTable>

        <div class="flex justify-content-evenly mt-4">
            <Button style="width: auto" icon="pi pi-check" label="Issue" @click="ordered()" />
            <Button style="width: auto" icon="pi pi-times" label="Cancel" @click="ordered()" />
        </div>
    </div>
    <purchaseIssueShow style="border: none; background-color: #f5f9ff" ref="PermissionData" @reload="getReload" />
</template>

<script>
import { ref } from 'vue';
import purchaseIssueShow from '../../components/Product Requisition/purchaseIssueShow.vue';
import { ProductService } from '../../service/inlineEditServiceData';
const PermissionData = ref(0);
export default {
    components: { purchaseIssueShow },
    data() {
        return {
            visible: false,
            products: null,
            editingRows: [],
            statuses: [
                { label: 'In Stock', value: 'INSTOCK' },
                { label: 'Low Stock', value: 'LOWSTOCK' },
                { label: 'Out of Stock', value: 'OUTOFSTOCK' }
            ]
        };
    },
    mounted() {
        ProductService.getProductsMini().then((data) => (this.products = data));
    },
    methods: {
        getReload(PermissionData) {
            console.log('come from child to parent data ', PermissionData.mydata);
        },
        addUnit() {
            // this.visible = true;
            console.log('Add data');
            this.$refs.PermissionData.updatePermission(PermissionData);
        },
        onRowEditSave(event) {
            let { newData, index } = event;

            this.products[index] = newData;
        },
        getStatusLabel(status) {
            switch (status) {
                case 'INSTOCK':
                    return 'success';

                case 'LOWSTOCK':
                    return 'warning';

                case 'OUTOFSTOCK':
                    return 'danger';

                default:
                    return null;
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
