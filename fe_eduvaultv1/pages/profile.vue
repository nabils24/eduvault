<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import Auth from '@/components/auth/auth.vue';

const user = ref([]);
const kelasid = ref(0);
const kelas = ref([]);
const id = ref(0);

async function saveProfile() {
    const { data } = await useFetch('http://localhost:3333/api/users/' + id.value, {
        method: 'PUT',
        body: JSON.stringify({
            id_sekolah: user.value.id_sekolah,
            id_kelas: user.value.id_kelas,
            full_name: user.value.fullName,
            email: user.value.email,
            role: user.value.role
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    alert('Data berhasil diubah');
    sessionStorage.setItem('userData', JSON.stringify(data.value));


}
async function getKelas() {
    const { data } = await useFetch('http://localhost:3333/api/kelas/' + kelasid.value, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    kelas.value = data.value;
}


onMounted(async () => {
    id.value = JSON.parse(sessionStorage.getItem('userData')).id;
    kelasid.value = JSON.parse(sessionStorage.getItem('userData')).idKelas;
    user.value = JSON.parse(sessionStorage.getItem('userData'));

    await getKelas();
});


useSeoMeta({
    title: 'Profile',
    ogTitle: 'Profile',
    description: 'Profile Page Eduvault',
    ogDescription: 'Profile Page Eduvault',
    ogImage: 'https://telegra.ph/file/3d527b3c2acad3834650f.png',
})

</script>

<template>
    <Auth />
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Profil Saya">
                <v-row justify="start">
                    <v-col cols="12" md="12">
                        <v-row>
                            <v-col cols="12">
                                <v-row class="pa-5">
                                    <v-col cols="12">
                                        <v-text-field label="Nama" v-model="user.fullName" outlined dense
                                            class="mb-2"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Email" v-model="user.email" outlined dense
                                            class="mb-2"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Kelas" v-model="kelas.namaKelas" readonly outlined
                                            dense></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Role" v-model="user.role" readonly outlined
                                            dense></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" md="12" class="pa-5" justify="end">
                                <v-btn color="primary" @click="saveProfile()">Simpan</v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </UiParentCard>
        </v-col>
    </v-row>
</template>
