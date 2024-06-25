import { defineStore } from 'pinia';
import axios from 'axios';

export const useAlbumStore = defineStore('albumStore', {
  state: () => ({
    albums: [],
    photos: {},
    isLoading: false,
  }),
  actions: {
    async fetchAlbums() {
      this.isLoading = true;
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
        this.albums = response.data;
      } catch (error) {
        console.error('Failed to fetch albums:', error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchPhotos(albumId) {
      this.isLoading = true;
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
        this.photos = { ...this.photos, [albumId]: response.data };
      } catch (error) {
        console.error('Failed to fetch photos:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }
});
