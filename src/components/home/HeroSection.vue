<template>
  <section id="hero" class="d-flex align-items-center">
    <div id="vanta-bg" v-if="useVanta"></div>
    <div v-else class="standard-bg">
      <div class="gradient-overlay"></div>
      <div class="dynamic-clouds">
        <div class="cloud-layer cloud-layer-1"></div>
        <div class="cloud-layer cloud-layer-2"></div>
        <div class="cloud-layer cloud-layer-3"></div>
      </div>
      <div class="animated-shapes"></div>
    </div>
    <div class="theme-switcher">
      <div class="switch-container">
        <span :class="{ active: !useVanta }">Standard</span>
        <label class="switch">
          <input type="checkbox" v-model="useVanta">
          <span class="slider"></span>
        </label>
        <span :class="{ active: useVanta }">Dynamic</span>
      </div>
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
              <div
                v-for="element in randomPositions"
                :key="element.id"
                class="element"
                :style="element.style"
              >
                <i :class="element.icon"></i>
                <span>{{ element.text }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="scroll-down">
      <a href="#services" class="scrollto">
        <i class="bi bi-chevron-down"></i>
      </a>
    </div>
  </section>
</template>

<script>
import * as THREE from 'three'
import CLOUDS from 'vanta/dist/vanta.clouds.min'
import { getVantaConfig, updateVantaConfig, getScrollConfig } from '@/config/vanta.config'

export default {
  name: 'HeroSection',
  emits: ['show-contact', 'show-demo'],
  data() {
    return {
      vantaEffect: null,
      vantaInitialized: false,
      useVanta: true,
      isInViewport: false,
      elements: [
        { 
          id: 'database',
          icon: 'bi bi-database',
          text: 'DBaaS',
          size: { width: '140px', height: '140px' },
          position: { top: '15%', left: '10%' }
        },
        { 
          id: 'desktop',
          icon: 'bi bi-display',
          text: 'DaaS',
          size: { width: '140px', height: '140px' },
          position: { top: '20%', right: '15%' }
        },
        { 
          id: 'cloud',
          icon: 'bi bi-cloud',
          text: 'IaaS',
          size: { width: '140px', height: '140px' },
          position: { top: '45%', left: '25%' }
        },
        { 
          id: 'network',
          icon: 'bi bi-diagram-3',
          text: 'NaaS',
          size: { width: '140px', height: '140px' },
          position: { top: '60%', right: '20%' }
        },
        { 
          id: 'storage',
          icon: 'bi bi-hdd-network',
          text: 'BaaS',
          size: { width: '140px', height: '140px' },
          position: { top: '75%', left: '15%' }
        }
      ]
    }
  },
  computed: {
    randomPositions() {
      return this.elements.map(element => ({
        ...element,
        style: {
          ...element.size,
          position: 'absolute',
          ...element.position,
          transform: `translate(${this.getRandomOffset()}px, ${this.getRandomOffset()}px)`,
          animationDelay: `${this.getRandomNumber(0, 2)}s`,
          zIndex: this.getRandomNumber(1, 5)
        }
      }))
    }
  },
  watch: {
    useVanta: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.$nextTick(() => {
            if (!this.vantaEffect) {
              this.initVantaEffect()
            }
          })
        } else {
          if (this.vantaEffect) {
            this.vantaEffect.destroy()
            this.vantaEffect = null
          }
        }
      }
    }
  },
  mounted() {
    const savedPreference = localStorage.getItem('heroBackground')
    if (savedPreference) {
      this.useVanta = savedPreference === 'vanta'
    }
    
    if (this.useVanta) {
      this.initVantaEffect()
      window.addEventListener('scroll', this.handleScroll, { passive: true })
    }
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy()
    }
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('scroll', this.handleScroll)
    clearTimeout(this.scrollTimeout)
  },
  methods: {
    initVantaEffect() {
      if (this.vantaEffect) return

      const config = {
        el: "#vanta-bg",
        THREE,
        ...getVantaConfig()
      }
      
      this.vantaEffect = CLOUDS(config)
    },

    handleResize() {
      if (this.vantaEffect) {
        updateVantaConfig(this.vantaEffect, window.innerWidth)
      }
    },

    handleScroll() {
      if (this.vantaEffect) {
        const scrollConfig = getScrollConfig(true)
        this.vantaEffect.setOptions(scrollConfig)
        
        clearTimeout(this.scrollTimeout)
        this.scrollTimeout = setTimeout(() => {
          const defaultConfig = getScrollConfig(false)
          this.vantaEffect.setOptions(defaultConfig)
        }, 150)
      }
    },

    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    getRandomOffset() {
      return this.getRandomNumber(-20, 20)
    }
  }
}
</script>

