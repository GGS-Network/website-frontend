import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Status from '../views/Status.vue'
import Logout from '../views/Logout.vue'
import Profile from '../views/Profile.vue'
import Privacy from '../views/Privacy.vue'
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
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: redirectIfAuthenticated
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: checkRegistrationEnabled
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: requireAuth
  },
  {
    path: '/status',
    name: 'Status',
    component: Status
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: requireAuth
  },
  {
    path: '/datenschutz',
    name: 'Privacy',
    component: Privacy
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

// Globaler Navigation Guard
router.beforeEach((to, from, next) => {
  // Prüfe Token-Gültigkeit bei jeder Navigation
  if (authStore.token) {
    // Optional: Hier können Sie die Token-Gültigkeit prüfen
  }
  next();
});

export default router 