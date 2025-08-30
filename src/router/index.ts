import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Form from '../forms/MainForm.vue'
import Scheduler from '../components/SchedulerTest.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue'),
      component: HomeView,
    },
    {
      path: '/form',
      name: 'form',
      component: Form,
    },
    {
      path: '/scheduler',
      name: 'scheduler',
      component: Scheduler,
    },
  ],
})

export default router
