<template>
    <router-view />
</template>

<script setup>
const moduleId = import.meta.env.VITE_APP_MODULE_ID;
localStorage.setItem('inventory_module_id', moduleId);
</script>

<style scoped></style>
