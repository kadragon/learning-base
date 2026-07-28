import { createRouter, createWebHistory } from 'vue-router'
import MemberListView from '@/views/MemberListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'members',
      component: MemberListView,
    },
    {
      path: '/members/:id',
      name: 'member-detail',
      component: () => import('@/views/MemberDetailView.vue'),
    },
  ],
})

export default router
