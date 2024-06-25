<script setup lang="ts">
/*-For Set Blank Layout-*/
definePageMeta({
    layout: "blank",
});
useSeoMeta({
    title: 'Login',
    ogTitle: 'Login',
    description: 'Login Page Eduvault',
    ogDescription: 'Login Page Eduvault',
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
                            <v-row justify="center">
                                <img src="../../public/images/logos/logo_eduvault.png" alt="EduVault Logo"
                                    class="d-flex justify-center py-4" style="max-width: 235px;">
                            </v-row>
                            <AuthLoginForm />
                            <h6 class="text-h6 text-muted font-weight-medium d-flex justify-center align-center mt-3">
                                Pengguna baru?
                                <NuxtLink to="/auth/register"
                                    class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium pl-2">
                                    Buat akun</NuxtLink>
                            </h6>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
