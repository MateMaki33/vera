import { createRouter, createWebHistory } from 'vue-router'
import AssessmentView from '../views/AssessmentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'assessment',
      component: AssessmentView,
    },
    {
      path: '/aviso-legal',
      name: 'legal',
      component: () => import('@/views/LegalView.vue'),
    },
  ],
})

export default router
