<template>
  <div class="loader">
    <q-spinner-dots size="50px" color="primary" />
  </div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
