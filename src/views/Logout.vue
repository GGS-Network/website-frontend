<template>
  <div class="logout-page">
    <div class="logout-container">
      <div class="logout-box">
        <div class="logout-content">
          <i class="bi bi-box-arrow-right"></i>
          <h2>Abmeldung</h2>
          <p v-if="loading">Abmeldung läuft...</p>
          <p v-else-if="error">{{ error }}</p>
          <p v-else>Sie wurden erfolgreich abgemeldet.</p>
          <div class="logout-actions">
            <router-link to="/login" class="login-link">
              Erneut anmelden
            </router-link>
            <router-link to="/" class="home-link">
              Zurück zur Startseite
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '@/services/api';
import { onMounted, ref } from 'vue';

export default {
  name: 'Logout',
  setup() {
    const loading = ref(true);
    const error = ref(null);

    onMounted(async () => {
      try {
        await auth.logout();
      } catch (err) {
        error.value = 'Fehler bei der Abmeldung';
        console.error('Logout error:', err);
      } finally {
        loading.value = false;
      }
    });

    return {
      loading,
      error
    };
  }
};
</script>

<style scoped>
.logout-page {
  min-height: 100vh;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.logout-container {
  width: 100%;
  max-width: 420px;
}

.logout-box {
  background: var(--color-white);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.logout-content {
  padding: 40px;
  text-align: center;
}

.logout-content i {
  font-size: 48px;
  color: var(--color-primary);
  margin-bottom: 20px;
}

.logout-content h2 {
  color: var(--color-primary);
  margin-bottom: 15px;
  font-size: 24px;
}

.logout-content p {
  color: var(--color-default);
  margin-bottom: 25px;
}

.logout-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.login-link, .home-link {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
}

.login-link {
  background: var(--gradient-primary);
  color: var(--color-white);
}

.login-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.home-link {
  background: var(--color-light);
  color: var(--color-primary);
}

.home-link:hover {
  background: var(--color-primary);
  color: var(--color-white);
}

@media (max-width: 480px) {
  .logout-container {
    max-width: 100%;
  }
}
</style> 