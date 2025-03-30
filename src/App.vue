<template>
  <div class="container">
    <Menu />
    <div class="main">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from './components/Menu.vue'
</script>

<style>
body {
  margin: 32px;
  font-family:
    system-ui,
    -apple-system,
    Roboto,
    sans-serif;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  gap: 32px;
}

.main {
  flex-grow: 1;
}
</style>
