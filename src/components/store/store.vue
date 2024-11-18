<template>
    <div class="card">
        <DataTable
            v-model:filters="filters"
            ref="dt"
            v-model:selection="selectedCustomers"
            :value="customers"
            paginator
            :rows="10"
            dataKey="id"
            filterDisplay="menu"
            :globalFilterFields="['category_name', 'product_name', 'current_stock', 'product_price']"
        >
            <template #header>
                <div class="flex justify-content-between">
                    <IconField iconPosition="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                        <Button icon="pi pi-external-link" class="ml-5" style="width: auto" label="Export" @click="exportCSV($event)" />
                    </IconField>
                </div>
            </template>
            <template #empty> No customers found. </template>
            <Column field="product_name" header="Product Name" sortable sortField="unit_description" filterField="unit_description" style="min-width: 14rem">
                <template #body="{ data }">
                    {{ data.product_name }}
                </template>
            </Column>
            <Column field="category_name" header="Category Name" sortable sortField="unit_name" filterField="unit_name" style="min-width: 14rem">
                <template #body="{ data }">
                    {{ data.category_name }}
                </template>
            </Column>

            <Column field="current_stock" header="Current Stock" sortable sortField="unit_description" filterField="unit_description" style="min-width: 2rem">
                <template #body="{ data }">
                    <p style="text-align: center">{{ data.current_stock }}</p>
                </template>
            </Column>
            <Column field="product_price" header="Product Price" sortable sortField="unit_description" filterField="unit_description" style="min-width: 2rem">
                <template #body="{ data }">
                    <p style="text-align: center">{{ data.product_price }}</p>
                </template>
            </Column>
            <Column field="Current_amount" header="Current Amount" sortable sortField="unit_description" filterField="unit_description" style="min-width: 2rem">
                <template #body="{ data }">
                    <p style="text-align: center">{{ data.current_stock * data.product_price }}</p>
                </template>
            </Column>
            <Column field="reorder_level" header="Reorder Level" sortable sortField="unit_description" filterField="unit_description" style="min-width: 2rem; height: 30px">
                <template #body="{ data }">
                    <p style="text-align: center">{{ data.reorder_level }}</p>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import storeHouse from '../../service/store.service';
// import jwtDecode from 'jwt-decode';
export default {
    data() {
        return {
            visible: false,
            customers: null,
            date: null,
            storeData: '',
            balance: '',
            detailsData: [],
            userData: '',
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                representative: { value: null, matchMode: FilterMatchMode.IN },
                status: { value: null, matchMode: FilterMatchMode.EQUALS },
                verified: { value: null, matchMode: FilterMatchMode.EQUALS }
            },

            statuses: ['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'],
            loading: true
        };
    },
    mounted() {
        storeHouse.get_store_product_information().then((data) => {
            this.storeData = data.data;

            for (let i = 0; i < this.storeData.length; i++) {
                this.detailsData.push(...this.storeData[i].inv_product_details);
            }

            this.customers = this.getCustomers(this.detailsData);
            this.loading = false;
        });
    },

    methods: {
        exportCSV(event) {
            console.log(event.target.value);
            this.$refs.dt.exportCSV();
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
        },
        formatCurrency(value) {
            return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        },
        getSeverity(status) {
            switch (status) {
                case 'unqualified':
                    return 'danger';

                case 'qualified':
                    return 'success';

                case 'new':
                    return 'info';

                case 'negotiation':
                    return 'warning';

                case 'renewal':
                    return null;
            }
        }
    }
};
</script>
<style>
.addunit {
    border: none;
    background-color: #f5f9ff;
}
</style>
