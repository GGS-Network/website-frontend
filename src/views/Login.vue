<template>
  <div class="login-page">
    <!-- Session Expired Message -->
    <div v-if="sessionExpired" class="session-expired-banner">
      <div class="session-expired-content">
        <i class="bi bi-exclamation-circle"></i>
        <span>Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.</span>
        <button class="close-btn" @click="sessionExpired = false">
          <i class="bi bi-x"></i>
        </button>
      </div>
    </div>

    <div class="login-container">
      <div class="login-box">
        <div class="login-header">
          <svg class="logo-svg" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
            <g class="logo-icon">
              <path d="M40 35c0-6.627-5.373-12-12-12-1.4 0-2.743.24-4 .683C22.805 18.966 18.177 15.5 12.75 15.5 5.707 15.5 0 21.207 0 28.25c0 .55.035 1.092.103 1.623C.035 30.408 0 30.95 0 31.5 0 37.299 4.701 42 10.5 42h27c4.142 0 7.5-3.358 7.5-7.5z" 
                    fill="currentColor"/>
            </g>
          </svg>
          <h1>Dashboard Login</h1>
          <p>Melden Sie sich an, um fortzufahren</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <!-- OAuth Button vor dem Formular -->
          <button type="button" class="oauth-btn" @click="handleOAuthLogin">
            <i class="bi bi-shield-lock"></i>
            Login with GGS-Network OAuth
          </button>

          <!-- Trennlinie mit Text -->
          <div class="divider">
            <span>oder</span>
          </div>

          <div class="form-group">
            <label for="email">E-Mail</label>
            <div class="input-group">
              <input 
                type="email" 
                id="email"
                v-model="form.email" 
                required
                placeholder="max@mustermann.de"
              >
            </div>
          </div>

          <div class="form-group">
            <label for="password">Passwort</label>
            <div class="input-group">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password"
                v-model="form.password" 
                required
                placeholder="Passwort eingeben"
              >
              <button 
                type="button" 
                class="toggle-password"
                @click="showPassword = !showPassword"
              >
                <i class="bi" :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
              </button>
            </div>
          </div>

          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox" v-model="form.remember">
              <span>Angemeldet bleiben</span>
            </label>
            <a href="#" class="forgot-password">Passwort vergessen?</a>
          </div>

          <button type="submit" class="login-btn" :disabled="loading">
            <span v-if="!loading">Anmelden</span>
            <div v-else class="spinner"></div>
          </button>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>
        </form>

        <div class="login-footer">
          <p>Noch kein Account?</p>
          <router-link to="/register" class="register-link" v-if="isRegistrationEnabled">
            Jetzt registrieren
          </router-link>
          <router-link to="/" class="back-to-home">
            <i class="bi bi-arrow-left"></i>
            Zurück zur Website
          </router-link>
        </div>
      </div>
    </div>

    <VerificationModal
      v-if="showVerification"
      :tempToken="tempToken"
      @verified="handleVerified"
      @error="handleVerificationError"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth } from '@/services/api';
import VerificationModal from '@/components/VerificationModal.vue';

export default {
  name: 'Login',
  components: {
    VerificationModal
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
        remember: false
      },
      showPassword: false,
      loading: false,
      error: null,
      showVerification: false,
      tempToken: null
    }
  },
  created() {
    this.sessionExpired = this.$route.query.session === 'expired';
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.error = null;

      try {
        const response = await auth.login({
          email: this.form.email,
          password: this.form.password,
          remember: this.form.remember
        });

        if (response.requiresVerification) {
          this.tempToken = response.tempToken;
          this.showVerification = true;
        } else {
          // Normale Login-Weiterleitung
          const redirect = this.$route.query.redirect || '/dashboard';
          this.$router.push(redirect);
        }
      } catch (err) {
        console.error('Login error:', err);
        this.error = err.response?.data?.message || 'Anmeldung fehlgeschlagen';
      } finally {
        this.loading = false;
      }
    },

    handleVerified(data) {
      // Erfolgreiche Verifikation
      this.showVerification = false;
      const redirect = this.$route.query.redirect || '/dashboard';
      this.$router.push(redirect);
    },

    handleVerificationError(error) {
      this.error = error;
    }
  },
  computed: {
    isRegistrationEnabled() {
      return import.meta.env.VITE_ENABLE_REGISTRATION === 'true'
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 420px;
  margin-top: 60px; /* Platz für Banner */
}

.login-box {
  background: var(--color-white);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.login-header {
  background: var(--color-light);
  padding: 30px;
  text-align: center;
}

.logo-svg {
  height: 50px;
  width: auto;
  color: var(--color-primary);
  margin-bottom: 20px;
}

.login-header h1 {
  font-size: 24px;
  color: var(--color-primary);
  margin: 0 0 10px;
}

.login-header p {
  color: var(--color-default);
  margin: 0;
  opacity: 0.7;
}

.login-form {
  padding: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: var(--color-default);
  font-weight: 500;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--color-light);
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  width: 100%;
}

.input-group:focus-within {
  background: var(--color-white);
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(72, 52, 212, 0.1);
}

.input-group input {
  width: 100%;
  padding: 15px 45px 15px 15px;
  border: none;
  background: transparent;
  color: var(--color-default);
  font-size: 16px;
}

.input-group i:not(.toggle-password i) {
  position: absolute;
  right: 15px;
  color: var(--color-primary);
  font-size: 20px;
}

.toggle-password {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: var(--color-default);
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-password:hover {
  opacity: 1;
}

.toggle-password i {
  font-size: 20px;
  color: var(--color-primary);
}

.input-group input::placeholder {
  color: #a0aec0;
}

.input-group input:focus {
  outline: none;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.remember-me input {
  accent-color: var(--color-primary);
}

.forgot-password {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 14px;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: var(--gradient-primary);
  color: var(--color-white);
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid var(--color-white);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

.error-message {
  margin-top: 15px;
  padding: 10px;
  background: rgba(231, 76, 60, 0.1);
  color: #c0392b;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
}

.login-footer {
  padding: 20px 30px;
  background: var(--color-light);
  text-align: center;
}

.back-to-home {
  color: var(--color-primary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.back-to-home:hover {
  text-decoration: underline;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 480px) {
  .login-container {
    max-width: 100%;
  }

  .form-options {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
}

.oauth-btn {
  width: 100%;
  padding: 12px;
  background: var(--color-white);
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.oauth-btn:hover {
  background: var(--color-primary);
  color: var(--color-white);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.oauth-btn i {
  font-size: 20px;
}

.divider {
  text-align: center;
  margin: 20px 0;
  position: relative;
}

.divider::before,
.divider::after {
  content: "";
  position: absolute;
  top: 50%;
  width: calc(50% - 30px);
  height: 1px;
  background: var(--color-light);
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.divider span {
  background: var(--color-white);
  padding: 0 15px;
  color: var(--color-default);
  font-size: 14px;
}

.session-expired-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 149, 0, 0.95);
  backdrop-filter: blur(10px);
  color: white;
  z-index: 1000;
  padding: 15px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  animation: slideDown 0.5s ease-out;
}

.session-expired-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  font-weight: 500;
}

.session-expired-content i {
  font-size: 20px;
}

.close-btn {
  margin-left: auto;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.close-btn:hover {
  opacity: 1;
}

.close-btn i {
  font-size: 20px;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
</style> 