<template>
  <Menu :model="items">
    <template #item="{ item, props }">
      <RouterLink
        v-if="item.route"
        v-slot="{ href, navigate }"
        :to="item.route"
        custom
      >
        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </RouterLink>
    </template>
  </Menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu } from 'primevue'

const items = ref([
  { label: 'Главная', icon: 'pi pi-home', route: '/' },
  { label: 'Сортировщик', icon: 'pi pi-sort', route: '/sorter' },
  { label: 'Одуванчики', icon: 'pi pi-asterisk', route: '/dandelions' },
])
</script>
