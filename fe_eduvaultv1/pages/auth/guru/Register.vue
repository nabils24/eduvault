<script setup lang="ts">
/*-For Set Blank Layout-*/
definePageMeta({
    layout: "blank",
});
useSeoMeta({
    title: 'Register',
    ogTitle: 'Register',
    description: 'Register Page Eduvault',
    ogDescription: 'Register Page Eduvault',
    ogImage: 'https://telegra.ph/file/3d527b3c2acad3834650f.png',
})
</script>
<template>
    <div class="authentication">
        <v-container fluid class="pa-3">
            <v-row class="h-100vh d-flex justify-center align-center">
                <v-col cols="12" lg="4" xl="3" class="d-flex align-center">
                    <v-card rounded="md" elevation="10" class="px-sm-1 px-0 withbg mx-auto" max-width="500">
                        <v-card-item class="pa-sm-8">
                            <div class="d-flex justify-center py-4 text-h1 font-weight-bold">
                                EduVault
                            </div>
                            <div class="text-body-1 text-muted text-center mb-3">Buat Akun Guru</div>
                            <AuthRegisterFormGuru />
                            <h6 class="text-h6 text-muted font-weight-medium d-flex justify-center align-center mt-3">
                                Sudah Punya Akun?
                                <NuxtLink to="/auth/login"
                                    class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium pl-2">
                                    Klik disini</NuxtLink>
                            </h6>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
