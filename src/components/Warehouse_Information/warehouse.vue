<template>
    <div class="card">
        <DataTable v-model:filters="filters" ref="dt" v-model:selection="selectedCustomers" :value="customers" paginator :rows="10" dataKey="id" filterDisplay="menu" :globalFilterFields="['warehouse_name', 'description', 'address', 'email']">
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
            <Column field="warehouse_name" header="Name" sortable sortField="warehouse_name" filterField="warehouse_name" style="min-width: 14rem">
                <template #body="{ data }">
                    {{ data.warehouse_name }}
                </template>
            </Column>
            <Column field="description" header="Description" sortable sortField="description" filterField="description" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.description }}</span>
                    </div>
                </template>
            </Column>
            <Column field="address" header="Location" sortable sortField="address" filterField="address" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.address }}</span>
                    </div>
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
    </div>
    <!----------------------------- dialog ---------------------------------------------------->
    <warehouseAdd style="border: none; background-color: #f5f9ff" ref="PermissionData" @whisperedSecret="hearSecret" />
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import warehouseService from '../../service/warehouseData';
import warehouseAdd from '../../components/Warehouse_Information/warehouseAdd.vue';
import { ref } from 'vue';
const PermissionData = ref(0);
export default {
    components: { warehouseAdd },
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
            representatives: [
                { name: 'Amy Elsner', image: 'amyelsner.png' },
                { name: 'Anna Fali', image: 'annafali.png' },
                { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
                { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
                { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
                { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
                { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
                { name: 'Onyama Limba', image: 'onyamalimba.png' },
                { name: 'Stephen Shaw', image: 'stephenshaw.png' },
                { name: 'XuXue Feng', image: 'xuxuefeng.png' }
            ],
            statuses: ['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'],
            loading: true
        };
    },
    mounted() {
        warehouseService.get_all_warehouse_info().then((data) => {
            console.log(data);
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
            warehouseService.get_all_warehouse_info().then((data) => {
                console.log(data.data);
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
