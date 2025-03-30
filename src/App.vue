<script setup lang="ts">
import { ref } from 'vue'
import FirstStep from './components/FirstStep.vue'
import SecondStep from './components/SecondStep.vue'
import ThirdStep from './components/ThirdStep.vue'

const step = ref(0)
const options = ref<string[]>([])

function handleFirstStepSubmit(value: string[]) {
  options.value = value
  step.value = 1
}

const sortedOptions = ref<string[]>([])
function handleSecondStepSubmit(value: string[]) {
  sortedOptions.value = value
  step.value = 2
}

function reset() {
  step.value = 0
}
</script>

<template>
  <div class="container">
    <FirstStep v-if="step === 0" @continue="handleFirstStepSubmit" />
    <SecondStep
      v-else-if="step === 1"
      :options
      @submit="handleSecondStepSubmit"
      @reset="reset"
    />
    <ThirdStep v-else-if="step === 2" :options="sortedOptions" @reset="reset" />
  </div>
</template>

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
  max-width: 800px;
  margin: 0 auto;
}
</style>
