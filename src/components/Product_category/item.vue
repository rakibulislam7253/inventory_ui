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
            :globalFilterFields="['category_name', 'product_name', 'product_description', 'product_price', 'unit_name', 'reorder_level']"
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
            <Column field="category_name" header="Category" sortable sortField="category_name" filterField="category_name" style="min-width: 14rem">
                <template #body="{ data }">
                    {{ data.category_name }}
                </template>
            </Column>
            <Column field="product_name" header="Item Name" sortable sortField="product_name" filterField="product_name" style="min-width: 14rem">
                <template #body="{ data }">
                    {{ data.product_name }}
                </template>
            </Column>
            <Column field="product_description" header="Description" sortable sortField="product_description" filterField="product_description" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.product_description }}</span>
                    </div>
                </template>
            </Column>
            <Column field="product_price" header="Price" sortable sortField="product_price" filterField="product_price" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.product_price }}</span>
                    </div>
                </template>
            </Column>
            <Column field="unit_name" header="UOM" sortable sortField="unit_name" filterField="unit_name" style="min-width: 5rem">
                <template #body="{ data }">
                    {{ data.unit_name }}
                </template>
            </Column>
            <Column field="reorder_level" header="Reorder Level" sortable sortField="reorder_level" filterField="reorder_level" style="min-width: 10rem">
                <template #body="{ data }">
                    <span>{{ data.reorder_level }}</span>
                </template>
            </Column>
            <Column header="Activity" style="min-width: 8rem">
                <template #body="{ data }">
                    <Button type="button" icon="pi pi-pencil" style="width: 28px; height: 28px" rounded square @click="editUnit(data)" />
                    <Button type="button" icon="pi pi-trash" class="ml-2" style="width: 28px; height: 28px" severity="danger" rounded square @click="editUnit(data)" />
                </template>
            </Column>
        </DataTable>

        <!-- <Button label="Show" @click="visible = true" /> -->
    </div>
    <!----------------------------- dialog ---------------------------------------------------->
    <ItemAdd style="border: none; background-color: #f5f9ff" ref="PermissionData" @whisperedSecret="hearSecret" />
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
        hearSecret() {
            itemService.get_all_product_details().then((data) => {
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
