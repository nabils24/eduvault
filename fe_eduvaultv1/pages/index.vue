<script setup lang="ts">
/*Call Components*/

import RecentTransaction from '@/components/dashboard/RecentTransaction.vue';

import ProductCards from '@/components/dashboard/ProductCards.vue';
import Auth from '@/components/auth/auth.vue';

import { onMounted, nextTick, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();




// onBeforeMount(() => {
//     const userData = JSON.parse(sessionStorage.getItem('userData'));
//     if (!userData) {
//         window.location.href = '/auth/login';
//     }
// });

useSeoMeta({
    title: 'Dashboard',
    ogTitle: 'Dashboard',
    description: 'Dashboard Page Eduvault',
    ogDescription: 'Dashboard Page Eduvault',
    ogImage: 'https://telegra.ph/file/3d527b3c2acad3834650f.png',
})

</script>
<template>
    <Auth />
    <v-row>
        <v-col cols="12">
            <v-row>
                <!-- Yearly Breakup / Monthly Earnings -->
                <!-- <v-col cols="12" lg="12">
                    <div class="mb-6">
                        <YearlyBreakup />
                    </div>
                    <div>
                        <MonthlyEarning />
                    </div>
                </v-col> -->
                <!-- Recent transaction -->
                <v-col cols="12" lg="6">
                    <RecentTransaction />
                </v-col>
                <!-- Product performence -->
                <!-- <v-col cols="12" lg="8">
                    <ProductPerformance />
                </v-col> -->
                <!-- Product Cards -->
                <v-col cols="12">
                    <ProductCards />
                </v-col>
            </v-row>
        </v-col>
        <v-col class="text-center mt-2">
            <p class="text-muted">Design and Developed by Warkop DKI</p>
        </v-col>
    </v-row>
</template>