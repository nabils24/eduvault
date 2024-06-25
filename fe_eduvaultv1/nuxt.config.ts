// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["vuetify-nuxt-module"],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3333',
    }
  },
});
