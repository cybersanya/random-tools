import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './pages/Home.vue'
import SorterView from './pages/Sorter.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/sorter', component: SorterView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
