<script setup lang="ts">
import { onMounted, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();


onMounted(() => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (!userData) {
        window.location.href = '/auth/login';
    }
})
onBeforeMount(() => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (!userData) {
        window.location.href = '/auth/login';
    }
});

</script>
<template></template>
