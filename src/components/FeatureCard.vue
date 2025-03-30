<template>
  <Card>
    <template #title>
      <span :class="icon" />
      {{ title }}
    </template>
    <template #content>
      <p class="card-content">
        {{ description }}
      </p>
    </template>
    <template #footer>
      <Button :label="button" @click="router.push(route)" />
    </template>
  </Card>
</template>

<script setup lang="ts">
import { Card, Button } from 'primevue'
import { useRouter, type RouteLocationRaw } from 'vue-router'

const router = useRouter()

const { title, description, button, route, icon } = defineProps<{
  title: string
  description: string
  button: string
  route: RouteLocationRaw
  icon: string
}>()
</script>

<style scoped>
.card-content {
  margin: 0 0 8px;
}
</style>
