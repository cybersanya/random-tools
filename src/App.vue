<script setup lang="ts">
import { Textarea } from 'primevue'
import { ref } from 'vue'

const optionsAsText = ref('')
</script>

<template>
  <Textarea v-model="optionsAsText" rows="10" auto-resize />
</template>

<style>
body {
  font-family:
    system-ui,
    -apple-system,
    Roboto,
    sans-serif;
}
</style>
