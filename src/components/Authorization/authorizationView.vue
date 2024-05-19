<template>
    <div class="card flex justify-content-center">
        {{ warehouseData.id }}
        <Dialog
            style="background-color: blueviolet"
            v-model:visible="visible"
            header="Authorization"
            :style="{ width: '60rem' }"
            :pt="{
                root: 'border-none',
                mask: {
                    style: 'backdrop-filter: blur(2px)'
                }
            }"
        >
            <span class="block mb-5" style="text-align: center"
                ><b><u>Authorization Details</u></b></span
            >
            <div class="grid-container">
                <div class="flex align-items-center mb-3 grid-item">
                    <label for="Name" class="font-semibold w-6rem">Requisition Number</label>
                    <InputText v-model="warehouseData.id" id="username" class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex align-items-center mb-3 grid-item">
                    <label class="font-semibold w-6rem">Branch / Division</label>
                    <InputText id="Address" class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex align-items-center mb-3grid-item">
                    <label class="font-semibold w-6rem">Created By</label>
                    <InputText id="Address" class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex align-items-center mb-3 grid-item">
                    <label class="font-semibold w-6rem">Requisition Date</label>
                    <InputText id="Email" class="flex-auto" autocomplete="off" />
                </div>
            </div>

            <table>
                <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Quantity Available</th>
                    <th>Approved Quantity</th>
                    <th>Price</th>
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                </tr>
                <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                </tr>
                <tr>
                    <td>Ernst Handel</td>
                    <td>Roland Mendel</td>
                    <td>Austria</td>
                    <td>Roland Mendel</td>
                    <td>Austria</td>
                </tr>
                <tr>
                    <td>Island Trading</td>
                    <td>Helen Bennett</td>
                    <td>UK</td>
                    <td>Helen Bennett</td>
                    <td>UK</td>
                </tr>
                <tr>
                    <td>Laughing Bacchus Winecellars</td>
                    <td>Yoshi Tannamuri</td>
                    <td>Canada</td>
                    <td>Yoshi Tannamuri</td>
                    <td>Canada</td>
                </tr>
                <tr>
                    <td>Magazzini Alimentari Riuniti</td>
                    <td>Giovanni Rovelli</td>
                    <td>Italy</td>
                    <td>Giovanni Rovelli</td>
                    <td>Italy</td>
                </tr>
            </table>

            <div class="flex justify-content-end gap-2 mt-3">
                <Button type="button" label="Cancel" @click="modalClose"></Button>
            </div>
        </Dialog>
        <!-- <Button type="button" label="Cancel" severity="secondary" @click="childData('childToParent data')">Child to Parent</Button> -->
    </div>
</template>
<script>
// import { FilterMatchMode } from 'primevue/api';
import { CustomerService } from '../../service/servicesData';
export default {
    data() {
        return {
            visible: false,
            warehouseData: '',
            customers: null
        };
    },
    mounted() {
        CustomerService.getCustomersMedium().then((data) => {
            this.customers = this.getCustomers(data);
            this.loading = false;
        });
    },
    methods: {
        childData(PermissionData) {
            this.$emit('reload', { mydata: 'item.id' });
            console.log('selection data: ', PermissionData);
            // this.$refs.PermissionData.childToParent(PermissionData);
        },
        updatePermission(data) {
            this.warehouseData = data;
            if (this.warehouseData) {
                this.visible = true;
            } else {
                console.log('child data', this.warehouseData);
                this.visible = true;
            }
        },
        modalClose() {
            this.visible = false;
            this.warehouseData = '';
        }
    }
};
</script>
<style scoped>
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    margin-top: 20px;
}

td,
th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}
.grid-container {
    display: grid;
    column-gap: 10px;
    grid-template-columns: auto auto;
    /* background-color: #2196f3; */
    padding: 5px;
}
.grid-item {
    /* background-color: rgba(255, 255, 255, 0.8); */
    padding: 0px;
    font-size: 12px;
    /* text-align: center; */
}
</style>
