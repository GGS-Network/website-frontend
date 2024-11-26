<template>
  <section id="hero" class="d-flex align-items-center">
    <div class="hero-bg">
      <div class="hero-particles"></div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
          <h1 class="fade-in">Die komplette IT-Lösung – zentral, sicher, skalierbar</h1>
          <h2 class="my-4 fade-in-delay">Mit Velocity Desk vereinen Sie Datenbanken, Desktops, Netzwerke, Speicher und IT-Infrastruktur in einer Plattform.</h2>
          <div class="d-flex fade-in-delay-2">
            <button class="btn-get-started" @click="$emit('show-contact')">
              <span>Kostenlose Demo testen</span>
              <i class="bi bi-arrow-right"></i>
            </button>
            <a href="#services" class="btn-learn-more scrollto">
              <span>Mehr erfahren</span>
              <i class="bi bi-chevron-down"></i>
            </a>
          </div>
        </div>
        <div class="col-lg-6 order-1 order-lg-2 hero-img">
          <div class="hero-animation">
            <div class="floating-elements">
              <div class="element database">
                <i class="bi bi-database"></i>
                <span>DBaaS</span>
              </div>
              <div class="element desktop">
                <i class="bi bi-display"></i>
                <span>DaaS</span>
              </div>
              <div class="element cloud">
                <i class="bi bi-cloud"></i>
                <span>IaaS</span>
              </div>
              <div class="element network">
                <i class="bi bi-diagram-3"></i>
                <span>NaaS</span>
              </div>
              <div class="element storage">
                <i class="bi bi-hdd-network"></i>
                <span>BaaS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  emits: ['show-contact', 'show-demo']
}
</script>

<style scoped>
#hero {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  z-index: -1;
}

.hero-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: particleMove 20s linear infinite;
}

.floating-elements {
  position: relative;
  width: 100%;
  height: 400px;
}

.element {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  animation: float 6s ease-in-out infinite;
}

.element i {
  font-size: 2rem;
  color: var(--color-white);
  margin-bottom: 8px;
}

.element span {
  color: var(--color-white);
  font-weight: 500;
  font-size: 0.9rem;
}

.database { top: 20%; left: 10%; animation-delay: 0s; }
.desktop { top: 10%; right: 15%; animation-delay: 1s; }
.cloud { top: 50%; left: 20%; animation-delay: 2s; }
.network { top: 30%; right: 10%; animation-delay: 3s; }
.storage { top: 70%; right: 25%; animation-delay: 4s; }

.element:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
}

.btn-get-started, .btn-learn-more {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 30px;
  border-radius: 50px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-get-started {
  background: var(--color-white);
  color: var(--color-primary);
  border: none;
}

.btn-learn-more {
  background: transparent;
  color: var(--color-white);
  border: 2px solid var(--color-white);
  margin-left: 20px;
}

.btn-get-started:hover, .btn-learn-more:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Animations */
@keyframes particleMove {
  0% { background-position: 0 0; }
  100% { background-position: 50px 50px; }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}

.fade-in {
  animation: fadeIn 1s ease-out;
}

.fade-in-delay {
  animation: fadeIn 1s ease-out 0.3s both;
}

.fade-in-delay-2 {
  animation: fadeIn 1s ease-out 0.6s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Styles */
@media (max-width: 991px) {
  .floating-elements {
    height: 300px;
  }
  
  .element {
    transform: scale(0.8);
  }
  
  .element:hover {
    transform: scale(0.9);
  }
}

@media (max-width: 768px) {
  .floating-elements {
    height: 250px;
    margin-top: 30px;
  }
  
  .btn-get-started, .btn-learn-more {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
  
  h1 {
    font-size: 2rem !important;
  }
  
  h2 {
    font-size: 1.2rem !important;
  }
}
</style> 