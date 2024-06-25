<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          My Photo Albums
        </q-toolbar-title>
        <q-btn flat @click="goTo('/todos')">Todos</q-btn>
        <q-btn flat @click="goTo('/posts')">Posts</q-btn>
        <q-btn flat @click="goTo('/albums')">Albums</q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const goTo = (path) => {
      router.push(path);
    };

    return {
      goTo
    };
  }
};
</script>
