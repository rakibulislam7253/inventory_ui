<template>
    <div class="card p-fluid">
        <br />

        <DataTable v-model:editingRows="editingRows" :value="products" editMode="row" dataKey="id" @row-edit-save="onRowEditSave">
            <Column field="name" header="Item Name" style="width: 20%">
                <template #editor="{ data }">
                    {{ data.description }}
                </template>
            </Column>
            <Column field="inventoryStatus" header="Order Quantity" style="width: 20%">
                <template #editor="{ data }">
                    {{ data.inventoryStatus }}
                </template>
                <template #body="slotProps">
                    <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                </template>
            </Column>
            <Column field="Delivered Quantity" header="Delivered Quantity" style="width: 20%">
                <template #body="{ data }">
                    {{ data.inventoryStatus }}
                </template>
            </Column>
            <Column field="Returned Quantity" header="Returned Quantity" style="width: 20%">
                <template #body="{ data, field }">
                    {{ formatCurrency(data[field]) }}
                </template>
                <template #editor="{ data, field }">
                    <InputNumber v-model="data[field]" mode="currency" currency="USD" locale="en-US" />
                </template>
            </Column>
            <Column field="price" header="Price" style="width: 20%">
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
            <!-- <Button style="width: auto" icon="pi pi-times" label="Cancel" @click="ordered()" /> -->
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
