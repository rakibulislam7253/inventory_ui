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
            <!-- <Column selectionMode="multiple" headerStyle="width: 3rem"></Column> -->
            <Column field="unit_name" header="Unit Name" sortable style="min-width: 14rem">
                <template #body="{ data }">
                    {{ data.unit_name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name" />
                </template>
            </Column>
            <Column header="Unit Description" sortable sortField="country.name" filterField="country.name" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.unit_description }}</span>
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by country" />
                </template>
            </Column>
            <Column header="Make Date" sortable sortField="representative.name" filterField="representative" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.make_dt }}</span>
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <MultiSelect v-model="filterModel.value" :options="representatives" optionLabel="name" placeholder="Any" class="p-column-filter">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <span>{{ data }}</span>
                            </div>
                        </template>
                    </MultiSelect>
                </template>
            </Column>

            <Column field="activity" header="Activity" style="min-width: 5rem">
                <template #body="{ data }">
                    <Button type="button" style="width: 30px; height: 30px" icon="pi pi-pencil" rounded @click="editUnit(data)" />
                    <Button type="button" style="width: 30px; height: 30px" icon="pi pi-trash" severity="danger" class="ml-2" rounded @click="editUnit(data)" />
                </template>
            </Column>
        </DataTable>
    </div>
    <!----------------------------- dialog ---------------------------------------------------->
    <addUnit ref="PermissionData" />
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
// import { CustomerService } from '../../service/servicesData';
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
        unitService.get_all_unit_of_measurements().then((data) => {
            // console.log(data);
            this.customers = this.getCustomers(data.data);
            console.log(this.customers);
            this.loading = false;
        });
    },

    methods: {
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        getReload(PermissionData) {
            console.log('come from child to parent data ', PermissionData.mydata);
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
