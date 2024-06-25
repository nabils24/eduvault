<script setup lang="ts">
import { productsCard } from '@/data/dashboard/dashboardData';

import { ref } from 'vue';
import { useRouter } from 'vue-router';
const config = useRuntimeConfig()

const link = useRouter();


const materi = ref([]);
const rating = ref(4);
const skeleton = ref(false)

async function getMateri() {
    setTimeout(async () => {
        const { data } = await useFetch(config.public.apiBase + '/api/materi', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let res = data.value;
        materi.value = res;
        console.log(res);
        skeleton.value = false;
    }, 2000);

}

async function baca(filenames: string) {
    link.push('/baca/' + filenames)
}

onMounted(() => {
    skeleton.value = true;
    getMateri();
});
</script>
<template>
    <v-row>
        <v-col cols="12" lg="3" sm="6" v-for="n in 3" :key="n" :hidden="!skeleton">
            <v-skeleton-loader :elevation="5" type="card"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" lg="3" sm="6" v-for="card in  materi " :key="card.id">
            <v-card elevation="10" class="withbg" rounded="md">
                <NuxtLink :to="card.link">
                    <v-img :src="config.public.apiBase + '/api/materi/thumbnail/' + card.thumbnail" height="100%"
                        class="rounded-t-md"></v-img>
                </NuxtLink>
                <div class="d-flex justify-end mr-4 mt-n5">
                    <v-btn size="40" icon class="bg-primary d-flex" @click="baca(card.file)">
                        <v-avatar size="30" class="text-white">
                            <ArrowRightIcon size="15" />
                        </v-avatar>
                        <v-tooltip activator="parent" location="bottom">Lihat
                        </v-tooltip>
                    </v-btn>
                </div>
                <v-card-item class="pt-0">
                    <h6 class="text-h6" v-text="card.judul"></h6>
                    <div class="d-flex align-center justify-space-between mt-1">
                        <div>
                            <span class="text-subtitle-1" v-text="card.deskripsi"></span>
                        </div>
                        <v-rating density="compact" color="warning" size="small" v-model="rating" readonly></v-rating>
                    </div>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>
