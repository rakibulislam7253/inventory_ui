<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in this.menuItems" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<script setup>
import AppMenuItem from './AppMenuItem.vue';
</script>

<script>
import menudata from '../service/userByMenu';
export default {
    data() {
        return {
            profileData: '',
            menuset: '',
            menuItems: []
        };
    },
    mounted() {
        console.log('I am menu');
        this.profileData = JSON.parse(localStorage.getItem('userDetails'));
        console.log(this.profileData.unique_name);
        console.log(this.profileData);
        const moduleId = import.meta.env.VITE_APP_MODULE_ID;
        console.log(moduleId);
        menudata.get_user_menu(this.profileData.unique_name, moduleId).then((data) => {
            console.log(data.data);
            this.menuset = data.data;
            this.menuItems = this.createMenuItems(this.menuset);
        });
    },
    methods: {
        createMenuItems(data) {
            const menuMap = {};

            data.forEach((item) => {
                if (item.parent_menu_id === null) {
                    menuMap[item.menu_id] = {
                        label: item.menu_title,
                        items: []
                    };
                } else {
                    if (menuMap[item.parent_menu_id]) {
                        menuMap[item.parent_menu_id].items.push({
                            label: item.menu_title,
                            icon: item.menu_icon,
                            to: item.navigate_url,
                            menuId: item.menu_id
                        });
                    }
                }
            });

            return Object.values(menuMap);
        }
    }
};
</script>

<style lang="scss" scoped></style>