<style scoped>
#hero {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  padding-top: var(--header-height);
}

#vanta-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.container {
  position: relative;
  z-index: 1;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  height: 600px;
  perspective: 1000px;
}

.element {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  animation: float 6s ease-in-out infinite;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.element:hover {
  transform: scale(1.1) translateY(-10px) !important;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.element i {
  font-size: 2.5rem;
  color: var(--color-white);
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.element span {
  color: var(--color-white);
  font-weight: 600;
  font-size: 1.1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.database, .desktop, .cloud, .network, .storage {
  position: absolute;
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
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.btn-get-started {
  background: rgba(255, 255, 255, 0.95);
  color: var(--color-primary);
  border: none;
}

.btn-learn-more {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-white);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(12px);
  margin-left: 20px;
}

.btn-get-started:hover, .btn-learn-more:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Animations */
@keyframes particleMove {
  0% { background-position: 0 0; }
  100% { background-position: 50px 50px; }
}

@keyframes float {
  0% {
    transform: translate(var(--random-x, 0), var(--random-y, 0)) translateY(0);
  }
  50% {
    transform: translate(var(--random-x, 0), var(--random-y, 0)) translateY(-15px);
  }
  100% {
    transform: translate(var(--random-x, 0), var(--random-y, 0)) translateY(0);
  }
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
    height: 500px;
  }

  .element {
    transform: scale(0.9);
  }
}

@media (max-width: 768px) {
  .floating-elements {
    height: 400px;
  }

  .element {
    transform: scale(0.8);
  }
}

.hero-clouds-1 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'%3E%3Cpath fill='%23FFFFFF' fill-opacity='0.05' d='M800 400c0-88.366-71.634-160-160-160-28.278 0-54.784 7.373-77.82 20.273C548.622 165.49 463.768 100 365 100c-121.133 0-220 98.867-220 220 0 27.796 5.197 54.338 14.629 78.779C108.671 419.89 75 468.645 75 525c0 82.843 67.157 150 150 150h450c82.843 0 150-67.157 150-150 0-44.632-19.517-84.705-50.569-112.091C789.245 429.988 800 415.967 800 400z'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 1000px;
  animation: floatingClouds 120s linear infinite;
  pointer-events: none;
}

.hero-clouds-2 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'%3E%3Cpath fill='%23FFFFFF' fill-opacity='0.03' d='M800 400c0-88.366-71.634-160-160-160-28.278 0-54.784 7.373-77.82 20.273C548.622 165.49 463.768 100 365 100c-121.133 0-220 98.867-220 220 0 27.796 5.197 54.338 14.629 78.779C108.671 419.89 75 468.645 75 525c0 82.843 67.157 150 150 150h450c82.843 0 150-67.157 150-150 0-44.632-19.517-84.705-50.569-112.091C789.245 429.988 800 415.967 800 400z'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 800px;
  animation: floatingCloudsReverse 180s linear infinite;
  pointer-events: none;
}

@keyframes floatingClouds {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 1000px 0;
  }
}

@keyframes floatingCloudsReverse {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -800px 0;
  }
}

/* Anpassungen für bessere Lesbarkeit mit Vanta-Hintergrund */
h1, h2 {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Performance-Optimierungen */
* {
  will-change: transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
}

@media (max-width: 768px) {
  .vanta-canvas {
    opacity: 0.8; /* Reduzierte Opacity für bessere Mobile-Performance */
  }
  
  .element {
    backdrop-filter: blur(8px); /* Reduzierter Blur-Effekt auf Mobile */
  }
}

/* Performance Optimierungen für den Canvas */
#vanta-bg canvas {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Reduzierte Animation auf mobilen Geräten */
@media (max-width: 768px) {
  .hero-particles {
    opacity: 0.5;
  }
  
  #vanta-bg {
    opacity: 0.8;
  }
}

