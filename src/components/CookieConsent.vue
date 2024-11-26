<template>
  <div>
    <!-- Cookie Banner -->
    <div v-if="!cookiesAccepted" class="cookie-banner">
      <div class="cookie-content">
        <div class="cookie-header">
          <div class="cookie-icon">
            <i class="bi bi-shield-lock-fill"></i>
          </div>
          <div class="cookie-title">
            <h5>Datenschutz & Cookies</h5>
            <p>Wir schätzen Ihre Privatsphäre</p>
          </div>
        </div>
        <div class="cookie-body">
          <p>
            Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und unsere Services zu optimieren. 
            Entscheiden Sie selbst, welche Cookies Sie zulassen möchten.
          </p>
        </div>
        <div class="cookie-actions">
          <button class="btn btn-settings" @click="openSettings">
            <i class="bi bi-sliders me-2"></i>
            Einstellungen
          </button>
          <button class="btn btn-accept" @click="acceptAllCookies">
            <i class="bi bi-check2-all me-2"></i>
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>

    <!-- Cookie Settings Modal -->
    <div class="modal fade" id="cookieModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-header-content">
              <i class="bi bi-shield-lock-fill me-2"></i>
              <h5 class="modal-title">Cookie-Einstellungen</h5>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="cookie-options">
              <div class="cookie-option">
                <div class="option-header">
                  <div class="option-info">
                    <h6><i class="bi bi-shield-check me-2"></i>Notwendige Cookies</h6>
                    <p>Diese Cookies sind für die Grundfunktionen der Website erforderlich.</p>
                  </div>
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" checked disabled>
                  </div>
                </div>
              </div>

              <div class="cookie-option">
                <div class="option-header">
                  <div class="option-info">
                    <h6><i class="bi bi-gear me-2"></i>Funktionale Cookies</h6>
                    <p>Ermöglichen erweiterte Funktionen und Personalisierung.</p>
                  </div>
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" v-model="cookiePreferences.functional">
                  </div>
                </div>
              </div>

              <div class="cookie-option">
                <div class="option-header">
                  <div class="option-info">
                    <h6><i class="bi bi-graph-up me-2"></i>Analyse-Cookies</h6>
                    <p>Helfen uns zu verstehen, wie Besucher mit der Website interagieren.</p>
                  </div>
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" v-model="cookiePreferences.analytics">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-primary" data-bs-dismiss="modal">
              <i class="bi bi-x-lg me-2"></i>Schließen
            </button>
            <button class="btn btn-primary" @click="saveCookiePreferences">
              <i class="bi bi-check-lg me-2"></i>Speichern
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'

export default {
  name: 'CookieConsent',
  data() {
    return {
      cookiesAccepted: false,
      showSettings: false,
      modal: null,
      cookiePreferences: {
        necessary: true,
        functional: false,
        analytics: false
      }
    }
  },
  mounted() {
    this.modal = new Modal(document.getElementById('cookieModal'))
    const savedPreferences = localStorage.getItem('cookiePreferences')
    if (savedPreferences) {
      this.cookiesAccepted = true
      this.cookiePreferences = JSON.parse(savedPreferences)
    }
  },
  methods: {
    acceptAllCookies() {
      this.cookiePreferences = {
        necessary: true,
        functional: true,
        analytics: true
      }
      this.saveCookiePreferences()
    },
    saveCookiePreferences() {
      localStorage.setItem('cookiePreferences', JSON.stringify(this.cookiePreferences))
      this.cookiesAccepted = true
      this.$emit('preferences-updated', this.cookiePreferences)
      this.modal.hide()
    },
    openSettings() {
      this.modal.show()
    }
  }
}
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 30px;
  right: 30px;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 25px;
  z-index: 9999;
  border: 1px solid rgba(72, 52, 212, 0.1);
}

.cookie-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.cookie-icon {
  width: 48px;
  height: 48px;
  background: var(--gradient-primary);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cookie-icon i {
  font-size: 24px;
  color: white;
}

.cookie-title h5 {
  color: var(--color-primary);
  margin: 0;
  font-weight: 600;
  font-size: 1.1rem;
}

.cookie-title p {
  color: var(--color-secondary);
  margin: 0;
  font-size: 0.9rem;
}

.cookie-body {
  margin-bottom: 20px;
}

.cookie-body p {
  color: var(--color-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

.cookie-actions {
  display: flex;
  gap: 10px;
}

.btn {
  flex: 1;
  padding: 12px 20px;
  border-radius: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.btn-settings {
  background: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
}

.btn-accept {
  background: var(--gradient-primary);
  border: none;
  color: white;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(72, 52, 212, 0.15);
}

/* Modal Styles */
.modal-content {
  border-radius: 24px;
  border: none;
  overflow: hidden;
}

.modal-header {
  background: var(--gradient-primary);
  padding: 20px 25px;
  border: none;
}

.modal-header-content {
  display: flex;
  align-items: center;
  color: white;
}

.modal-header-content i {
  font-size: 24px;
}

.modal-title {
  margin: 0;
  font-weight: 600;
}

.cookie-option {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 15px;
}

.option-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.option-info h6 {
  display: flex;
  align-items: center;
  color: var(--color-primary);
  margin: 0;
  font-weight: 600;
}

.option-info p {
  margin: 5px 0 0;
  font-size: 0.9rem;
  color: var(--color-secondary);
}

.form-check-input {
  width: 3rem;
  height: 1.5rem;
  cursor: pointer;
}

.form-check-input:checked {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

@media (max-width: 768px) {
  .cookie-banner {
    bottom: 0;
    right: 0;
    left: 0;
    max-width: 100%;
    border-radius: 24px 24px 0 0;
    margin: 0;
  }

  .cookie-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style> 