<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const config = useRuntimeConfig()

const createUser = ref({
    id_kelas: '',
    id_sekolah: '',
    full_name: '',
    email: '',
    password: '',
    role: '',
});


const sekolah = ref([]);
const kelas = ref([]);
const passwordShow = ref(false);
const passwordType = ref('password');

async function showPassword() {
    passwordShow.value = !passwordShow.value;
    if (passwordShow.value) {
        passwordType.value = 'text';
    } else {
        passwordType.value = 'password';
    }
}

async function getSekolah() {
    const { data } = await useFetch(config.public.apiBase + '/api/sekolah', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let res = data.value;
    sekolah.value = res;
    console.log(res);

}

async function getKelas() {
    const { data } = await useFetch(config.public.apiBase + '/api/kelas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let res = data.value;
    kelas.value = res;
    console.log(res);

}

async function register() {
    if (createUser.value.id_kelas == '' || createUser.value.id_sekolah == '' || createUser.value.full_name == '' || createUser.value.email == '' || createUser.value.password == '') {
        alert('Please fill all field');
        return;
    } else {
        const { data } = await useFetch(config.public.apiBase + '/api/register', {
            method: 'POST',
            body: (() => {
                const formData = new FormData();
                formData.append('id_kelas', createUser.value.id_kelas);
                formData.append('id_sekolah', createUser.value.id_sekolah);
                formData.append('full_name', createUser.value.full_name);
                formData.append('email', createUser.value.email);
                formData.append('password', createUser.value.password);
                formData.append('role', 'siswa');
                return formData;
            })(),
            headers: {
            }
        });
        let res = data.value;
        alert('Success create account > Please login to continue');
        router.push('/auth/login');
    }
}

onMounted(() => {
    getSekolah();
    getKelas();
});

watchEffect(() => {
    getSekolah();
    getKelas();
});

</script>

<template>
    <v-row class="d-flex mb-3">
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">FullName</v-label>
            <v-text-field v-model="createUser.full_name" variant="outlined" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Email</v-label>
            <v-text-field v-model="createUser.email" variant="outlined" type="email" hide-details
                color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Sekolah</v-label>
            <v-select v-model="createUser.id_sekolah" item-title="namaSekolah" item-value="id" variant="outlined"
                :items="sekolah || []"></v-select>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Kelas</v-label>
            <v-select v-model="createUser.id_kelas" item-title="namaKelas" item-value="id" variant="outlined"
                :items="kelas.sort((a, b) => a.namaKelas.localeCompare(b.namaKelas))"></v-select>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Password</v-label>
            <v-text-field variant="outlined" :type="passwordType" hide-details color="primary" v-model="createUser.password"
                :append-inner-icon="passwordShow ? 'mdi-lock-outline' : 'mdi-lock-off-outline'"
                @click:append-inner="showPassword()"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-btn @click="register()" color="primary" size="large" block flat>Buat Akun</v-btn>
        </v-col>
    </v-row>
</template>
