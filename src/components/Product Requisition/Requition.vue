<template>
    <div class="headerSection1">
        <h4>Product Requisition</h4>
    </div>
    <div class="headerSection">
        <div class="flex flex-wrap gap-1">
            <div class="flex align-items-center gap-3 mb-1">
                <label class="font-semibold w-8rem">Branch/Division</label>
                <Dropdown v-model="branchs.name" :options="branchs" optionLabel="name" placeholder="Select Branch" class="w-full md:w-20rem" />
            </div>
            <div class="flex align-items-center gap-3 mb-1 ml-2">
                <label class="font-semibold w-8rem">Order Number</label>
                <InputText id="Address" size="small" class="flex-auto" autocomplete="off" />
            </div>
            <br />
        </div>
    </div>
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
                        <Button icon="pi pi-external-link" class="ml-5" label="Export" @click="exportCSV($event)" />
                    </IconField>
                    <Button type="button" icon="pi pi-plus" @click="addUnit()" />
                </div>
            </template>
            <template #empty> No customers found. </template>
            <!-- <Column selectionMode="multiple" headerStyle="width: 3rem"></Column> -->
            <Column field="category" header="Branch/Division" sortable style="min-width: 14rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
            </Column>
            <Column header="category" sortable sortField="representative.name" filterField="representative" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <img :alt="data.representative.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`" style="width: 32px" />
                        <span>{{ data.representative.name }}</span>
                    </div>
                </template>
            </Column>
            <Column field="date" header="Item Name" sortable filterField="date" dataType="date" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.date }}
                </template>
            </Column>
            <Column field="date" header="Quantity" sortable filterField="date" dataType="date" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.date }}
                </template>
            </Column>
            <Column header="Activity" style="min-width: 10rem">
                <template #body="{ data }">
                    <Button type="button" icon="pi pi-pencil" rounded square @click="editUnit(data)" />
                    <Button type="button" icon="pi pi-trash" class="ml-2" rounded square @click="editUnit(data)" />
                </template>
            </Column>
        </DataTable>
        <div>
            <div style="margin-left: 18%">
                <h6>Remarks:</h6>
                <Textarea placeholder="Your Message" :autoResize="true" rows="3" cols="80" />
            </div>
            <div class="flex justify-content-evenly mt-2">
                <Button icon="pi pi-check" label="Complete" @click="ordered()" />
                <Button icon="pi pi-times" label="Cancel" @click="ordered()" />
            </div>
        </div>
    </div>
    <!----------------------------- dialog ---------------------------------------------------->
    <RequisitionAdd style="border: none; background-color: #f5f9ff" ref="PermissionData" @reload="getReload" />
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import { CustomerService } from '../../service/servicesData';
import RequisitionAdd from '../../components/Product Requisition/RequisitionAdd.vue';
import { ref } from 'vue';
const PermissionData = ref(0);
export default {
    components: { RequisitionAdd },
    data() {
        return {
            visible: false,
            customers: null,
            branchs: [
                { name: 'Principal Branch', code: '1001' },
                { name: 'Nayanpur Bazar Branch ', code: '1002' },
                { name: 'Narayanganj Branch', code: '1003' },
                { name: 'Gulshan Corporate Branch', code: '1004' },
                { name: 'Seedstore Bazar Branch', code: '1005' }
            ],
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

<style scoped>
.headerSection {
    background-color: #e2e8f0;
    padding: 10px;
    padding-left: 45px;
    height: auto;
    margin-bottom: 5px;
    border-radius: 8px;
}
.headerSection1 {
    background-color: #ffffff;
    padding: 8px;
    height: 40px;
    margin-bottom: 20px;
    border-radius: 8px;
}
</style>
