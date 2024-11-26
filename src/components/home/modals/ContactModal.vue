<template>
  <div class="modal fade custom-modal" id="contactModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-header-content">
            <div class="modal-icon">
              <i class="bi bi-envelope-paper"></i>
            </div>
            <h5 class="modal-title">Kontakt aufnehmen</h5>
            <p class="modal-subtitle">Wir freuen uns auf Ihre Nachricht</p>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-floating mb-3">
              <input 
                type="text" 
                class="form-control" 
                id="name" 
                v-model="formData.name" 
                required 
                placeholder="Name"
              >
              <label for="name">Name *</label>
            </div>
            <div class="form-floating mb-3">
              <input 
                type="text" 
                class="form-control" 
                id="company" 
                v-model="formData.company" 
                required 
                placeholder="Unternehmen"
              >
              <label for="company">Unternehmen *</label>
            </div>
            <div class="form-floating mb-3">
              <input 
                type="email" 
                class="form-control" 
                id="email" 
                v-model="formData.email" 
                required 
                placeholder="E-Mail"
              >
              <label for="email">E-Mail *</label>
            </div>
            <div class="form-floating mb-3">
              <input 
                type="tel" 
                class="form-control" 
                id="phone" 
                v-model="formData.phone" 
                placeholder="Telefon"
              >
              <label for="phone">Telefon</label>
            </div>
            <div class="form-floating mb-3">
              <textarea 
                class="form-control" 
                id="message" 
                v-model="formData.message" 
                required 
                placeholder="Nachricht" 
                style="height: 120px"
              ></textarea>
              <label for="message">Nachricht *</label>
            </div>
            <div class="form-check mb-4">
              <input 
                type="checkbox" 
                class="form-check-input" 
                id="privacy" 
                v-model="formData.privacy" 
                required
              >
              <label class="form-check-label" for="privacy">
                Ich stimme der <router-link to="/datenschutz" target="_blank">Datenschutzerklärung</router-link> zu *
              </label>
            </div>
            <div class="text-end">
              <button type="button" class="btn btn-outline-secondary me-2" data-bs-dismiss="modal">
                Abbrechen
              </button>
              <button type="submit" class="btn btn-primary">
                <i class="bi bi-send me-2"></i>
                Absenden
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'

export default {
  name: 'ContactModal',
  data() {
    return {
      modal: null,
      formData: {
        name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
        privacy: false
      }
    }
  },
  mounted() {
    this.modal = new Modal(document.getElementById('contactModal'))
  },
  methods: {
    show() {
      this.modal.show()
    },
    hide() {
      this.modal.hide()
    },
    async submitForm() {
      try {
        // Hier können Sie die API-Anfrage implementieren
        console.log('Form submitted:', this.formData)
        
        // Formular zurücksetzen
        this.formData = {
          name: '',
          company: '',
          email: '',
          phone: '',
          message: '',
          privacy: false
        }
        
        // Modal schließen
        this.hide()
        
        // Erfolgsmeldung
        alert('Vielen Dank für Ihre Nachricht! Wir werden uns schnellstmöglich bei Ihnen melden.')
      } catch (error) {
        console.error('Error submitting form:', error)
        alert('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.')
      }
    }
  }
}
</script>

<style scoped>
.custom-modal .modal-content {
  border: none;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.modal-header {
  background: var(--gradient-primary);
  border-bottom: none;
  padding: 25px;
  position: relative;
}

.modal-header-content {
  text-align: center;
  width: 100%;
  color: var(--color-white);
}

.modal-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
}

.modal-icon i {
  font-size: 24px;
  color: var(--color-white);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 5px;
}

.modal-subtitle {
  font-size: 0.9rem;
  opacity: 0.9;
  margin: 0;
}

.modal-body {
  padding: 30px;
}

.btn-close {
  position: absolute;
  right: 20px;
  top: 20px;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2) !important;
  border-radius: 50%;
  padding: 8px;
  opacity: 1 !important;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-close:hover {
  background: rgba(255, 255, 255, 0.3) !important;
  transform: rotate(90deg);
}

.btn-close:focus {
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
}

.form-floating > .form-control {
  height: calc(3.5rem + 2px);
  line-height: 1.25;
}

.form-control {
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 0.25rem rgba(72, 52, 212, 0.1);
}

.form-check-input:checked {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.form-check-label a {
  color: var(--color-primary);
  text-decoration: none;
}

.form-check-label a:hover {
  text-decoration: underline;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background: var(--gradient-primary);
  border: none;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(72, 52, 212, 0.2);
}

.btn-outline-secondary {
  border: 2px solid rgba(0, 0, 0, 0.1);
  color: var(--color-secondary);
}

.btn-outline-secondary:hover {
  background: rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.2);
}

/* Überschreiben des Standard Bootstrap Close-Button Bilds */
.btn-close {
  background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e") center/1em auto no-repeat !important;
}
</style> 