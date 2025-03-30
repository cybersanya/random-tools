<script setup lang="ts">
import { Chip, Button } from 'primevue'

const { options } = defineProps<{
  options: string[]
}>()

const emit = defineEmits<{
  reset: []
}>()
</script>

<template>
  <h4>Итоговый рейтинг</h4>
  <div class="options">
    <Chip v-for="(option, index) in options" :key="index">
      {{ index + 1 }}. {{ option }}
    </Chip>
  </div>

  <div class="actions">
    <Button label="Начать с начала" @click="emit('reset')" />
  </div>
</template>

<style scoped>
h4 {
  margin: 0;
}
.options {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.actions {
  margin-top: 48px;
}
</style>
