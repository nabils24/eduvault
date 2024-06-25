<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue';
import sidebarItems from '@/components/layout/full/vertical-sidebar/sidebarItem';
import sidebarItemsGuru from '@/components/layout/full/vertical-sidebar/sidebarGuru';
import { Menu2Icon } from 'vue-tabler-icons';
const sidebarMenu = shallowRef(sidebarItems);
const sidebarGuru = shallowRef(sidebarItemsGuru);
const sDrawer = ref(true);

const user = ref([]);
const guru = ref(false);
const siswa = ref(false);

function checkRole() {
    const user = JSON.parse(sessionStorage.getItem('userData'));
    console.log(user.role);
    if (user.role === 'guru') {
        guru.value = true;
        siswa.value = false;
    } else {
        siswa.value = true;
        guru.value = false;
    }
}

onMounted(() => {
    user.value = sessionStorage.getItem('userData');
    checkRole();

});

</script>

<template>
    <!------Sidebar-------->
    <v-navigation-drawer left elevation="0" app class="leftSidebar" v-model="sDrawer">
        <!---Logo part -->
        <div class="pa-5">
            <span class="text-h3 font-weight-bold">
                <BookIcon size="25" class="mr-3" />
                Eduvault
            </span>
        </div>
        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <div>
            <perfect-scrollbar class="scrollnavbar">
                <v-list class="pa-6">
                    <!---Menu Loop -->
                    <div :hidden="!siswa">
                        <template v-for="(item, i) in sidebarMenu">
                            <!---Item Sub Header -->
                            <LayoutFullVerticalSidebarNavGroup :item="item" v-if="item.header" :key="item.title" />

                            <!---Single Item-->
                            <LayoutFullVerticalSidebarNavItem :item="item" v-else class="leftPadding" />
                            <!---End Single Item-->
                        </template>
                    </div>
                    <!---Menu Loop -->
                    <div :hidden="!guru">
                        <template v-for="(item, i) in sidebarGuru" :hidden="!guru">
                            <!---Item Sub Header -->
                            <LayoutFullVerticalSidebarNavGroup :item="item" v-if="item.header" :key="item.title" />

                            <!---Single Item-->
                            <LayoutFullVerticalSidebarNavItem :item="item" v-else class="leftPadding" />
                            <!---End Single Item-->
                        </template>
                    </div>
                </v-list>
                <div class="pa-4">
                    <LayoutFullVerticalSidebarExtraBox />
                </div>
            </perfect-scrollbar>
        </div>

    </v-navigation-drawer>
    <!------Header-------->
    <v-app-bar elevation="0" height="70">
        <div class="d-flex align-center justify-space-between w-100">
            <div>
                <v-btn class="hidden-lg-and-up ms-md-3 ms-sm-5 ms-3 text-muted" @click="sDrawer = !sDrawer" icon
                    variant="flat" size="small">
                    <Menu2Icon size="20" stroke-width="1.5" />
                </v-btn>
                <!-- Notification -->
                <LayoutFullVerticalHeaderNotificationDD />
            </div>
            <div>
                <!-- User Profile -->
                <LayoutFullVerticalHeaderProfileDD />
            </div>
        </div>
    </v-app-bar>
</template>
