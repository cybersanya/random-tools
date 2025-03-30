<template>
  <div class="card flex justify-center">
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu } from 'primevue'
import { type MenuItem } from 'primevue/menuitem'

const items = ref<MenuItem[]>([
  { label: 'Главная', icon: 'pi pi-home', route: '/' },
  { label: 'Сортировщик', icon: 'pi pi-sort', route: '/sorter' },
])
</script>
