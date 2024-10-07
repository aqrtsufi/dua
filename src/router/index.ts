import { createRouter, createWebHistory } from 'vue-router'
import PositivityPrayers from '../components/PositivityPrayers.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PositivityPrayers
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router