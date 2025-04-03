import { createRouter, createWebHistory } from 'vue-router'
import museumOverview from '../pages/MuseumOverview.vue';
import IntelligentManagement from '../pages/IntelligentManagement.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'museumOverview',
      component: museumOverview
    },
    {
      path: '/',
      name: 'IntelligentManagement',
      component: IntelligentManagement
    }
  ]
})

export default router
