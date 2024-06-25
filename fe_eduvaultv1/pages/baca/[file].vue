<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import Auth from '@/components/auth/auth.vue';
import { VuePDF, usePDF } from '@tato30/vue-pdf'
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const config = useRuntimeConfig()

const slugParams = ref(router.currentRoute.value.params.file);
console.log(slugParams.value);
const page = ref(1)

const jumpPage = ref(1)


const { pdf, pages, info } = usePDF(config.public.apiBase + '/api/materi/file/' + slugParams.value)
console.log("PDF", pdf, pages, info)

function jumpToPage() {
  if (jumpPage.value >= 1 && jumpPage.value <= pages.value) {
    page.value = jumpPage.value
  } else {
    alert('Page not found')
  }
}

watchEffect(async () => {
  slugParams.value = router.currentRoute.value.params.file
})


useSeoMeta({
  title: 'Baca',
  ogTitle: 'Baca',
  description: 'Baca Page Eduvault',
  ogDescription: 'Baca Page Eduvault',
  ogImage: 'https://telegra.ph/file/3d527b3c2acad3834650f.png',
})
</script>
<template>
  <Auth />
  <v-row>
    <UiParentCard title="Materi">
      <div class="pa-7 pt-0 pr-7">
        <VuePDF :pdf="pdf" :page="page" fit-parent />
      </div>

      <span class="text-h6 font-weight-bold pl-2">{{ page }} / {{ pages }}</span>
      <v-row justify="end">
        <!-- <v-col cols="auto">
          <v-text-field v-model="jumpPage" outlined dense class="mb-2"></v-text-field>
        </v-col>
        <v-col cols="auto">
          <v-btn color="primary" @click="jumpToPage()" class="ma-2">
            Jump to Page
          </v-btn>
        </v-col> -->

        <v-col cols="auto">
          <v-btn color="primary" :disabled="page <= 1" @click="page--" class="ma-2">
            <v-icon left>mdi-chevron-left</v-icon>
            Prev
          </v-btn>
          <v-btn color="primary" :disabled="page >= pages" @click="page++" class="ma-2">
            Next
            <v-icon right>mdi-chevron-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </UiParentCard>
  </v-row>
</template>
