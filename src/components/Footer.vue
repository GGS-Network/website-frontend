<template>
  <footer id="footer">
    <div class="footer-top">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-6">
            <div class="footer-info">
              <h3>VelocityDesk</h3>
              <p>
                GGS-Network UG<br>
                Deutschland<br><br>
                <strong>Telefon:</strong> +49 (0) 15679229548<br>
                <strong>Email:</strong> info@ggs-network.com<br>
              </p>
              <div class="social-links mt-3">
                <a href="#" class="twitter"><i class="bi bi-twitter-x"></i></a>
                <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
                <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
                <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="footer-links">
              <h4>Nützliche Links</h4>
              <ul>
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/about-us">Über uns</router-link></li>
                <li><router-link to="/leistungen">Leistungen</router-link></li>
                <li><router-link to="/funktionen">Funktionen</router-link></li>
                <li><router-link to="/vision">Vision</router-link></li>
                <li><router-link to="/status">Status</router-link></li>
              </ul>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="footer-links">
              <h4>Unsere Services</h4>
              <ul>
                <li><router-link to="/services#dbaas">Database as a Service</router-link></li>
                <li><router-link to="/services#daas">Desktop as a Service</router-link></li>
                <li><router-link to="/services#naas">Network as a Service</router-link></li>
                <li><router-link to="/services#baas">Storage Backend as a Service</router-link></li>
                <li><router-link to="/services#wci">Windows Company Infrastructure</router-link></li>
              </ul>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="footer-newsletter">
              <h4>Newsletter</h4>
              <p>Bleiben Sie auf dem Laufenden über unsere neuesten Entwicklungen und Angebote.</p>
              <div class="newsletter-form" :class="{ 'success': isSubscribed }">
                <template v-if="!isSubscribed">
                  <input 
                    type="email" 
                    v-model="newsletterEmail" 
                    placeholder="E-Mail"
                    :disabled="isLoading"
                  >
                  <button 
                    @click="handleNewsletter" 
                    :disabled="isLoading || !isValidEmail"
                  >
                    <span v-if="!isLoading">Abonnieren</span>
                    <i v-else class="bi bi-arrow-repeat spinning"></i>
                  </button>
                </template>
                <div v-else class="success-message">
                  <i class="bi bi-check-circle"></i>
                  <span>Erfolgreich angemeldet!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="copyright">
        &copy; Copyright <strong><span>VelocityDesk</span></strong>. Alle Rechte vorbehalten
      </div>
      <div class="credits">
        <router-link to="/datenschutz">Datenschutz</router-link> | 
        <a href="#">Impressum</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      newsletterEmail: '',
      isLoading: false,
      isSubscribed: false,
      debounceTimer: null
    }
  },
  computed: {
    isValidEmail() {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.newsletterEmail)
    }
  },
  methods: {
    // Debounced Newsletter Handler
    async handleNewsletter() {
      if (this.debounceTimer) clearTimeout(this.debounceTimer)
      
      this.debounceTimer = setTimeout(async () => {
        if (!this.isValidEmail) return
        this.isLoading = true
        
        try {
          await new Promise(resolve => setTimeout(resolve, 1000))
          this.isSubscribed = true
          this.newsletterEmail = ''
          
          setTimeout(() => {
            this.isSubscribed = false
          }, 5000)
        } catch (error) {
          console.error('Newsletter subscription failed:', error)
        } finally {
          this.isLoading = false
        }
      }, 300)
    }
  },
  beforeUnmount() {
    if (this.debounceTimer) clearTimeout(this.debounceTimer)
  }
}
</script>

<style scoped>
#footer {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  padding: 0 0 30px 0;
  color: var(--color-white);
  font-size: 14px;
}

.footer-top {
  padding: 60px 0 30px 0;
  margin-bottom: 5px;
}

.footer-info, .footer-links, .footer-newsletter {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  height: 100%;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 5px;
  margin-bottom: 10px;
  position: relative;
  z-index: 1;
}

.footer-info:hover, .footer-links:hover, .footer-newsletter:hover {
  will-change: transform;
  transform: translateY(-5px);
}

.footer-info h3 {
  font-size: 24px;
  margin: 0 0 20px 0;
  padding: 2px 0 2px 0;
  line-height: 1;
  font-weight: 700;
}

.footer-info p {
  line-height: 24px;
  margin-bottom: 0;
}

.social-links {
  display: flex;
  gap: 10px;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.social-links a i {
  color: var(--color-light);
  font-size: 16px;
  transition: all 0.3s ease;
}

.social-links a:hover {
  will-change: transform;
  transform: translateY(-5px);
}

.social-links a:hover i {
  color: var(--color-white);
}

.social-links a.twitter:hover {
  background: #1DA1F2;
  border-color: #1DA1F2;
}

.social-links a.facebook:hover {
  background: #4267B2;
  border-color: #4267B2;
}

.social-links a.instagram:hover {
  background: #E4405F;
  border-color: #E4405F;
}

.social-links a.linkedin:hover {
  background: #0077B5;
  border-color: #0077B5;
}

.footer-links h4, .footer-newsletter h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
}

.footer-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links ul li {
  padding: 7px 0;
}

.footer-links ul li a {
  display: block;
  color: var(--color-light);
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 5px 0;
}

.footer-links ul li a:hover {
  color: var(--color-white);
  transform: translateX(10px);
}

.footer-newsletter p {
  margin-bottom: 20px;
}

.newsletter-form {
  display: flex;
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  padding: 6px;
  border-radius: 50px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.newsletter-form.success {
  background: rgba(46, 213, 115, 0.15);
  border-color: rgba(46, 213, 115, 0.3);
}

.success-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  color: var(--color-white);
  padding: 8px;
  animation: slideIn 0.3s ease;
}

.success-message i {
  color: #2ed573;
  font-size: 1.2em;
}

@keyframes slideIn {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.newsletter-form input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 8px 15px;
  color: var(--color-white);
  transition: all 0.3s ease;
}

.newsletter-form input::placeholder {
  color: rgba(255, 255, 255, 0.7);
  opacity: 1;
}

.newsletter-form input::-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.newsletter-form input:-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.newsletter-form input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.newsletter-form button {
  background: var(--color-tertiary);
  border: none;
  padding: 8px 20px;
  border-radius: 50px;
  color: var(--color-white);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
}

.newsletter-form button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
}

.newsletter-form button:not(:disabled):hover {
  background: var(--color-secondary);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px 0 rgba(31, 38, 135, 0.2);
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.copyright {
  text-align: center;
  padding-top: 30px;
  margin-top: 10px;
}

.credits {
  padding-top: 10px;
  text-align: center;
  font-size: 13px;
}

.credits a {
  color: var(--color-light);
  text-decoration: none;
  transition: 0.3s;
}

.credits a:hover {
  color: var(--color-white);
}

@media (max-width: 768px) {
  .footer-top {
    padding: 30px 0 15px 0;
  }
  
  .newsletter-form {
    flex-direction: column;
    padding: 10px;
  }
  
  .newsletter-form button {
    width: 100%;
  }
}

.row {
  margin-top: -5px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 5px;
}

.container:last-child {
  margin-top: 15px;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style> 