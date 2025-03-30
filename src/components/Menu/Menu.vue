<template>
  <div v-if="isDesktop">
    <MenuContent />
  </div>
  <template v-else>
    <Toolbar
      class="toolbar"
      style="
        --p-toolbar-border-color: transparent;
        --p-toolbar-border-radius: transparent;
      "
    >
      <template #start>
        <Button
          icon="pi pi-bars"
          class="mr-2"
          severity="secondary"
          text
          @click="isVisibleMenu = true"
        />
        Random Tøøls
      </template>
    </Toolbar>
    <Drawer
      v-model:visible="isVisibleMenu"
      style="
        --p-menu-border-color: transparent;
        --p-drawer-border-color: transparent;
      "
    >
      <template #container>
        <MenuContent />
      </template>
    </Drawer>
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MenuContent from './MenuContent.vue'
import { useBreakpoints } from '../../composables'
import { Drawer, Toolbar, Button } from 'primevue'
import { useRouter } from 'vue-router'

const { isDesktop } = useBreakpoints()

const isVisibleMenu = ref(false)

useRouter().beforeEach(() => {
  isVisibleMenu.value = false
})
</script>

<style scoped>
.toolbar {
  position: sticky;
  top: 0;
}
</style>
