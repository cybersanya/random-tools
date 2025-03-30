<template>
  <div class="container">
    <Menu />
    <div class="main">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from './components/Menu/Menu.vue'
</script>

<style>
body {
  margin: 0;
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
  padding: 32px;
}

.main {
  flex-grow: 1;
}

@media screen and (max-width: 700px) {
  .container {
    flex-direction: column;
    gap: 16px;
    padding: 0;
  }

  .main {
    padding: 16px;
  }
}
</style>
