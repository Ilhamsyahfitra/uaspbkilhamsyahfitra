<template>
  <div class="post-app">
    <h1>Postingan Pengguna</h1>
    <div class="filters">
      <label for="userSelect">Pilih Pengguna:</label>
      <select v-model="selectedUser" @change="loadPosts">
        <option v-for="user in users" :value="user.id">{{ user.name }}</option>
      </select>
    </div>
    <div v-if="posts.length > 0">
      <ul>
        <li v-for="post in posts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Tidak ada postingan untuk pengguna yang dipilih.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const selectedUser = ref('')
const users = ref([])
const posts = ref([])

function loadPosts() {
  if (!selectedUser.value) return
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`)
    .then(response => response.json())
    .then(data => {
      posts.value = data
    })
    .catch(error => console.error('Error fetching posts:', error))
}

onMounted(() => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
      users.value = data
      if (data.length > 0) {
        selectedUser.value = data[0].id
        loadPosts()
      }
    })
    .catch(error => console.error('Error fetching users:', error))
})
</script>

<style scoped>
/* gaya mirip dengan App.vue sebelumnya */
</style>
