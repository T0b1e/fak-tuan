import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import ContactView from '@/views/ContactView.vue'
import PrivacyView from '@/views/PrivacyView.vue'
import AuthView from '@/views/AuthView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',        component: LandingView },
    { path: '/contact', component: ContactView },
    { path: '/privacy', component: PrivacyView },
    { path: '/auth',    component: AuthView },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
