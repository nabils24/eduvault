<script setup lang="ts">
import { RouterView } from 'vue-router';
const title = ref("Eduvault - Warkop DKI");
useHead({
  meta: [{ content: title }],
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - Eduvault - Warkop DKI`
      : "Eduvault - Warkop DKI";
  },
});
</script>

<template>
    <v-locale-provider >
        <v-app>
            <LayoutFullMain/>
            <v-main>
                <v-container fluid class="page-wrapper">
                    <div class="maxWidth">
                        <RouterView />
                    </div>
                </v-container>
            </v-main>
        </v-app>
    </v-locale-provider>
</template>
