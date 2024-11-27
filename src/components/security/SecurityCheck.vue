<template>
  <Transition name="security-fade">
    <div v-if="show" class="security-overlay">
      <div id="security-bg"></div>
      <div class="security-modal">
        <div class="security-header">
          <div class="security-logo">
            <i class="bi bi-shield-check"></i>
          </div>
          <div class="security-title">
            <h2>Sicherheitsüberprüfung</h2>
            <p>Protected by IronWall - GGS-Network</p>
          </div>
        </div>
        
        <div class="security-content">
          <div class="verification-box" :class="{ 'verified': isVerified }">
            <div v-if="!isVerified" class="verification-progress">
              <div class="spinner"></div>
              <p>Bitte warten Sie, während wir Ihre Verbindung überprüfen...</p>
            </div>
            <div v-else class="verification-success">
              <i class="bi bi-check-circle"></i>
              <p>Überprüfung erfolgreich!</p>
            </div>
          </div>
        </div>

        <div class="security-footer">
          <div class="security-info">
            <small>Diese Überprüfung ist notwendig, um DDoS-Angriffe und böswillige Bots zu blockieren.</small>
          </div>
          <div class="security-badges">
            <span class="badge">
              <i class="bi bi-shield-lock"></i> IronWall Protection
            </span>
            <span class="badge">
              <i class="bi bi-robot"></i> Bot Defense
            </span>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import * as THREE from 'three'
import NET from 'vanta/dist/vanta.net.min'

export default {
  name: 'SecurityCheck',
  data() {
    return {
      show: true,
      isVerified: false,
      vantaEffect: null
    }
  },
  mounted() {
    // Initialisiere VANTA.js NET Effekt mit angepassten Farben
    this.vantaEffect = NET({
      el: "#security-bg",
      THREE,
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x7158e2,         // Hellere Primärfarbe
      backgroundColor: 0x0a0d14, // Dunklerer Hintergrund
      points: 12.00,           // Mehr Punkte für dichteres Netz
      maxDistance: 18.00,
      spacing: 18.00,
      showDots: false,
      opacity: 0.9            // Höhere Opacity für bessere Sichtbarkeit
    })

    setTimeout(() => {
      this.isVerified = true
      setTimeout(() => {
        this.show = false
        if (this.vantaEffect) {
          this.vantaEffect.destroy()
        }
      }, 1000)
    }, 2000)
  },
  beforeUnmount() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy()
    }
  }
}
</script>

<style scoped>
.security-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

#security-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.security-modal {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 35px;
  width: 90%;
  max-width: 520px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 1;
  animation: modalFloat 6s ease-in-out infinite;
}

.security-header {
  display: flex;
  align-items: center;
  gap: 25px;
  margin-bottom: 35px;
}

.security-logo {
  font-size: 3rem;
  color: #7158e2;
  text-shadow: 0 0 20px rgba(113, 88, 226, 0.5);
  animation: logoGlow 2s ease-in-out infinite;
}

.security-title h2 {
  color: var(--color-white);
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.security-title p {
  color: var(--color-light);
  margin: 8px 0 0 0;
  font-size: 1rem;
  opacity: 0.9;
}

.verification-box {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 15px;
  padding: 35px;
  text-align: center;
  transition: all 0.5s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.verification-box.verified {
  background: rgba(113, 88, 226, 0.1);
  border: 1px solid rgba(113, 88, 226, 0.2);
  animation: verifiedPulse 2s ease-in-out infinite;
}

.verification-progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.verification-progress p {
  color: var(--color-light);
  font-size: 1.1rem;
  opacity: 0.95;
  margin: 0;
  line-height: 1.6;
  font-weight: 400;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(113, 88, 226, 0.1);
  border-top-color: #7158e2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  box-shadow: 0 0 15px rgba(113, 88, 226, 0.2);
}

.verification-success {
  color: #7158e2;
  font-size: 2.5rem;
  animation: successScale 0.5s ease;
}

.verification-success i {
  filter: drop-shadow(0 0 10px rgba(113, 88, 226, 0.5));
}

.verification-success p {
  color: var(--color-white);
  font-size: 1.2rem;
  margin-top: 15px;
  font-weight: 500;
}

.security-footer {
  margin-top: 35px;
  text-align: center;
}

.security-info {
  color: var(--color-light);
  margin-bottom: 20px;
  font-size: 0.95rem;
  opacity: 0.85;
  line-height: 1.5;
}

.security-badges {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.badge {
  background: rgba(113, 88, 226, 0.1);
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 0.9rem;
  color: var(--color-white);
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(113, 88, 226, 0.2);
  transition: all 0.3s ease;
}

.badge:hover {
  transform: translateY(-2px);
  background: rgba(113, 88, 226, 0.15);
  box-shadow: 0 5px 15px rgba(113, 88, 226, 0.2);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes successScale {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes modalFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes logoGlow {
  0%, 100% { text-shadow: 0 0 20px rgba(113, 88, 226, 0.5); }
  50% { text-shadow: 0 0 30px rgba(113, 88, 226, 0.8); }
}

@keyframes verifiedPulse {
  0%, 100% { box-shadow: 0 0 20px rgba(113, 88, 226, 0.2); }
  50% { box-shadow: 0 0 30px rgba(113, 88, 226, 0.4); }
}

.security-fade-enter-active,
.security-fade-leave-active {
  transition: all 0.5s ease;
}

.security-fade-enter-from,
.security-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

@media (max-width: 768px) {
  .security-modal {
    padding: 25px;
    margin: 20px;
  }

  .security-logo {
    font-size: 2.5rem;
  }

  .security-title h2 {
    font-size: 1.5rem;
  }

  .verification-box {
    padding: 25px;
  }

  .verification-progress p {
    font-size: 1rem;
  }
}
</style> 