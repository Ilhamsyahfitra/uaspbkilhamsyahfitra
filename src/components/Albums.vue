<template>
  <q-page>
    <q-page-container>
      <q-page class="q-pa-md">
        <q-list bordered>
          <q-item-label header class="text-h4 q-mb-md">Albums</q-item-label>
          <Loader v-if="isLoading" />
          <q-item
            v-for="album in albums"
            :key="album.id"
            clickable
            @click="goToAlbum(album.id)"
          >
            <q-item-section>{{ album.title }}</q-item-section>
          </q-item>
        </q-list>
      </q-page>
    </q-page-container>
  </q-page>
</template>

<script>
import { useAlbumStore } from '../stores/store';
import { onMounted } from 'vue';
import Loader from './Loader.vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    Loader,
  },
  setup() {
    const albumStore = useAlbumStore();
    const router = useRouter();

    onMounted(() => {
      albumStore.fetchAlbums();
    });

    const goToAlbum = (albumId) => {
      router.push(`/albums/${albumId}`);
    };

    return {
      albums: albumStore.albums,
      isLoading: albumStore.isLoading,
      goToAlbum,
    };
  }
};
</script>
