import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Status from '../views/Status.vue'
import Privacy from '../views/Privacy.vue'
import Services from '../views/Services.vue'
import Features from '../views/Features.vue'
import { requireAuth, redirectIfAuthenticated } from './guards';
import { authStore } from '@/store/auth';

// Hilfsfunktion zur Überprüfung der Registrierungs-Einstellung
const isRegistrationEnabled = () => {
  return import.meta.env.VITE_ENABLE_REGISTRATION === 'true'
}

// Neuer Navigation Guard für die Registrierungsseite
const checkRegistrationEnabled = (to, from, next) => {
  if (!isRegistrationEnabled()) {
    next('/login') // Umleitung zum Login, wenn Registrierung deaktiviert ist
    return
  }
  redirectIfAuthenticated(to, from, next) // Bestehende Überprüfung
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/services',
    name: 'Services',
    component: Services
  },
  {
    path: '/status',
    name: 'Status',
    component: Status
  },
  {
    path: '/datenschutz',
    name: 'Privacy',
    component: Privacy
  },
  {
    path: '/vision',
    name: 'Vision',
    component: () => import('../views/Vision.vue')
  },
  {
    path: '/features',
    name: 'Features',
    component: Features
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  }
})

// Vereinfachter Global Guard
router.beforeEach((to, from, next) => {
  // Nur noch basic Routing-Logik
  next();
});

export default router 