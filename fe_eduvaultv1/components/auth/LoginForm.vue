<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const config = useRuntimeConfig()

const router = useRouter();
const email = ref('');
const password = ref('');
const passwordShow = ref(false);
const passwordType = ref('password');

async function login() {
    const { data } = await useFetch(config.public.apiBase + '/api/login', {
        method: 'POST',
        body: JSON.stringify({
            email: email.value,
            password: password.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let res = data.value;
    if (res.message === "Email not found") {
        alert('Email not found');
    } else if (res.message === "Invalid password") {
        alert('Password not match');
    } else {
        sessionStorage.setItem('userData', JSON.stringify(res.data));
        router.push('/');
    }
}

async function showPassword() {
    passwordShow.value = !passwordShow.value;
    if (passwordShow.value) {
        passwordType.value = 'text';
    } else {
        passwordType.value = 'password';
    }
}



</script>

<template>
    <v-row class="d-flex mb-3">
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Email</v-label>
            <v-text-field variant="outlined" hide-details color="primary" v-model="email"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Password</v-label>
            <v-text-field variant="outlined" :type="passwordType" hide-details color="primary" v-model="password"
                :append-inner-icon="passwordShow ? 'mdi-lock-outline' : 'mdi-lock-off-outline'"
                @click:append-inner="showPassword()"></v-text-field>
        </v-col>
        <v-col cols="12" class="pt-0">
            <div class="d-flex flex-wrap align-center ml-n2">
            </div>
        </v-col>
        <v-col cols="12" class="pt-0">
            <v-btn @click="login()" color="primary" size="large" block flat>Masuk</v-btn>
        </v-col>
    </v-row>
</template>
