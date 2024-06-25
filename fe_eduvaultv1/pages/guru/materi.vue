<script setup lang="ts">
import { ref, onMounted, watchEffect, computed } from 'vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import Auth from '@/components/auth/auth.vue';
import { useRouter } from 'vue-router';
const router = useRouter();


const config = useRuntimeConfig()

const headers = [
  { title: 'Judul', align: 'start', key: 'judul' },
  { title: 'Deskripsi', align: 'start', key: 'deskripsi' },
  { title: 'Mapel', align: 'start', key: 'idMapel' },
  { title: 'file', align: 'start', key: 'file' },
  { title: 'Thumbnail', align: 'start', key: 'thumbnail' },
  { title: 'Actions', key: 'actions', sortable: false },
];

const materis = ref([]);
const mapels = ref([]);
let deleteId = ref(0);

const newMateri = ref({
  judul: '',
  deskripsi: '',
  idMapel: '',
  file: '',
  thumbnail: ''
});

const dialog = ref(false);

async function checkRole() {
  const role = JSON.parse(sessionStorage.getItem('userData')).role;
  if (role === 'guru') {
    return true;
  } else if (role === 'siswa') {
    router.push('/');
  }
}

function closeDialog() {
  dialog.value = false
  newMateri.value = {
    judul: '',
    deskripsi: '',
    idMapel: '',
    file: '',
    thumbnail: ''
  }
}
async function saveDialog() {
  const formData = new FormData();
  formData.append('judul', newMateri.value.judul);
  formData.append('deskripsi', newMateri.value.deskripsi);
  formData.append('id_mapel', newMateri.value.idMapel);
  formData.append('file', newMateri.value.file);
  formData.append('thumbnail', newMateri.value.thumbnail);

  const { data } = await useFetch(config.public.apiBase + '/api/materi', {
    method: 'POST',
    body: formData,
    headers: {
    }
  });
  if (data) {
    dialog.value = false
  }
  getMateri();
}


const dialogDelete = ref(false);

function closeDeleteDialog() {
  dialogDelete.value = false;
  deleteId.value = 0;
}
function openDeleteDialog(item) {
  dialogDelete.value = true;
  deleteId.value = item.id;
}
async function deleteMateri() {
  const { data } = await useFetch(config.public.apiBase + '/api/materi/' + deleteId.value, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  let res = data.value;
  console.log(res);
  getMateri();
  dialogDelete.value = false;
}

const dialogEdit = ref(false);
const editId = ref(0);

const editMateri = ref({
  judul: '',
  deskripsi: '',
  idMapel: '',
  file: '',
  thumbnail: ''
});

function closeEditDialog() {
  dialogEdit.value = false
  editMateri.value = {
    judul: '',
    deskripsi: '',
    idMapel: '',
    file: '',
    thumbnail: ''
  }
  editId.value = 0;
}

async function saveEditDialog() {
  const formData = new FormData();
  formData.append('judul', editMateri.value.judul);
  formData.append('deskripsi', editMateri.value.deskripsi);
  formData.append('id_mapel', editMateri.value.idMapel);
  formData.append('file', editMateri.value.file);
  formData.append('thumbnail', editMateri.value.thumbnail);

  const { data } = await useFetch(config.public.apiBase + '/api/materi/' + editId.value, {
    method: 'PUT',
    body: formData,
    headers: {
    }
  });
  if (data) {
    console.log(data.value);
    dialogEdit.value = false
    editId.value = 0;
    editMateri.value = {
      judul: '',
      deskripsi: '',
      idMapel: '',
      file: '',
      thumbnail: ''
    }
  }
  getMateri();
}

async function openeditMateri(item) {
  dialogEdit.value = true;
  editMateri.value = item;
  editId.value = item.id;
}

const mapelNames = ref({});

//Get Data
async function getMapels() {
  const { data } = await useFetch(config.public.apiBase + '/api/mapel', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  let res = data.value;
  mapels.value = res


}

async function getMateri() {
  const { data } = await useFetch(config.public.apiBase + '/api/materi', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  let res = data.value;
  materis.value = res


}



onMounted(() => {
  getMapels();
  getMateri();
  checkRole();
});

watchEffect(() => {
  getMateri();
  checkRole();
});

useSeoMeta({
  title: 'Materi Management',
  ogTitle: 'Materi Management',
  description: 'Materi Management Page Eduvault',
  ogDescription: 'Materi Management Page Eduvault',
  ogImage: 'https://telegra.ph/file/3d527b3c2acad3834650f.png',
})

const mapelLookup = computed(() => {
  const lookup = {};
  mapels.value.forEach(mapel => {
    lookup[mapel.id] = mapel.namaMapel;
  });
  return lookup;
});

</script>
<template>
  <Auth />
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Materi">
        <v-row justify="center" class="pa-5">
          <v-col cols="12" md="12">
            <v-data-table :headers="headers" :items="materis">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ props }">
                      <v-btn class="mb-2" color="primary" dark v-bind="props">
                        Tambah Materi
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">Tambah Materi</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" md="12" sm="6">
                              <v-text-field v-model="newMateri.judul" label="Judul Materi"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12" sm="6">
                              <v-text-field v-model="newMateri.deskripsi" label="Deskripsi"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12" sm="6">
                              <v-select label="Pilih Mapel" v-model="newMateri.idMapel" :items="mapels"
                                item-title="namaMapel" item-value="id"></v-select>
                            </v-col>
                            <!-- <v-col cols="12" md="6" sm="6">
                              <v-file-input v-model="newMateri.thumbnail" label="Thumbnail" chips></v-file-input>
                            </v-col> -->
                            <v-col cols="12" md="12" sm="6">
                              <v-file-input v-model="newMateri.file" label="File" chips></v-file-input>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="closeDialog()">
                          Cancel
                        </v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="saveDialog()">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogEdit" max-width="500px">
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">Edit Materi</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" md="12" sm="6">
                              <v-text-field v-model="editMateri.judul" label="Judul Materi"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12" sm="6">
                              <v-text-field v-model="editMateri.deskripsi" label="Deskripsi"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12" sm="6">
                              <v-select label="Select" v-model="editMateri.idMapel" :items="mapels" item-title="namaMapel"
                                item-value="id"></v-select>
                            </v-col>
                            <!-- <v-col cols="12" md="6" sm="6">
                              <v-file-input v-model="editMateri.thumbnail" label="Thumbnail" chips></v-file-input>
                            </v-col> -->
                            <v-col cols="12" md="12" sm="6">
                              <v-file-input v-model="editMateri.file" label="File" chips></v-file-input>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="closeEditDialog()">
                          Cancel
                        </v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="saveEditDialog()">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px" max-height="300px">
                    <v-card>
                      <v-card-title class="text-h5 text-center">Apakah Kamu yakin ingin menghapus ini?</v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="closeDeleteDialog()">Tidak</v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="deleteMateri()">OK</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.idMapel="{ value }">
                {{ mapelLookup[value] }}
              </template>
              <template v-slot:item.file="{ value }">
                <a :href="config.public.apiBase + '/api/materi/file/' + value" target="_blank">Download </a>
              </template>
              <template v-slot:item.thumbnail="{ value }">
                <a :href="config.public.apiBase + '/api/materi/thumbnail/' + value" target="_blank">Download </a>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon class="me-2" size="small" @click="openeditMateri(item)">
                  mdi-pencil
                </v-icon>
                <v-icon size="small" @click="openDeleteDialog(item)">
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
