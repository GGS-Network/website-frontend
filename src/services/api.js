import axios from 'axios';
import { authStore } from '@/store/auth';
import router from '@/router';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor
api.interceptors.request.use(config => {
  const token = authStore.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      authStore.clearAuth();
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export const auth = {
  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    if (!response.data.requiresVerification) {
      authStore.setAuth(response.data.token, response.data.user);
    }
    return response.data;
  },

  async verifyCode(code, tempToken) {
    const verifyApi = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tempToken}`
      }
    });

    const response = await verifyApi.post('/auth/verify-code', { code });
    if (response.data.token) {
      authStore.setAuth(response.data.token, response.data.user);
    }
    return response.data;
  },

  async resendCode(tempToken) {
    const verifyApi = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tempToken}`
      }
    });
    
    return await verifyApi.post('/auth/resend-code');
  },

  async register(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } finally {
      authStore.clearAuth();
      router.push('/login');
    }
  }
};

export default api; 