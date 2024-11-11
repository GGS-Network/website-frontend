<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-box">
        <div class="register-header">
          <svg class="logo-svg" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
            <g class="logo-icon">
              <path d="M40 35c0-6.627-5.373-12-12-12-1.4 0-2.743.24-4 .683C22.805 18.966 18.177 15.5 12.75 15.5 5.707 15.5 0 21.207 0 28.25c0 .55.035 1.092.103 1.623C.035 30.408 0 30.95 0 31.5 0 37.299 4.701 42 10.5 42h27c4.142 0 7.5-3.358 7.5-7.5z" 
                    fill="currentColor"/>
            </g>
          </svg>
          <h1>Account erstellen</h1>
          <p>Registrieren Sie sich für Ihr Dashboard</p>
        </div>

        <form @submit.prevent="handleRegister" class="register-form">
          <div class="form-group">
            <label for="name">Name</label>
            <div class="input-group">
              <input 
                type="text" 
                id="name"
                v-model="form.name" 
                required
                placeholder="Max Mustermann"
              >
            </div>
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

          <div class="form-group">
            <label for="confirmPassword">Passwort bestätigen</label>
            <div class="input-group">
              <input 
                :type="showConfirmPassword ? 'text' : 'password'" 
                id="confirmPassword"
                v-model="form.confirmPassword" 
                required
                placeholder="Passwort wiederholen"
              >
              <button 
                type="button" 
                class="toggle-password"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <i class="bi" :class="showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
              </button>
            </div>
          </div>

          <div class="form-options">
            <label class="terms">
              <input type="checkbox" v-model="form.acceptTerms" required>
              <span>Ich akzeptiere die <a href="#" @click.prevent="showTerms">Nutzungsbedingungen</a></span>
            </label>
          </div>

          <button type="submit" class="register-btn" :disabled="loading || !form.acceptTerms">
            <span v-if="!loading">Registrieren</span>
            <div v-else class="spinner"></div>
          </button>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>
        </form>

        <div class="register-footer">
          <p>Bereits registriert?</p>
          <router-link to="/login" class="login-link">
            Zum Login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '@/services/api';

export default {
  name: 'Register',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
      },
      showPassword: false,
      showConfirmPassword: false,
      loading: false,
      error: null
    }
  },
  methods: {
    async handleRegister() {
      if (this.form.password !== this.form.confirmPassword) {
        this.error = 'Die Passwörter stimmen nicht überein';
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        await auth.register({
          name: this.form.name,
          email: this.form.email,
          password: this.form.password
        });

        // Zur Login-Seite weiterleiten
        this.$router.push('/login?registered=true');
      } catch (err) {
        this.error = err.response?.data?.message || 'Registrierung fehlgeschlagen';
      } finally {
        this.loading = false;
      }
    },
    showTerms() {
      // Hier Modal oder Weiterleitung zu den Nutzungsbedingungen implementieren
      console.log('Show terms and conditions')
    }
  }
}
</script>

<style scoped>
/* Übernehme alle Styles von Login.vue */
.register-page {
  min-height: 100vh;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.register-container {
  width: 100%;
  max-width: 420px;
}

.register-box {
  background: var(--color-white);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.register-header {
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

.register-header h1 {
  font-size: 24px;
  color: var(--color-primary);
  margin: 0 0 10px;
}

.register-header p {
  color: var(--color-default);
  margin: 0;
  opacity: 0.7;
}

.register-form {
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

.input-group input::placeholder {
  color: #a0aec0;
}

.input-group input:focus {
  outline: none;
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

.form-options {
  margin-bottom: 20px;
}

.terms {
  display: flex;
  align-items: center;
  gap: 8px;
  user-select: none;
  color: var(--color-default);
}

.terms input {
  accent-color: var(--color-primary);
}

.terms a {
  color: var(--color-primary);
  text-decoration: none;
}

.terms a:hover {
  text-decoration: underline;
}

.register-btn {
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

.register-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.register-btn:disabled {
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

.register-footer {
  padding: 20px 30px;
  background: var(--color-light);
  text-align: center;
}

.register-footer p {
  margin: 0 0 10px;
  color: var(--color-default);
}

.login-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
}

.login-link:hover {
  text-decoration: underline;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 480px) {
  .register-container {
    max-width: 100%;
  }
}
</style> 