.theme-switcher {
  position: absolute;
  top: 100px;
  right: 20px;
  z-index: 100;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.theme-switcher:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.switch-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.switch-container span {
  color: var(--color-white);
  font-size: 0.9rem;
  opacity: 0.7;
  transition: all 0.3s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.switch-container span.active {
  opacity: 1;
  font-weight: 600;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
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
  background-color: rgba(255, 255, 255, 0.2);
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

input:checked + .slider {
  background-color: var(--color-tertiary);
}

input:checked + .slider:before {
  transform: translateX(24px);
}

/* Responsive Anpassungen */
@media (max-width: 768px) {
  .theme-switcher {
    top: 80px;
    right: 10px;
    padding: 8px 15px;
  }

  .switch {
    width: 44px;
    height: 24px;
  }

  .slider:before {
    height: 18px;
    width: 18px;
  }

  input:checked + .slider:before {
    transform: translateX(20px);
  }

  .switch-container span {
    font-size: 0.8rem;
  }
}

/* Verbesserte Sichtbarkeit bei verschiedenen Hintergründen */
@supports not (backdrop-filter: blur(10px)) {
  .theme-switcher {
    background: rgba(255, 255, 255, 0.15);
  }
}

/* Standard Background Styles */
.standard-bg {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: pulse 8s ease-in-out infinite;
}

.dynamic-clouds {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.cloud-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: repeat;
  opacity: 0;
  animation: fadeIn 1s ease-out forwards;
}

.cloud-layer-1 {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'%3E%3Cpath fill='%23FFFFFF' fill-opacity='0.07' d='M800 400c0-88.366-71.634-160-160-160-28.278 0-54.784 7.373-77.82 20.273C548.622 165.49 463.768 100 365 100c-121.133 0-220 98.867-220 220 0 27.796 5.197 54.338 14.629 78.779C108.671 419.89 75 468.645 75 525c0 82.843 67.157 150 150 150h450c82.843 0 150-67.157 150-150 0-44.632-19.517-84.705-50.569-112.091C789.245 429.988 800 415.967 800 400z'/%3E%3C/svg%3E");
  background-size: 1000px;
  animation: 
    fadeIn 1s ease-out forwards,
    floatClouds 120s linear infinite;
}

.cloud-layer-2 {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'%3E%3Cpath fill='%23FFFFFF' fill-opacity='0.05' d='M800 400c0-88.366-71.634-160-160-160-28.278 0-54.784 7.373-77.82 20.273C548.622 165.49 463.768 100 365 100c-121.133 0-220 98.867-220 220 0 27.796 5.197 54.338 14.629 78.779C108.671 419.89 75 468.645 75 525c0 82.843 67.157 150 150 150h450c82.843 0 150-67.157 150-150 0-44.632-19.517-84.705-50.569-112.091C789.245 429.988 800 415.967 800 400z'/%3E%3C/svg%3E");
  background-size: 800px;
  animation: 
    fadeIn 1s ease-out forwards,
    floatCloudsReverse 180s linear infinite;
  transform: scale(1.2);
}

.cloud-layer-3 {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'%3E%3Cpath fill='%23FFFFFF' fill-opacity='0.03' d='M800 400c0-88.366-71.634-160-160-160-28.278 0-54.784 7.373-77.82 20.273C548.622 165.49 463.768 100 365 100c-121.133 0-220 98.867-220 220 0 27.796 5.197 54.338 14.629 78.779C108.671 419.89 75 468.645 75 525c0 82.843 67.157 150 150 150h450c82.843 0 150-67.157 150-150 0-44.632-19.517-84.705-50.569-112.091C789.245 429.988 800 415.967 800 400z'/%3E%3C/svg%3E");
  background-size: 600px;
  animation: 
    fadeIn 1s ease-out forwards,
    floatClouds 150s linear infinite;
  transform: scale(1.5);
}

@keyframes floatClouds {
  from {
    background-position: -1000px 0;
  }
  to {
    background-position: 1000px 0;
  }
}

@keyframes floatCloudsReverse {
  from {
    background-position: 1000px 0;
  }
  to {
    background-position: -1000px 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

.animated-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 50px 50px, 30px 30px;
  animation: moveShapes 20s linear infinite;
  opacity: 0.5;
}

@keyframes moveShapes {
  0% { background-position: 0 0, 0 0; }
  100% { background-position: 50px 50px, 30px 30px; }
}

/* Responsive Anpassungen */
@media (max-width: 768px) {
  .cloud-layer {
    opacity: 0.7;
  }
  
  .cloud-layer-1 { animation-duration: 180s; }
  .cloud-layer-2 { animation-duration: 240s; }
  .cloud-layer-3 { animation-duration: 200s; }
}

.scroll-down {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.scroll-down a {
  color: var(--color-white);
  font-size: 24px;
  display: inline-block;
  text-decoration: none;
  transition: all 0.3s ease;
  animation: bounce 2s infinite;
  opacity: 0.8;
  background: rgba(255, 255, 255, 0.1);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.scroll-down a:hover {
  opacity: 1;
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.2);
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Verbesserte Transition zwischen den Modi */
#vanta-bg, .standard-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.5s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 