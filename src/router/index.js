import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'storefront',
      component: { render: () => null },
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../components/AdminDashboard.vue'),
    },
  ],
})

export default router
