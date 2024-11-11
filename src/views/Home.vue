<template>
  <main>
    <section id="hero" class="d-flex align-items-center">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
            <h1 class="fade-in">Cloud-Infrastruktur der nächsten Generation</h1>
            <h2 class="my-4">Skalierbare IaaS-Lösungen mit modernster Technologie für Ihr Unternehmen</h2>
            <div class="d-flex">
              <a href="#services" class="btn-get-started">Mehr erfahren</a>
              <button class="btn-watch-video" @click="showDemo">
                <i class="bi bi-play-circle"></i>
                <span>Demo ansehen</span>
              </button>
            </div>
          </div>
          <div class="col-lg-6 order-1 order-lg-2 hero-img">
            <div class="hero-shape">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="var(--color-tertiary)" d="M45.7,-78.2C58.9,-69.2,69.2,-55.3,76.6,-40C84,-24.7,88.5,-8,86.8,8.1C85,24.2,77,39.7,66.3,52.7C55.6,65.7,42.2,76.2,27.2,80.8C12.2,85.4,-4.4,84.1,-19.1,78.7C-33.8,73.3,-46.6,63.8,-57.9,52.2C-69.2,40.6,-79,26.8,-81.7,11.7C-84.4,-3.4,-80,-19.8,-71.7,-33.5C-63.4,-47.2,-51.2,-58.1,-37.8,-66.8C-24.4,-75.4,-9.8,-81.8,4.1,-88.8C18,-95.8,32.5,-87.2,45.7,-78.2Z" transform="translate(100 100)" />
              </svg>
            </div>
            <div class="hero-icons">
              <i class="bi bi-cloud text-primary"></i>
              <i class="bi bi-shield-check text-secondary"></i>
              <i class="bi bi-speedometer2 text-tertiary"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <SectionDivider type="default" />
    <ServicesSection />
    
    <SectionDivider type="reverse" />
    <AdvancedFeaturesSection />
    
    <SectionDivider type="default" />
    <StatsSection />
    
    <SectionDivider type="gradient" />
    <PricingSection />
    
    <SectionDivider type="reverse" />
    <ContactSection />
  </main>
</template>

<script>
import ServicesSection from '../components/ServicesSection.vue'
import AdvancedFeaturesSection from '../components/AdvancedFeaturesSection.vue'
import StatsSection from '../components/StatsSection.vue'
import PricingSection from '../components/PricingSection.vue'
import ContactSection from '../components/ContactSection.vue'
import SectionDivider from '../components/SectionDivider.vue'

export default {
  name: 'Home',
  components: {
    ServicesSection,
    AdvancedFeaturesSection,
    StatsSection,
    PricingSection,
    ContactSection,
    SectionDivider
  },
  methods: {
    showDemo() {
      console.log('Demo wird angezeigt');
    }
  }
}
</script>

<style scoped>
.hero-shape {
  position: absolute;
  right: -10%;
  top: -10%;
  width: 120%;
  height: 120%;
  z-index: 0;
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
}

.hero-icons {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.hero-icons i {
  font-size: 4rem;
  margin: 0 1rem;
  opacity: 0.9;
  animation: float 6s ease-in-out infinite;
}

.hero-icons i:nth-child(2) {
  animation-delay: -2s;
}

.hero-icons i:nth-child(3) {
  animation-delay: -4s;
}

.btn-get-started {
  font-family: var(--font-primary);
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 10px 28px;
  border-radius: 50px;
  transition: 0.5s;
  margin: 10px 20px 0 0;
  color: var(--color-primary);
  background: var(--color-white);
  text-decoration: none;
}

.btn-get-started:hover {
  background: var(--color-light);
  transform: translateY(-2px);
}

.btn-watch-video {
  font-family: var(--font-primary);
  font-size: 16px;
  transition: 0.5s;
  margin: 10px 0 0 0;
  color: var(--color-white);
  font-weight: 600;
  display: flex;
  align-items: center;
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
}

.btn-watch-video i {
  color: var(--color-white);
  font-size: 32px;
  transition: 0.3s;
  margin-right: 8px;
}

.btn-watch-video:hover {
  color: var(--color-light);
}

.btn-watch-video:hover i {
  color: var(--color-light);
}

.fade-in {
  animation: fadeIn 1s ease-out;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
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
  .hero-shape {
    display: none;
  }
  
  .hero-icons {
    margin-top: 2rem;
  }
  
  .hero-icons i {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  #hero {
    text-align: center;
    padding-top: 120px;
  }

  #hero h1 {
    font-size: 32px;
    line-height: 1.2;
  }

  #hero h2 {
    font-size: 20px;
    line-height: 1.5;
  }

  .hero-icons {
    margin-top: 3rem;
  }

  .d-flex {
    justify-content: center;
  }
}
</style> 