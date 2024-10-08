import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PositivityPrayers from '../components/PositivityPrayers.vue'
import ProtectionPrayers from '../components/ProtectionPrayers.vue'
import TravelingPrayers from '../components/TravelingPrayers.vue'
import Salawat from '../components/Salawat.vue'
import Fatiha from '../components/Fatiha.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/positivity-prayers',
    name: 'PositivityPrayers',
    component: PositivityPrayers
  },
  ,
  {
    path: '/protection-prayers',
    name: 'ProtectionPrayers',
    component: ProtectionPrayers
  },
  ,
  {
    path: '/traveling-prayers',
    name: 'TravelingPrayers',
    component: TravelingPrayers
  },
  {
    path: '/salawat',
    name: 'Salawat',
    component: Salawat
  },
  {
    path: '/fatiha',
    name: 'Fatiha',
    component: Fatiha
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: Home // or create a dedicated NotFound component
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router