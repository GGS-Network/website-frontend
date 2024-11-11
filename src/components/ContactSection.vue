<template>
  <section id="contact" class="contact">
    <div class="container">
      <div class="section-title">
        <h2>Kontakt</h2>
        <p>Wir sind für Sie da</p>
      </div>

      <div class="row gy-4">
        <div class="col-lg-6">
          <div class="contact-info">
            <div class="info-box">
              <i class="bi bi-geo-alt"></i>
              <h3>Adresse</h3>
              <p>Musterstraße 123<br>12345 Berlin, Deutschland</p>
            </div>

            <div class="info-box">
              <i class="bi bi-envelope"></i>
              <h3>Email</h3>
              <p>info@cloudtech-solutions.de<br>support@cloudtech-solutions.de</p>
            </div>

            <div class="info-box">
              <i class="bi bi-phone"></i>
              <h3>Telefon</h3>
              <p>+49 (0) 123 456 789<br>+49 (0) 123 456 780</p>
            </div>

            <div class="info-box">
              <i class="bi bi-clock"></i>
              <h3>Öffnungszeiten</h3>
              <p>Montag - Freitag<br>9:00 - 17:00 Uhr</p>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-group">
              <input 
                type="text" 
                v-model="form.name" 
                class="form-control" 
                placeholder="Ihr Name"
                required
              >
            </div>
            <div class="form-group">
              <input 
                type="email" 
                v-model="form.email" 
                class="form-control" 
                placeholder="Ihre Email"
                required
              >
            </div>
            <div class="form-group">
              <input 
                type="text" 
                v-model="form.subject" 
                class="form-control" 
                placeholder="Betreff"
                required
              >
            </div>
            <div class="form-group">
              <textarea 
                v-model="form.message" 
                class="form-control" 
                rows="6" 
                placeholder="Ihre Nachricht"
                required
              ></textarea>
            </div>
            <div class="form-submit">
              <button type="submit" :disabled="loading">
                <span v-if="!loading">Nachricht senden</span>
                <span v-else class="loading-spinner"></span>
              </button>
            </div>
            <div class="form-message" v-if="success || error">
              <div class="alert" :class="{ 'alert-success': success, 'alert-danger': error }">
                {{ success ? 'Ihre Nachricht wurde erfolgreich gesendet!' : error }}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContactSection',
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      loading: false,
      success: false,
      error: null
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      this.error = null;
      this.success = false;

      try {
        const response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.form)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Ein Fehler ist aufgetreten');
        }

        this.success = true;
        this.form = { name: '', email: '', subject: '', message: '' };
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.contact {
  background: var(--color-light);
  padding: 80px 0;
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.info-box {
  background: var(--color-white);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
}

.info-box:hover {
  transform: translateY(-5px);
}

.info-box i {
  font-size: 32px;
  color: var(--color-primary);
  margin-bottom: 15px;
}

.info-box h3 {
  font-size: 18px;
  color: var(--color-primary);
  font-weight: 600;
  margin-bottom: 10px;
}

.info-box p {
  margin: 0;
  line-height: 1.6;
  color: var(--color-default);
}

.contact-form {
  background: var(--color-white);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  height: 50px;
  padding: 10px 20px;
  border: 2px solid transparent;
  border-radius: 10px;
  background: var(--color-light);
  transition: all 0.3s ease;
}

textarea.form-control {
  height: auto;
  resize: none;
}

.form-control:focus {
  border-color: var(--color-primary);
  box-shadow: none;
  background: var(--color-white);
}

.form-submit {
  text-align: center;
}

button {
  padding: 15px 40px;
  border: none;
  border-radius: 30px;
  background: var(--gradient-primary);
  color: var(--color-white);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid var(--color-white);
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

.form-message {
  margin-top: 20px;
}

.alert {
  padding: 15px;
  border-radius: 10px;
  text-align: center;
}

.alert-success {
  background: rgba(46, 204, 113, 0.1);
  color: #27ae60;
}

.alert-danger {
  background: rgba(231, 76, 60, 0.1);
  color: #c0392b;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .contact-info {
    grid-template-columns: 1fr;
  }
  
  .contact-form {
    padding: 30px;
  }
  
  button {
    width: 100%;
  }
}
</style> 