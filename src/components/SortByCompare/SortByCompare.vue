<script setup lang="ts">
import { ref } from 'vue'
import { Stepper, StepPanels, StepList, Step, StepPanel } from 'primevue'
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
  <Stepper v-model:value="currentStep" :linear="true">
    <StepList>
      <Step value="1">Введи список</Step>
      <Step value="2">Сравни элементы</Step>
      <Step value="3">Получи рейтинг</Step>
    </StepList>
    <StepPanels>
      <StepPanel value="1">
        <div class="step-wrapper">
          <FirstStep
            v-if="currentStep === '1'"
            @continue="handleFirstStepSubmit($event)"
          />
        </div>
      </StepPanel>
      <StepPanel value="2">
        <div class="step-wrapper">
          <SecondStep
            v-if="currentStep === '2'"
            class="step"
            :options
            @submit="handleSecondStepSubmit"
            @reset="reset"
          />
        </div>
      </StepPanel>
      <StepPanel value="3">
        <div class="step-wrapper">
          <ThirdStep
            v-if="currentStep === '3'"
            class="step"
            :options="sortedOptions"
            @reset="reset"
          />
        </div>
      </StepPanel>
    </StepPanels>
  </Stepper>
</template>

<style scoped>
.step-wrapper {
  padding: 16px 32px 32px;
}
</style>
