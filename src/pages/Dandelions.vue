<template>
  <div class="dandelions" :class="breakpointClass">
    <div class="field">
      <div v-for="(row, y) in transposedMatrix" :key="y" class="row">
        <div
          v-for="cell in row"
          :key="cell.x"
          class="cell"
          :class="{
            active: cell.status !== 'flower' && currentMove === 'dandelions',
          }"
          @click="plantFlower(cell.x, cell.y)"
        >
          <span v-if="cell.status === 'flower'" class="pi pi-asterisk" />
          <span
            v-if="cell.status === 'seed'"
            class="pi pi-circle"
            style="font-size: 0.7rem"
          />
        </div>
      </div>
    </div>
    <div class="rose">
      <Button
        v-for="(_offset, direction) in roseConfig"
        :key="direction"
        :disabled="usedDirections.has(direction) || currentMove !== 'wind'"
        :severity="currentMove === 'wind' ? 'primary' : 'secondary'"
        :outlined="usedDirections.has(direction)"
        rounded
        :icon="`pi pi-arrow-${direction}`"
        :class="direction"
        @click="spreadSeeds(direction)"
      />
    </div>
    <div class="actions">
      <Button
        label="Начать заново"
        fluid
        :severity="isGameEnded ? 'primary' : 'secondary'"
        @click="reset"
      />
    </div>
  </div>
  <Dialog
    v-model:visible="isVisibleWinDialog"
    modal
    header="Победа"
    :style="{ width: '25rem' }"
  >
    <p class="win-text">{{ winDialogText }}</p>
    <div class="flex justify-end gap-2">
      <Button label="Начать заново" fluid @click="reset" />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button, Dialog } from 'primevue'
import { useBreakpoints } from '../composables'

const { breakpointClass } = useBreakpoints()

interface FieldCell {
  x: number
  y: number
  status: 'empty' | 'flower' | 'seed'
}

const fieldMatrix = ref<FieldCell[][]>([])

function transpose<T>(matrix: T[][]) {
  return matrix[0].map((_col, i) => matrix.map((row) => row[i]))
}

const transposedMatrix = computed(() => transpose(fieldMatrix.value))

const dimension = ref(5)

function initMatrix() {
  fieldMatrix.value = Array(dimension.value)
    .fill([])
    .map((_item, x) =>
      Array(dimension.value)
        .fill(null)
        .map((_item, y) => ({
          x,
          y,
          status: 'empty',
        })),
    )
}

initMatrix()

const flowerCoordinates = ref<[number, number][]>([])

function plantFlower(x: number, y: number) {
  if (
    currentMove.value !== 'dandelions' ||
    fieldMatrix.value[x][y].status === 'flower'
  )
    return
  currentMove.value = 'wind'
  fieldMatrix.value[x][y].status = 'flower'
  flowerCoordinates.value.push([x, y])

  checkWinningConditions()
}

type Direction =
  | 'up'
  | 'left'
  | 'right'
  | 'down'
  | 'up-right'
  | 'up-left'
  | 'down-left'
  | 'down-right'

const roseConfig: Record<Direction, [number, number]> = {
  up: [0, -1],
  'up-left': [-1, -1],
  'up-right': [1, -1],
  left: [-1, 0],
  right: [1, 0],
  'down-left': [-1, 1],
  'down-right': [1, 1],
  down: [0, 1],
}

function spreadSeeds(direction: Direction) {
  if (currentMove.value !== 'wind') return
  currentMove.value = 'dandelions'
  const [offsetX, offsetY] = roseConfig[direction]
  usedDirections.value.add(direction)

  flowerCoordinates.value.forEach(([x, y]) => {
    let cx = x
    let cy = y

    const n = dimension.value

    while (cx < n && cx >= 0 && cy < n && cy >= 0) {
      const currentStatus = fieldMatrix.value[cx][cy].status
      fieldMatrix.value[cx][cy].status =
        currentStatus === 'flower' ? 'flower' : 'seed'
      cx += offsetX
      cy += offsetY
    }
  })

  checkWinningConditions()
}

function checkWinningConditions() {
  if (
    fieldMatrix.value.every((row) =>
      row.every((cell) => cell.status !== 'empty'),
    )
  ) {
    currentMove.value = null
    handleDandelionsWin()
  } else if (
    flowerCoordinates.value.length === 7 &&
    currentMove.value === 'dandelions'
  ) {
    currentMove.value = null
    handleWindWin()
  }
}

const isVisibleWinDialog = ref(false)
const winDialogText = ref('')

function handleDandelionsWin() {
  winDialogText.value = 'Одуванчики победили'
  isVisibleWinDialog.value = true
}

function handleWindWin() {
  winDialogText.value = 'Ветер победил'
  isVisibleWinDialog.value = true
}

const usedDirections = ref<Set<Direction>>(new Set())

function reset() {
  flowerCoordinates.value = []
  usedDirections.value.clear()
  currentMove.value = 'dandelions'
  initMatrix()
  isVisibleWinDialog.value = false
}

const currentMove = ref<'wind' | 'dandelions' | null>('dandelions')
const isGameEnded = computed(() => !currentMove.value)
</script>

<style scoped>
.dandelions {
  display: grid;
  gap: 32px;
  grid-template-areas:
    'field rose'
    'field actions';

  grid-auto-columns: 1fr;
  align-items: center;
  justify-items: center;

  &.bp-mobile {
    justify-content: center;
    grid-template-areas:
      'field'
      'rose'
      'actions';

    gap: 16px;
  }
}

.actions {
  margin-top: 32px;
  grid-area: actions;
}
.field {
  grid-area: field;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: clamp(250px, 70vw, 350px);
}
.row {
  display: flex;
  gap: 8px;
}
.cell {
  flex: 1 0;
  aspect-ratio: 1/1;
  box-shadow: 0 0 0 1px var(--p-surface-500);
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  opacity: 0.7;

  &.active {
    box-shadow: 0 0 0 1px var(--p-primary-400);
  }
}

.rose {
  grid-area: rose;
  flex-shrink: 0;
  --rose-scale: 70px;

  position: relative;
  height: calc(var(--rose-scale) * 2 + 40px);
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;

  --offset-f: var(--rose-scale);
  --offset-d: calc(var(--offset-f) * 0.7);
  --offset-fn: calc(var(--offset-f) * -1);
  --offset-dn: calc(var(--offset-f) * -0.7);

  > * {
    position: absolute;
  }

  .up {
    transform: translate(0, var(--offset-fn));
  }
  .up-left {
    transform: translate(var(--offset-dn), var(--offset-dn));
  }
  .up-right {
    transform: translate(var(--offset-d), var(--offset-dn));
  }
  .left {
    transform: translate(var(--offset-fn), 0);
  }
  .right {
    transform: translate(var(--offset-f), 0);
  }
  .down {
    transform: translate(0, var(--offset-f));
  }
  .down-left {
    transform: translate(var(--offset-dn), var(--offset-d));
  }
  .down-right {
    transform: translate(var(--offset-d), var(--offset-d));
  }
}

.win-text {
  margin-top: 0;
  margin-bottom: 16px;
}
</style>
