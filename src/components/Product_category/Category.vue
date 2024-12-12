<template>
    <div class="card">
        <DataTable v-model:filters="filters" ref="dt" v-model:selection="selectedCustomers" :value="customers" paginator :rows="10" dataKey="id" filterDisplay="menu" :globalFilterFields="['category_name', 'category_description', 'make_dt']">
            <template #header>
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
            <Column field="category_name" header="Category" sortable sortField="category_name" filterField="category_name" style="min-width: 14rem">
                <template #body="{ data }">
                    {{ data.category_name }}
                </template>
            </Column>
            <Column field="category_description" header="Description" sortable sortField="category_description" filterField="category_description" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.category_description }}</span>
                    </div>
                </template>
            </Column>
            <!-- <Column header="Created By" sortable sortField="representative.name" filterField="representative" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        
                        <span>{{ data.make_by }}</span>
                    </div>
                </template>
            </Column> -->
            <Column field="make_dt" header="Created Date" sortable filterField="make_dt" dataType="date" style="min-width: 10rem">
                <template #body="{ data }">
                    <span>{{ data.make_dt }}</span>
                    <!-- {{ formatDate(data.make_dt) }} -->
                </template>
            </Column>

            <Column header="Activity" style="min-width: 8rem">
                <template #body="{ data }">
                    <Button type="button" style="width: 28px; height: 28px" icon="pi pi-pencil" rounded @click="editUnit(data)" />
                    <Button type="button" style="width: 28px; height: 28px" icon="pi pi-trash" severity="danger" class="ml-2" rounded @click="editUnit(data)" />
                </template>
            </Column>
        </DataTable>

        <!-- <Button label="Show" @click="visible = true" /> -->
    </div>
    <!----------------------------- dialog ---------------------------------------------------->
    <CategoryAdd style="border: none; background-color: #f5f9ff" ref="PermissionData" @whisperedSecret="hearSecret" />
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import productCategoryService from '../../service/productCategory';
import CategoryAdd from '../../components/Product_category/CategoryAdd.vue';
import { ref } from 'vue';
const PermissionData = ref(0);
export default {
    components: { CategoryAdd },
    data() {
        return {
            // productCategory: new productCategoryData(),
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
    // mounted() {
    //     CustomerService.getCustomersMedium().then((data) => {
    //         this.customers = this.getCustomers(data);
    //         this.loading = false;
    //     });
    // },
    mounted() {
        productCategoryService.get_all_product_category().then((data) => {
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
            productCategoryService.get_all_product_category().then((data) => {
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
        // formatDate(value) {
        //     return value.toLocaleDateString('en-US', {
        //         day: '2-digit',
        //         month: '2-digit',
        //         year: 'numeric'
        //     });
        // },
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
