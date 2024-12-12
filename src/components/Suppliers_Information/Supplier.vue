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
            :globalFilterFields="['suppliers_name', 'address', 'phone_number', 'product_price', 'email']"
        >
            <template #header>
                <div class="flex justify-content-between">
                    <IconField iconPosition="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                        <Button icon="pi pi-external-link" class="ml-5" label="Export" @click="exportCSV($event)" />
                    </IconField>
                    <Button type="button" icon="pi pi-plus" @click="addUnit()" />
                </div>
            </template>
            <template #empty> No customers found. </template>
            <!-- <Column selectionMode="multiple" headerStyle="width: 3rem"></Column> -->
            <Column field="suppliers_name" header="Name" sortable sortField="suppliers_name" filterField="suppliers_name" style="min-width: 14rem">
                <template #body="{ data }">
                    {{ data.suppliers_name }}
                </template>
            </Column>
            <Column field="address" header="Address" sortable sortField="address" filterField="address" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.address }}</span>
                    </div>
                </template>
            </Column>
            <Column field="phone_number" header="Contact" sortable sortField="phone_number" filterField="phone_number" style="min-width: 10rem">
                <template #body="{ data }">
                    <span>{{ data.phone_number }}</span>
                </template>
            </Column>
            <Column field="email" header="Email" sortable sortField="email" filterField="email" style="min-width: 10rem">
                <template #body="{ data }">
                    <span>{{ data.email }}</span>
                </template>
            </Column>

            <Column header="Activity" style="min-width: 5rem">
                <template #body="{ data }">
                    <Button type="button" style="width: 30px; height: 30px" icon="pi pi-pencil" rounded @click="editUnit(data)" />
                    <Button type="button" style="width: 30px; height: 30px" icon="pi pi-trash" severity="danger" class="ml-2" rounded @click="editUnit(data)" />
                </template>
            </Column>
        </DataTable>

        <!-- <Button label="Show" @click="visible = true" /> -->
    </div>
    <!----------------------------- dialog ---------------------------------------------------->
    <SupplierAdd style="border: none; background-color: #f5f9ff" ref="PermissionData" @whisperedSecret="hearSecret" />
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import supplier from '../../service/supplier';
import SupplierAdd from '../../components/Suppliers_Information/SupplierAdd.vue';
import { ref } from 'vue';
const PermissionData = ref(0);
export default {
    components: { SupplierAdd },
    data() {
        return {
            visible: false,
            customers: null,
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
        supplier.get_all_suppliers_info().then((data) => {
            this.customers = this.getCustomers(data.data);
            console.log(this.customers);
            this.loading = false;
        });
    },
    methods: {
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        hearSecret() {
            supplier.get_all_suppliers_info().then((data) => {
                this.customers = this.getCustomers(data.data);
                console.log(this.customers);
                this.loading = false;
            });
        },
        editUnit(PermissionData) {
            this.visible = true;
            console.log('selection data: ', PermissionData);
            this.$refs.PermissionData.updatePermission(PermissionData);
        },
        addUnit() {
            // this.visible = true;
            console.log('Add data');
            this.$refs.PermissionData.updatePermission(PermissionData);
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
