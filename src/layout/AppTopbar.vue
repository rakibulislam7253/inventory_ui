<template>
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <img :src="czb_logo" alt="logo" />
            <!-- <span>Citizens Banl PLC</span> -->
        </router-link>
        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>
        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <button @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
                <div class="dropdown" ref="displaydata">
                    <button class="dropbtn"><i class="pi pi-user"></i></button>
                    <div class="dropdown-content">
                        <!-- <div>
                            <p @click="profileButton()" class="profile"><i class="pi pi-fw pi-user profile1" style="margin-right: 5px"></i>Profile</p>
                        </div> -->
                        <div>
                            <p @click="logOutButton()" class="profile"><i class="pi pi-sign-out" style="margin-right: 5px"></i>Log Out</p>
                        </div>
                        <!-- <a href="#">Log Out</a> -->
                    </div>
                </div>
                <span>Profile</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import czb_logo from '../assets/czb-logo.png';
const displaydata = ref(false);
const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();

onMounted(() => {
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});
function deleteAllCookies() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const cookieName = cookie.split('=')[0].trim();
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}
// const profileButton = () => {
//     router.push('/UnitOfMeasurement/unit');
// };
const logOutButton = () => {
    deleteAllCookies();
    localStorage.clear();
    router.push('/login');
};
const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};

const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
</script>

<style scoped>
.profile {
    font-size: 13px;
    padding: 5px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 3px;
    margin-left: -50px;
    width: 80%;
}
.dropbtn {
    /* background-color: #04aa6d; */
    /* color: white; */
    padding: 16px;
    font-size: 16px;
    border: none;
    border-radius: 50%;
    width: auto;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f7f5f5;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    /* z-index: 1; */
}

.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

.dropdown-content a:hover {
    background-color: #ddd;
}

.dropdown:hover .dropdown-content {
    display: block;
}

.dropdown:hover .dropbtn {
    /* background-color: #3e8e41; */
}
</style>
