<template>
    <div class="card">
        <DataTable v-model:editingRows="editingRows" :value="products" editMode="row" dataKey="id" @row-edit-save="onRowEditSave">
            <Column field="name" header="Item Name" style="width: 20%">
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
            <Column field="Delivered Quantity" header="Delivered Quantity" style="width: 20%">
                <template #body="{ data }">
                    {{ data.inventoryStatus }}
                </template>
            </Column>
            <Column field="Received Quantity" header="Returned Quantity" style="width: 20%">
                <template #body="{ data, field }">
                    {{ formatCurrency(data[field]) }}
                </template>
                <template #editor="{ data, field }">
                    <InputNumber v-model="data[field]" mode="currency" currency="USD" locale="en-US" />
                </template>
            </Column>
            <Column field="price" header="Returned Quantity" style="width: 20%">
                <template #body="{ data, field }">
                    {{ formatCurrency(data[field]) }}
                </template>
                <template #editor="{ data, field }">
                    <InputNumber v-model="data[field]" mode="currency" currency="USD" locale="en-US" />
                </template>
            </Column>
            <Column field="price" header="Remarkes" style="width: 20%">
                <template #body="{ data, field }">
                    {{ formatCurrency(data[field]) }}
                </template>
                <template #editor="{ data, field }">
                    <InputNumber v-model="data[field]" mode="currency" currency="USD" locale="en-US" />
                </template>
            </Column>
            <Column header="Action" :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
        </DataTable>
        <div class="mt-5">
            <div style="margin-left: 18%">
                <h6>Comment:</h6>
                <Textarea placeholder="Your Message" :autoResize="true" rows="3" cols="80" />
            </div>
            <div class="flex justify-content-evenly mt-2">
                <Button icon="pi pi-times" label="Cancel" @click="ordered()" />
                <Button icon="pi pi-check" label="Acknowledged" @click="ordered()" />
            </div>
        </div>
    </div>
    <!----------------------------- dialog ---------------------------------------------------->
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
