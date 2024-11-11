<template>
  <DashboardLayout>
    <div class="profile-page">
      <!-- Header -->
      <div class="profile-header">
        <div class="header-content">
          <h1>Profil Einstellungen</h1>
          <p>Verwalten Sie Ihre persönlichen Informationen und Einstellungen</p>
        </div>
      </div>

      <!-- Content -->
      <div class="profile-content">
        <!-- Profilbild und Basis-Info -->
        <div class="profile-section">
          <div class="profile-info">
            <div class="avatar-upload">
              <div class="avatar-preview" :class="{ 'has-image': hasProfileImage }">
                <img v-if="hasProfileImage" :src="profileImage" alt="Profilbild">
                <i v-else class="bi bi-person"></i>
              </div>
              <div class="avatar-actions">
                <button class="btn-upload" @click="triggerFileUpload">
                  <i class="bi bi-upload"></i>
                  Bild hochladen
                </button>
                <button v-if="hasProfileImage" class="btn-remove" @click="removeProfileImage">
                  <i class="bi bi-trash"></i>
                  Entfernen
                </button>
              </div>
              <input
                type="file"
                ref="fileInput"
                style="display: none"
                accept="image/*"
                @change="handleFileUpload"
              >
            </div>
            <div class="user-role">
              <span class="role-badge" :class="userRoleClass">{{ userRole }}</span>
            </div>
          </div>
        </div>

        <!-- Persönliche Informationen -->
        <div class="profile-section">
          <h2>Persönliche Informationen</h2>
          <form @submit.prevent="saveProfile">
            <div class="form-group">
              <label for="name">Name</label>
              <div class="input-group">
                <i class="bi bi-person"></i>
                <input 
                  type="text" 
                  id="name"
                  v-model="form.name" 
                  placeholder="Ihr vollständiger Name"
                >
              </div>
            </div>

            <div class="form-group">
              <label for="email">E-Mail Adresse</label>
              <div class="input-group">
                <i class="bi bi-envelope"></i>
                <input 
                  type="email" 
                  id="email"
                  v-model="form.email" 
                  disabled
                >
              </div>
              <small class="form-hint">Die E-Mail-Adresse kann nicht geändert werden</small>
            </div>

            <div class="form-group">
              <label for="phone">Telefonnummer (optional)</label>
              <div class="input-group">
                <i class="bi bi-telephone"></i>
                <input 
                  type="tel" 
                  id="phone"
                  v-model="form.phone" 
                  placeholder="+49 123 45678900"
                >
              </div>
            </div>

            <div class="form-group">
              <label for="position">Position (optional)</label>
              <div class="input-group">
                <i class="bi bi-briefcase"></i>
                <input 
                  type="text" 
                  id="position"
                  v-model="form.position" 
                  placeholder="z.B. Entwickler"
                >
              </div>
            </div>
          </form>
        </div>

        <!-- Sicherheit -->
        <div class="profile-section">
          <h2>Sicherheit</h2>
          <div class="security-option">
            <div class="security-info">
              <h3>Passwort ändern</h3>
              <p>Ändern Sie regelmäßig Ihr Passwort für mehr Sicherheit</p>
            </div>
            <button class="btn-secondary" @click="showChangePasswordModal = true">
              <i class="bi bi-key"></i>
              Passwort ändern
            </button>
          </div>

          <div class="security-option">
            <div class="security-info">
              <h3>Aktive Sitzungen</h3>
              <p>Verwalten Sie Ihre aktiven Login-Sitzungen</p>
            </div>
            <button class="btn-secondary" @click="showSessionsModal = true">
              <i class="bi bi-display"></i>
              Sitzungen anzeigen
            </button>
          </div>
        </div>

        <!-- Benachrichtigungen -->
        <div class="profile-section">
          <h2>Benachrichtigungen</h2>
          <div class="notification-option">
            <div class="notification-info">
              <h3>E-Mail Benachrichtigungen</h3>
              <p>Erhalten Sie wichtige Updates per E-Mail</p>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="form.notifications.email">
              <span class="slider"></span>
            </label>
          </div>

          <div class="notification-option">
            <div class="notification-info">
              <h3>Login Benachrichtigungen</h3>
              <p>Benachrichtigung bei neuen Anmeldungen</p>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="form.notifications.login">
              <span class="slider"></span>
            </label>
          </div>
        </div>

        <!-- Aktionen -->
        <div class="profile-actions">
          <button type="button" class="btn-cancel" @click="resetForm">
            <i class="bi bi-x"></i>
            Änderungen verwerfen
          </button>
          <button type="submit" class="btn-save" :disabled="!hasChanges || saving" @click="saveProfile">
            <i v-if="!saving" class="bi bi-check2"></i>
            <div v-else class="spinner"></div>
            <span>{{ saving ? 'Wird gespeichert...' : 'Änderungen speichern' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Passwort ändern Modal -->
    <div v-if="showChangePasswordModal" class="modal-overlay" @click.self="showChangePasswordModal = false">
      <div class="modal-content">
        <h2>Passwort ändern</h2>
        <form @submit.prevent="changePassword">
          <div class="form-group">
            <label>Aktuelles Passwort</label>
            <div class="input-group">
              <input 
                :type="showCurrentPassword ? 'text' : 'password'"
                v-model="passwordForm.current"
              >
              <button type="button" class="toggle-password" @click="showCurrentPassword = !showCurrentPassword">
                <i class="bi" :class="showCurrentPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label>Neues Passwort</label>
            <div class="input-group">
              <input 
                :type="showNewPassword ? 'text' : 'password'"
                v-model="passwordForm.new"
              >
              <button type="button" class="toggle-password" @click="showNewPassword = !showNewPassword">
                <i class="bi" :class="showNewPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label>Passwort bestätigen</label>
            <div class="input-group">
              <input 
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="passwordForm.confirm"
              >
              <button type="button" class="toggle-password" @click="showConfirmPassword = !showConfirmPassword">
                <i class="bi" :class="showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
              </button>
            </div>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="showChangePasswordModal = false">
              Abbrechen
            </button>
            <button 
              type="submit" 
              class="btn-save" 
              :disabled="!canChangePassword || changingPassword"
            >
              <span v-if="!changingPassword">Passwort ändern</span>
              <div v-else class="spinner"></div>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Aktive Sitzungen Modal -->
    <div v-if="showSessionsModal" class="modal-overlay" @click.self="showSessionsModal = false">
      <div class="modal-content">
        <h2>Aktive Sitzungen</h2>
        <div class="sessions-list">
          <div v-for="session in activeSessions" :key="session.id" class="session-item">
            <div class="session-info">
              <div class="device-info">
                <i class="bi" :class="getDeviceIcon(session.userAgent)"></i>
                <span>{{ getDeviceName(session.userAgent) }}</span>
              </div>
              <div class="session-meta">
                <span class="ip-address">{{ session.ipAddress }}</span>
                <span class="last-active">Zuletzt aktiv: {{ formatDate(session.updatedAt) }}</span>
              </div>
            </div>
            <button 
              class="btn-terminate" 
              @click="terminateSession(session.id)"
              :disabled="isCurrentSession(session.id)"
            >
              {{ isCurrentSession(session.id) ? 'Aktuelle Sitzung' : 'Beenden' }}
            </button>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn-cancel" @click="showSessionsModal = false">
            Schließen
          </button>
          <button 
            class="btn-danger" 
            @click="terminateAllSessions"
            :disabled="activeSessions.length <= 1"
          >
            Alle anderen Sitzungen beenden
          </button>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { authStore } from '@/store/auth';
import api from '@/services/api';
import DashboardLayout from '@/layouts/DashboardLayout.vue';

export default {
  name: 'Profile',
  components: {
    DashboardLayout
  },
  setup() {
    const form = ref({
      name: '',
      email: '',
      phone: '',
      position: '',
      notifications: {
        email: true,
        login: true
      }
    });

    const originalForm = ref({});
    const saving = ref(false);
    const hasProfileImage = ref(false);
    const profileImage = ref(null);
    const fileInput = ref(null);
    const has2FA = ref(false);
    const showChangePasswordModal = ref(false);
    const showCurrentPassword = ref(false);
    const showNewPassword = ref(false);
    const showConfirmPassword = ref(false);
    const changingPassword = ref(false);
    const showSessionsModal = ref(false);

    const passwordForm = ref({
      current: '',
      new: '',
      confirm: ''
    });

    // Sidebar State aus dem globalen Event Bus oder Store
    const isSidebarCollapsed = ref(false);

    // Event Listener für Sidebar Toggle
    const handleSidebarToggle = (collapsed) => {
      isSidebarCollapsed.value = collapsed;
    };

    // Computed Properties
    const hasChanges = computed(() => {
      return JSON.stringify(form.value) !== JSON.stringify(originalForm.value);
    });

    const canChangeEmail = computed(() => {
      return false; // Oder Logik für E-Mail-Änderung
    });

    const canChangePassword = computed(() => {
      return passwordForm.value.new && 
             passwordForm.value.new === passwordForm.value.confirm &&
             passwordForm.value.new !== passwordForm.value.current;
    });

    // Methods
    const loadProfile = async () => {
      try {
        const response = await api.get('/profile');
        form.value = response.data;
        originalForm.value = { ...response.data };
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    const saveProfile = async () => {
      saving.value = true;
      try {
        await api.put('/profile', form.value);
        originalForm.value = { ...form.value };
        // Erfolgsbenachrichtigung
      } catch (error) {
        console.error('Error saving profile:', error);
        // Fehlerbenachrichtigung
      } finally {
        saving.value = false;
      }
    };

    const resetForm = () => {
      form.value = { ...originalForm.value };
    };

    const triggerFileUpload = () => {
      fileInput.value.click();
    };

    const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      if (file) {
        try {
          const formData = new FormData();
          formData.append('avatar', file);
          await api.post('/profile/avatar', formData);
          // Aktualisiere Profilbild
          loadProfile();
        } catch (error) {
          console.error('Error uploading avatar:', error);
        }
      }
    };

    const removeProfileImage = async () => {
      try {
        await api.delete('/profile/avatar');
        hasProfileImage.value = false;
        profileImage.value = null;
      } catch (error) {
        console.error('Error removing avatar:', error);
      }
    };

    const toggle2FA = async () => {
      try {
        if (has2FA.value) {
          await api.post('/profile/2fa/disable');
        } else {
          await api.post('/profile/2fa/enable');
        }
        has2FA.value = !has2FA.value;
      } catch (error) {
        console.error('Error toggling 2FA:', error);
      }
    };

    const changePassword = async () => {
      if (!canChangePassword.value) return;

      changingPassword.value = true;
      try {
        await api.put('/profile/password', {
          currentPassword: passwordForm.value.current,
          newPassword: passwordForm.value.new
        });
        showChangePasswordModal.value = false;
        passwordForm.value = { current: '', new: '', confirm: '' };
        // Erfolgsbenachrichtigung
      } catch (error) {
        console.error('Error changing password:', error);
        // Fehlerbenachrichtigung
      } finally {
        changingPassword.value = false;
      }
    };

    onMounted(() => {
      loadProfile();

      // Registriere Event Listener
      window.addEventListener('sidebar-toggle', (event) => {
        handleSidebarToggle(event.detail.collapsed);
      });

      // Initialer Zustand
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        isSidebarCollapsed.value = sidebar.classList.contains('collapsed');
      }
    });

    return {
      form,
      saving,
      hasProfileImage,
      profileImage,
      fileInput,
      has2FA,
      showChangePasswordModal,
      showCurrentPassword,
      showNewPassword,
      showConfirmPassword,
      changingPassword,
      showSessionsModal,
      passwordForm,
      hasChanges,
      canChangeEmail,
      canChangePassword,
      saveProfile,
      resetForm,
      triggerFileUpload,
      handleFileUpload,
      removeProfileImage,
      toggle2FA,
      changePassword,
      isSidebarCollapsed
    };
  }
};
</script>

<style scoped>
.profile-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.profile-header {
  margin-bottom: 30px;
}

.profile-header h1 {
  color: var(--color-primary);
  margin-bottom: 10px;
  font-size: 2rem;
}

.profile-header p {
  color: var(--color-default);
  opacity: 0.7;
}

.profile-section {
  background: var(--color-white);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.profile-section h2 {
  color: var(--color-primary);
  font-size: 18px;
  margin-bottom: 20px;
}

.avatar-upload {
  display: flex;
  align-items: center;
  gap: 20px;
}

.current-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: var(--color-light);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.current-avatar i {
  font-size: 48px;
  color: var(--color-primary);
}

.current-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
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
}

.input-group:focus-within {
  background: var(--color-white);
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(72, 52, 212, 0.1);
}

.input-group input {
  width: 100%;
  padding: 12px 15px;
  border: none;
  background: transparent;
  color: var(--color-default);
  font-size: 16px;
}

.input-group input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.form-hint {
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: var(--color-default);
  opacity: 0.7;
}

.security-option,
.notification-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid var(--color-light);
}

.security-option:last-child,
.notification-option:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.security-info h3,
.notification-info h3 {
  font-size: 16px;
  margin-bottom: 5px;
  color: var(--color-default);
}

.security-info p,
.notification-info p {
  font-size: 14px;
  color: var(--color-default);
  opacity: 0.7;
  margin: 0;
}

/* Buttons */
.btn-upload,
.btn-remove,
.btn-secondary,
.btn-save,
.btn-cancel {
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
}

.btn-upload {
  background: var(--color-primary);
  color: var(--color-white);
}

.btn-remove {
  background: rgba(255, 59, 48, 0.1);
  color: #ff3b30;
}

.btn-secondary {
  background: var(--color-light);
  color: var(--color-primary);
}

.btn-secondary.active {
  background: var(--color-primary);
  color: var(--color-white);
}

.btn-save {
  background: var(--gradient-primary);
  color: var(--color-white);
}

.btn-cancel {
  background: var(--color-light);
  color: var(--color-default);
}

/* Switch Toggle */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-light);
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--color-primary);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--color-white);
  border-radius: 15px;
  padding: 25px;
  width: 100%;
  max-width: 500px;
  margin: 20px;
}

.modal-content h2 {
  color: var(--color-primary);
  margin-bottom: 20px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

/* Responsive Anpassungen */
@media (max-width: 768px) {
  .avatar-upload {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .security-option,
  .notification-option {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .modal-content {
    margin: 10px;
    padding: 20px;
  }

  .profile-page {
    padding: 0 15px;
  }
}

/* Spinner */
.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid var(--color-white);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style> 