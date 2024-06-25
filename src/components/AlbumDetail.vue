<template>
  <q-page>
    <q-page-container>
      <q-page class="q-pa-md">
        <q-list bordered>
          <q-item-label header class="text-h4 q-mb-md">Photos</q-item-label>
          <Loader v-if="isLoading" />
          <div v-else class="photos-grid">
            <q-img
              v-for="photo in photos"
              :key="photo.id"
              :src="photo.thumbnailUrl"
              @click="showPhoto(photo.url)"
              class="photo-thumbnail"
            />
          </div>
        </q-list>
      </q-page>
    </q-page-container>
    <q-dialog v-model="isDialogOpen">
      <q-card>
        <q-img :src="selectedPhoto" class="full-photo" />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { useAlbumStore } from '../stores/store';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Loader from './Loader.vue';

export default {
  components: {
    Loader,
  },
  setup() {
    const albumStore = useAlbumStore();
    const route = useRoute();

    const isDialogOpen = ref(false);
    const selectedPhoto = ref('');

    const loadPhotos = async () => {
      await albumStore.fetchPhotos(route.params.id);
    };

    onMounted(loadPhotos);
    watch(() => route.params.id, loadPhotos);

    const showPhoto = (url) => {
      selectedPhoto.value = url;
      isDialogOpen.value = true;
    };

    return {
      photos: albumStore.photos[route.params.id] || [],
      isLoading: albumStore.isLoading,
      showPhoto,
      isDialogOpen,
      selectedPhoto
    };
  }
};
</script>

<style scoped>
.photos-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.photo-thumbnail {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.photo-thumbnail:hover {
  transform: scale(1.1);
}
.full-photo {
  width: 100%;
  height: auto;
}
</style>
