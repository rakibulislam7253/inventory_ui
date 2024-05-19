<template>
    <div class="card p-fluid">
        <!-- <h5>Product Receive & Acknowledgment</h5> -->
        <br />
        <!-- <div class="grid formgrid">
            
                    <div class="col-6 mb-2 lg:col-4 lg:mb-0">
                        <IconField>
                            <InputIcon class="pi pi-user" />
                            <InputText type="text" placeholder="Username" />
                        </IconField>
                    </div>
                    <div class="col-6 mb-2 lg:col-4 lg:mb-0">
                        <IconField iconPosition="left">
                            <InputText type="text" placeholder="Search" />
                            <InputIcon class="pi pi-search" />
                        </IconField>
                    </div>
                    <div class="col-6 mb-2 lg:col-4 lg:mb-5 ">
                        <IconField iconPosition="left">
                            <InputText type="text" placeholder="Search" />
                            <InputIcon class="pi pi-search" />
                        </IconField>
                    </div>
                    <div class="col-6 mb-2 lg:col-4 lg:mb-0 ">
                        <IconField iconPosition="left">
                            <InputText type="text" placeholder="Search" />
                            <InputIcon class="pi pi-search" />
                        </IconField>
                    </div>
                </div> -->
        <DataTable
            v-model:editingRows="editingRows"
            :value="products"
            editMode="row"
            dataKey="id"
            @row-edit-save="onRowEditSave"
            ref="dt"
            v-model:selection="selectedCustomers"
            paginator
            :rows="10"
            filterDisplay="menu"
            :globalFilterFields="['name', 'country.name', 'representative.name', 'balance', 'status']"
        >
            <Column field="code" header="Code" style="width: 20%">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                <template #editor="{ data }">
                    {{ data.name }}
                    <!-- <InputText v-model="data[field]" /> -->
                </template>
            </Column>
            <Column field="name" header="Item" style="width: 20%">
                <template #editor="{ data }">
                    {{ data.description }}
                </template>
            </Column>
            <Column field="inventoryStatus" header="Requisition Quantity" style="width: 20%">
                <template #editor="{ data }">
                    {{ data.inventoryStatus }}
                </template>
                <template #body="slotProps">
                    <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                </template>
            </Column>
            <Column field="price" header="Delivered Quantity" style="width: 20%">
                <template #body="{ data, field }">
                    {{ formatCurrency(data[field]) }}
                </template>
                <template #editor="{ data, field }">
                    <InputNumber v-model="data[field]" mode="currency" currency="USD" locale="en-US" />
                </template>
            </Column>
            <Column field="price" header="Received Quantity" style="width: 20%">
                <template #body="{ data, field }">
                    {{ formatCurrency(data[field]) }}
                </template>
                <template #editor="{ data, field }">
                    <InputNumber v-model="data[field]" mode="currency" currency="USD" locale="en-US" />
                </template>
            </Column>
            <Column field="price" header="Remarks" style="width: 20%">
                <template #body="{ data, field }">
                    {{ formatCurrency(data[field]) }}
                </template>
                <template #editor="{ data, field }">
                    <InputNumber v-model="data[field]" mode="currency" currency="USD" locale="en-US" />
                </template>
            </Column>
            <Column header="Action" :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
        </DataTable>
        <div class="flex justify-content-evenly mt-5">
            <Button style="width: auto" icon="pi pi-times" label="Cancel" @click="ordered()" />
            <Button style="width: auto" icon="pi pi-check" label="Received" @click="ordered()" />
        </div>
    </div>
</template>

<script>
import { ProductService } from '../../service/inlineEditServiceData';

export default {
    data() {
        return {
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
