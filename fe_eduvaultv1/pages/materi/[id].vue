<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import Auth from '@/components/auth/auth.vue';
const config = useRuntimeConfig()


const link = useRouter()

let ids = ref(link.currentRoute.value.params.id)
console.log(ids.value)

const materi = ref([]);
const rating = ref(4);
const availableMateri = ref(false)
const notAvailaibleMateri = ref(false)

async function getMateri(idkuh) {
  const { data } = await useFetch(config.public.apiBase + '/api/materi/mapel/' + idkuh, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  let res = data.value;
  materi.value = res;
  console.log(res);
  if (materi.value.length > 0) {
    availableMateri.value = true
    notAvailaibleMateri.value = false
  } else {
    notAvailaibleMateri.value = true
    availableMateri.value = false
  }


}
async function baca(filenames: string) {
  link.push('/baca/' + filenames)
}

onMounted(() => {
  getMateri(ids.value);
});
watchEffect(async () => {
  const idk = link.currentRoute.value.params.id
  console.log('ID BERUBAH')
  getMateri(idk);
})

useSeoMeta({
    title: 'Materi',
    ogTitle: 'Materi',
    description: 'Materi Page Eduvault',
    ogDescription: 'Materi Page Eduvault',
    ogImage: 'https://telegra.ph/file/3d527b3c2acad3834650f.png',
})

</script>
<template>
  <Auth />
  <v-row>
    <v-row>
      <v-col cols="12" lg="12" md="12" :hidden="!notAvailaibleMateri">
        <UiParentCard title="Yahhh..">
          <div class="pa-7 pt-1">
            <p class="text-body-1">sepertinya belum ada materi untuk mapel ini.. </p>
          </div>
        </UiParentCard>
      </v-col>
      <v-col cols="12" lg="3" sm="6" v-for="card in materi" :key="card.id" :hidden="!availableMateri">
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
  </v-row>
</template>
