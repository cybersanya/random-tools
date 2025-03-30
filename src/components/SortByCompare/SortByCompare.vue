<script setup lang="ts">
import { ref } from 'vue'
import FirstStep from './parts/FirstStep.vue'
import SecondStep from './parts/SecondStep.vue'
import ThirdStep from './parts/ThirdStep.vue'

const currentStep = ref('1')
const options = ref<string[]>([])

function handleFirstStepSubmit(value: string[]) {
  options.value = value
  currentStep.value = '2'
}

const sortedOptions = ref<string[]>([])
function handleSecondStepSubmit(value: string[]) {
  sortedOptions.value = value
  currentStep.value = '3'
}

function reset() {
  currentStep.value = '1'
}
</script>

<template>
  <div class="sorter">
    <FirstStep v-if="currentStep === '1'" @continue="handleFirstStepSubmit" />
    <SecondStep
      v-if="currentStep === '2'"
      class="step"
      :options
      @submit="handleSecondStepSubmit"
      @reset="reset"
    />
    <ThirdStep
      v-if="currentStep === '3'"
      class="step"
      :options="sortedOptions"
      @reset="reset"
    />
  </div>
</template>

<style scoped>
.step-wrapper {
  padding: 8px;
}

.sorter {
  --p-stepper-transition-duration: 0;
}
</style>
