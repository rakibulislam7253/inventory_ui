<template>
    <div class="card">
        <DataTable v-model:filters="filters" ref="dt" v-model:selection="selectedCustomers" :value="customers" paginator :rows="10" dataKey="id" filterDisplay="menu" :globalFilterFields="['unit_name', 'unit_description']">
            <template #header>
                <div class="flex justify-content-between">
                    <IconField iconPosition="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                        <Button icon="pi pi-external-link" class="ml-5" style="width: auto" label="Export" @click="exportCSV($event)" />
                    </IconField>
                    <Button type="button" style="width: 30px; height: 30px" icon="pi pi-plus" @click="addUnit()" />
                </div>
            </template>
            <template #empty> No customers found. </template>
            <Column field="unit_name" header="Unit Name" sortable sortField="unit_name" filterField="unit_name" style="min-width: 14rem">
                <template #body="{ data }">
                    {{ data.unit_name }}
                </template>
            </Column>
            <Column field="unit_description" header="Unit Description" sortable sortField="unit_description" filterField="unit_description" style="min-width: 14rem">
                <template #body="{ data }">
                    {{ data.unit_description }}
                </template>
            </Column>

            <Column field="activity" header="Activity" style="min-width: 5rem">
                <template #body="{ data }">
                    <Button type="button" style="width: 30px; height: 30px" icon="pi pi-pencil" rounded @click="editUnit(data)" />
                    <Button type="button" style="width: 30px; height: 30px" icon="pi pi-trash" severity="danger" class="ml-3" rounded @click="deleteData(data)" />
                </template>
            </Column>
        </DataTable>
    </div>
    <!----------------------------- dialog ---------------------------------------------------->
    <addUnit class="addunit" ref="PermissionData" @whisperedSecret="hearSecret" />
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import unitService from '../../service/unitData';
import addUnit from '../../components/UnitOfMeasurement/AddUnit.vue';
import { ref } from 'vue';
const PermissionData = ref(0);
export default {
    components: { addUnit },
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
        unitService.get_all_unit_of_measurements().then((data) => {
            // console.log(data);
            this.customers = this.getCustomers(data.data);
            console.log(this.customers);
            this.loading = false;
        });
    },

    methods: {
        exportCSV(event) {
            console.log(event.target.value);
            this.$refs.dt.exportCSV();
        },
        hearSecret() {
            unitService.get_all_unit_of_measurements().then((data) => {
                console.log(data);
                this.customers = this.getCustomers(data.data);
                console.log(this.customers);
                this.loading = false;
            });
        },
        editUnit(PermissionData) {
            // this.visible = true;
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
<style>
.addunit {
    border: none;
    background-color: #f5f9ff;
}
</style>
