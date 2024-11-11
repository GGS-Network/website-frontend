import { ref } from 'vue';
import api from '@/services/api';
import router from '@/router';
import { toastService } from '@/services/toast.service';

export const authStore = {
  user: ref(JSON.parse(localStorage.getItem('user')) || null),
  token: ref(localStorage.getItem('token') || null),
  sessionCheckInterval: null,

  setAuth(token, user) {
    this.token.value = token;
    this.user.value = user;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.startSessionCheck();
  },

  clearAuth() {
    this.token.value = null;
    this.user.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.stopSessionCheck();
  },

  isAuthenticated() {
    return !!this.token.value;
  },

  async checkSession() {
    try {
      const response = await api.get('/auth/check-session', {
        headers: {
          Authorization: `Bearer ${this.token.value}`
        }
      });
      
      if (!response.data.valid) {
        this.handleSessionExpired();
      }
    } catch (error) {
      if (error.response?.status === 401) {
        this.handleSessionExpired();
      }
    }
  },

  handleSessionExpired() {
    this.clearAuth();
    toastService.sessionExpired();
    router.push('/login?session=expired');
  },

  startSessionCheck() {
    this.stopSessionCheck(); // Stoppe vorherige Intervalle
    this.sessionCheckInterval = setInterval(() => {
      if (this.isAuthenticated()) {
        this.checkSession();
      }
    }, 30000); // Alle 30 Sekunden prüfen
  },

  stopSessionCheck() {
    if (this.sessionCheckInterval) {
      clearInterval(this.sessionCheckInterval);
      this.sessionCheckInterval = null;
    }
  }
}; 