<script setup lang="ts">
import { Textarea, Button, Chip } from 'primevue'
import { computed, ref } from 'vue'

const optionsAsText = ref('apple\nbanana\norange')
const splitOptions = computed(() =>
  optionsAsText.value
    .split(/[\n;,]+/)
    .map((x) => x.trim())
    .filter(Boolean),
)

const emit = defineEmits<{
  continue: [string[]]
}>()

function submit() {
  emit('continue', splitOptions.value)
}
</script>

<template>
  <h4>Введи список который нужно отсортировать</h4>
  <p>Элементы могут быть разделены переносом строки или запятой</p>
  <Textarea v-model="optionsAsText" rows="5" auto-resize fluid />
  <p>Итоговый список:</p>
  <div v-if="splitOptions.length" class="options">
    <Chip v-for="(option, index) in splitOptions" :key="index">
      {{ index + 1 }}. {{ option }}
    </Chip>
  </div>
  <div v-else>Пока нет элементов</div>
  <div class="actions">
    <Button label="Продолжить" @click="submit" />
  </div>
</template>

<style scoped>
h4 {
  margin: 0;
}
.options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.actions {
  margin-top: 48px;
}
</style>
