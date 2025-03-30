<script setup lang="ts">
import { Button } from 'primevue'
import { sortAsync } from '../utils/sortAsync'
import { ref } from 'vue'
import { until } from '@vueuse/core'

const { options } = defineProps<{
  options: string[]
}>()

const firstOption = ref('')
const secondOption = ref('')
const compareResult = ref<null | -1 | 1>(null)

async function compare(optionA: string, optionB: string) {
  compareResult.value = null
  firstOption.value = optionA
  secondOption.value = optionB

  await until(compareResult).not.toBeNull()

  return compareResult.value!
}

const emit = defineEmits<{
  submit: [string[]]
  reset: []
}>()

sortAsync(options, compare).then((result) => {
  emit('submit', result)
})
</script>

<template>
  <h4>Что лучше?</h4>
  <div class="choise">
    <Button size="large" :label="firstOption" @click="compareResult = 1" />
    или
    <Button size="large" :label="secondOption" @click="compareResult = -1" />
  </div>
  <div class="actions">
    <Button label="Назад" severity="secondary" @click="emit('reset')" />
  </div>
</template>

<style scoped>
.options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.choise {
  display: flex;
  gap: 16px;
  align-items: center;
}

.actions {
  margin-top: 48px;
}
</style>
