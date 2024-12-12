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
            <!-- <div class="grid-container">
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
            </div> -->

            <table>
                <tr>
                    <th>column_name</th>
                    <th>Old Data</th>
                    <th>New Data</th>
                </tr>
                <tr v-for="details in customers" :key="details">
                    <td>{{ details.column_name }}</td>
                    <td>{{ details.old_value }}</td>
                    <td>{{ details.value }}</td>
                </tr>
            </table>

            <div class="flex justify-content-end gap-2 mt-3">
                <Button type="button" label="Authorized" @click="authorized" />
                <Button type="button" label="Decline" @click="decline" class="ml-2" />

                <Button type="button" label="Cancel" @click="modalClose"></Button>
            </div>
        </Dialog>
    </div>
</template>
<script>
import toast from '../../common/toast';
import authorization from '../../service/authorizationService';
import authorizeFinal from '../../models/authorization';
export default {
    data() {
        return {
            authorizeFinal: new authorizeFinal(),
            visible: false,
            warehouseData: '',
            receiveData: '',
            customers: null
        };
    },

    methods: {
        authorized() {
            this.authorizeFinal.queue_id = this.receiveData.queue_id;
            this.authorizeFinal.make_by = 'atikur.rahaman';
            this.authorizeFinal.log_status = 'A';
            authorization.authorization_decline_by_queue_id(this.authorizeFinal).then((data) => {
                toast.authorizeTost(data);
                this.visible = false;
            });
        },
        decline() {
            this.authorizeFinal.queue_id = this.receiveData.queue_id;
            this.authorizeFinal.make_by = 'atikur.rahaman';
            this.authorizeFinal.log_status = 'U';
            authorization.authorization_decline_by_queue_id(this.authorizeFinal).then((data) => {
                toast.authorizeTost(data);
                this.visible = false;
            });
        },
        updatePermission(data) {
            this.receiveData = data;
            authorization.get_unauthorized_data(data.queue_id).then((data) => {
                this.customers = data.data;
                this.visible = true;
            });
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
