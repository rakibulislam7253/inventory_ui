<template>
    <div class="headerSection1">
        <h4>Authorization</h4>
    </div>
    <div class="flex align-items-center gap-3 mb-1 ml-3">
        <label class="font-semibold w-3rem">Manu:</label>
        <Dropdown placeholder="Select Menu" v-model="authMenuList.column_name" :options="authMenuListt" @change="ddown" optionLabel="value" class="w-full md:w-40rem" />
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
            <template #empty> No customers found. </template>
            <Column field="Remarks" header="Remarks" sortable style="min-width: 14rem">
                <template #body="{ data }">
                    {{ data.remarks }}
                </template>
            </Column>
            <Column field="Make By" header="Make By" sortable style="min-width: 14rem">
                <template #body="{ data }">
                    {{ data.make_by }}
                </template>
            </Column>
            <Column field="Make Date" header="Make Date" sortable style="min-width: 14rem">
                <template #body="{ data }">
                    {{ data.make_dt }}
                </template>
            </Column>

            <Column field="action_status" header="Action Status" sortable filterField="date" dataType="date" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.action_status }}
                </template>
            </Column>
            <Column header="Details" style="min-width: auto">
                <template #body="{ data }">
                    <!-- {{ data.name }} -->
                    <Button label="Details" outlined class="mb-2 mr-2" @click="details(data)" />
                </template>
            </Column>
        </DataTable>
    </div>
    <!----------------------------- dialog ---------------------------------------------------->
    <authorizationView style="border: none; background-color: #f5f9ff" ref="PermissionData" @reload="getReload" />
</template>

<script>
import authMenuList from '../../models/authorizeMenuList';
import authorization from '../../service/authorizationService';
import authorizationView from '../../components/Authorization/authorizationView.vue';
import { ref } from 'vue';
const PermissionData = ref(0);
export default {
    components: { authorizationView },
    data() {
        return {
            authMenuList: new authMenuList(),
            visible: false,
            authMenuListt: '',
            customers: null,
            profileData: '',
            statuses: ['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'],
            loading: true
        };
    },
    mounted() {
        this.profileData = JSON.parse(localStorage.getItem('userDetails'));
        const moduleId = import.meta.env.VITE_APP_MODULE_ID;
        authorization.get_unauthorized_menu_list(moduleId, this.profileData.unique_name).then((data) => {
            this.authMenuListt = data.data;
            console.log(this.authMenuListt);
        });
    },
    methods: {
        ddown() {
            const moduleId = import.meta.env.VITE_APP_MODULE_ID;
            const menuId = this.authMenuList.column_name.column_name;
            console.log(moduleId);
            console.log(menuId);
            authorization.get_unauthorized_data_list(moduleId, menuId).then((data) => {
                const dataList = data.data;
                this.customers = this.getCustomers(data.data);

                for (let i = 0; i < dataList.length; i++) {
                    console.log(dataList[i].queue_id);
                }
            });
        },
        ordered() {
            console.log('ordered file');
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        getReload(PermissionData) {
            console.log('come from child to parent data ', PermissionData.mydata);
        },
        details(PermissionData) {
            this.visible = true;

            this.$refs.PermissionData.updatePermission(PermissionData);
        },
        addUnit() {
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
        }
    }
};
</script>
<style scoped>
.headerSection1 {
    background-color: #ffffff;
    padding: 8px;
    height: 40px;
    margin-bottom: 20px;
    border-radius: 8px;
}
</style>
