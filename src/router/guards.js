import { authStore } from '@/store/auth';

export function requireAuth(to, from, next) {
  if (!authStore.isAuthenticated()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}

export function redirectIfAuthenticated(to, from, next) {
  if (authStore.isAuthenticated()) {
    next('/dashboard');
  } else {
    next();
  }
} 