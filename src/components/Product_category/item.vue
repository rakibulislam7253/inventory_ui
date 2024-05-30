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
                <!-- <div style="text-align: left">
                    <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
                </div> -->
                <div class="flex justify-content-between">
                    <!-- <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" /> -->
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
            <Column field="name" header="Category" sortable style="min-width: 14rem">
                <template #body="{ data }">
                    {{ data.category_name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name" />
                </template>
            </Column>
            <Column field="name" header="Item Name" sortable style="min-width: 14rem">
                <template #body="{ data }">
                    {{ data.product_name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name" />
                </template>
            </Column>
            <Column header="Description" sortable sortField="product_description" filterField="product_description" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <!-- <img alt="flag" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${data.country.code}`" style="width: 24px" /> -->
                        <span>{{ data.product_description}}</span>
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by country" />
                </template>
            </Column>
            <Column header="Price" sortable sortField="product_price" filterField="product_price" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <!-- <img :alt="data.representative.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`" style="width: 32px" /> -->
                        <span>{{ data.product_price }}</span>
                    </div>
                </template>
            </Column>
            <Column field="date" header="UOM" sortable filterField="unit_name" dataType="unit_name" style="min-width: 5rem">
                <template #body="{ data }">
                    {{ data.unit_name }}
                </template>
                <template #filter="{ filterModel }">
                    <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
                </template>
            </Column>
            <Column field="date" header="Reorder Level" sortable filterField="date" dataType="date" style="min-width: 10rem">
                <template #body="{ data }">
                    <span>{{ data.reorder_level }}</span>
                </template>
                <template #filter="{ filterModel }">
                    <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
                </template>
            </Column>
            <Column field="activity" header="Activity" style="min-width: 8rem">
                <template #body="{ data }">
                    <Button type="button" icon="pi pi-pencil" style="width: 28px; height: 28px" rounded square @click="editUnit(data)" />
                    <Button type="button" icon="pi pi-trash" class="ml-2" style="width: 28px; height: 28px" severity="danger" rounded square @click="editUnit(data)" />
                </template>
            </Column>
        </DataTable>

        <!-- <Button label="Show" @click="visible = true" /> -->
    </div>
    <!----------------------------- dialog ---------------------------------------------------->
    <ItemAdd ref="PermissionData" @reload="getReload" />
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import itemService from '../../service/item';
import ItemAdd from '../../components/Product_category/ItemAdd.vue';
import { ref } from 'vue';
const PermissionData = ref(0);
export default {
    components: { ItemAdd },
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
    // mounted() {
    //     CustomerService.getCustomersMedium().then((data) => {
    //         this.customers = this.getCustomers(data);
    //         this.loading = false;
    //     });
    // },
    mounted() {
        itemService.get_all_product_details().then((data) => {
            this.customers = this.getCustomers(data.data);
            console.log(this.customers);
            this.loading = false;
        });
    },
    methods: {
        exportCSV() {
            this.$refs.dt.exportCSV();
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
