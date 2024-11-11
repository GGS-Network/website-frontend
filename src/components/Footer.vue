<template>
  <footer id="footer">
    <div class="container">
      <div class="footer-content">
        <div class="row gy-4">
          <div class="col-lg-4 col-md-6">
            <div class="footer-info">
              <div class="logo-footer d-flex align-items-center mb-3">
                <svg class="logo-svg" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
                  <g class="logo-icon">
                    <path d="M40 35c0-6.627-5.373-12-12-12-1.4 0-2.743.24-4 .683C22.805 18.966 18.177 15.5 12.75 15.5 5.707 15.5 0 21.207 0 28.25c0 .55.035 1.092.103 1.623C.035 30.408 0 30.95 0 31.5 0 37.299 4.701 42 10.5 42h27c4.142 0 7.5-3.358 7.5-7.5z" 
                          fill="currentColor"/>
                    <path d="M55 30h10M70 30h10M85 30h10" 
                          stroke="currentColor" 
                          stroke-width="2" 
                          stroke-linecap="round"/>
                    <circle cx="65" cy="30" r="2" fill="currentColor"/>
                    <circle cx="80" cy="30" r="2" fill="currentColor"/>
                    <circle cx="95" cy="30" r="2" fill="currentColor"/>
                  </g>
                </svg>
                <span class="logo-text">VelocityDesk</span>
              </div>
              <p>Ihre Cloud-Infrastruktur für die Zukunft. Skalierbar, sicher und zuverlässig.</p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="footer-links">
              <h4>Nützliche Links</h4>
              <ul>
                <li><router-link to="/#hero">Home</router-link></li>
                <li><router-link to="/#services">Services</router-link></li>
                <li><router-link to="/#pricing">Preise</router-link></li>
                <li><router-link to="/status">Status</router-link></li>
                <li><router-link to="/datenschutz">Datenschutzerklärung</router-link></li>
              </ul>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="footer-contact">
              <h4>Kontakt</h4>
              <p>
                <i class="bi bi-geo-alt"></i> Musterstraße 123, 12345 Berlin<br>
                <i class="bi bi-envelope"></i> info@cloudtech-solutions.de<br>
                <i class="bi bi-phone"></i> +49 (0) 123 456 789<br>
              </p>
              <div class="social-links">
                <a href="#" class="twitter"><i class="bi bi-twitter-x"></i></a>
                <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
                <a href="#" class="github"><i class="bi bi-github"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-legal text-center">
        <div class="copyright">
          &copy; {{ new Date().getFullYear() }} <strong><span>CloudTech Solutions</span></strong>. Alle Rechte vorbehalten
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
#footer {
  background: var(--gradient-primary);
  padding: 60px 0 30px;
  color: var(--color-white);
  font-size: 14px;
  position: relative;
}

.footer-content {
  margin-bottom: 30px;
}

.logo-footer {
  margin-bottom: 15px;
}

.logo-svg {
  height: 40px;
  width: auto;
  margin-right: 10px;
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  font-family: var(--font-primary);
  color: var(--color-white);
}

.footer-info p {
  font-size: 15px;
  line-height: 24px;
  margin-bottom: 0;
  opacity: 0.8;
}

.footer-links h4,
.footer-contact h4 {
  font-size: 16px;
  font-weight: bold;
  position: relative;
  padding-bottom: 12px;
  margin-bottom: 20px;
}

.footer-links h4::after,
.footer-contact h4::after {
  content: '';
  position: absolute;
  display: block;
  width: 30px;
  height: 2px;
  background: var(--color-tertiary);
  bottom: 0;
  left: 0;
}

.footer-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links ul li {
  padding: 8px 0;
  display: flex;
  align-items: center;
}

.footer-links ul a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: 0.3s;
  display: inline-block;
  line-height: 1;
}

.footer-links ul a:hover {
  color: var(--color-white);
  transform: translateX(5px);
}

.footer-contact p {
  line-height: 26px;
}

.footer-contact p i {
  font-size: 18px;
  margin-right: 10px;
  color: var(--color-tertiary);
}

.social-links {
  margin-top: 20px;
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
  color: var(--color-white);
  transition: all 0.3s ease;
}

.social-links a:hover {
  background: var(--color-tertiary);
  transform: translateY(-3px);
}

.footer-legal {
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.copyright {
  color: rgba(255, 255, 255, 0.8);
}

.copyright strong {
  color: var(--color-white);
}

@media (max-width: 768px) {
  .footer-content {
    text-align: center;
  }

  .footer-links h4::after,
  .footer-contact h4::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .social-links {
    justify-content: center;
  }

  .footer-contact p i {
    display: block;
    margin: 0 auto 5px;
  }
}
</style> 