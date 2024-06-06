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
            :globalFilterFields="['name', 'country.name', 'representative.name', 'balance', 'status']"
        >
            <template #header>
                <div class="flex justify-content-between">
                    <!-- <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" /> -->
                    <IconField iconPosition="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                        <!-- <Button icon="pi pi-external-link" class="ml-5" label="Export" @click="exportCSV($event)" /> -->
                    </IconField>
                    <!-- <Button type="button" icon="pi pi-plus" @click="addUnit()" /> -->
                </div>
            </template>
            <template #empty> No customers found. </template>
            <!-- <Column selectionMode="multiple" headerStyle="width: 3rem"></Column> -->
            <Column field="category" header="Requisition No" sortable style="min-width: 14rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                
            </Column>
            <Column field="category" header="Branch / Division" sortable style="min-width: 14rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                
            </Column>
            <Column field="category" header="Category" sortable style="min-width: 14rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                
            </Column>
            <Column header="Item Name" sortable sortField="representative.name" filterField="representative" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.representative.name }}</span>
                    </div>
                </template>
            </Column>

            <Column field="date" header="Quantity" sortable filterField="date" dataType="date" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.activity }}
                </template>
            </Column>
            <Column header="Details" style="min-width: auto">
                <template #body="{ data }">
                    <!-- {{ data.name }} -->
                    <Button label="Details" outlined class="mb-2 mr-2" @click="details(data)" />
                </template>
            </Column>

            <Column header="Activity" style="min-width: 20rem; text-align: center">
                <template #body="">
                    <Button type="button" label="Authorized" />
                    <Button type="button" label="Decline" class="ml-2" />
                </template>
            </Column>
        </DataTable>
    </div>
    <!----------------------------- dialog ---------------------------------------------------->
    <authorizationView style="border: none; background-color: #f5f9ff" ref="PermissionData" @reload="getReload" />
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import { CustomerService } from '../../service/servicesData';
import authorizationView from '../../components/Authorization/authorizationView.vue';
import { ref } from 'vue';
const PermissionData = ref(0);
export default {
    components: { authorizationView },
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
        CustomerService.getCustomersMedium().then((data) => {
            this.customers = this.getCustomers(data);
            this.loading = false;
        });
    },
    methods: {
        ordered() {
            console.log('ordered file');
            console.log(this.customers);
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        getReload(PermissionData) {
            console.log('come from child to parent data ', PermissionData.mydata);
        },
        details(PermissionData) {
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
