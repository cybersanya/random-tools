import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './pages/Home.vue'
import SorterView from './pages/Sorter.vue'
import DandelionsView from './pages/Dandelions.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/sorter', component: SorterView },
  { path: '/dandelions', component: DandelionsView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
