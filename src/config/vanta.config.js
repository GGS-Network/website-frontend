export const vantaConfig = {
  // Basis-Konfiguration
  el: '#vanta-bg',
  mouseControls: false,
  touchControls: false,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,

  // Farben und Erscheinungsbild
  backgroundColor: 0x3730A3,
  cloudColor: 0x6D28D9,
  cloudShadowColor: 0x4C1D95,
  sunColor: 0xF59E0B,
  sunGlareColor: 0xD97706,
  sunlightColor: 0xFCD34D,

  // Performance-Optimierungen
  speed: 0.6,
  renderClouds: 15,
  skyHeight: 500,
  cloudHeight: 0.2,
  cloudScale: 1.0,
  cloudDensity: 0.03,
  shadowEnabled: false,
  lightIntensity: 1.0,
  raycastResolution: 1,
  antialias: false,
  fps: 30,

  // Mobile Konfiguration
  mobileConfig: {
    renderClouds: 8,
    cloudDensity: 0.02,
    fps: 24,
    scaleMobile: 0.8
  },

  // Performance Modi
  performanceModes: {
    high: {
      renderClouds: 15,
      cloudDensity: 0.03,
      fps: 30,
      shadowEnabled: false
    },
    medium: {
      renderClouds: 10,
      cloudDensity: 0.02,
      fps: 24,
      shadowEnabled: false
    },
    low: {
      renderClouds: 8,
      cloudDensity: 0.02,
      fps: 24,
      shadowEnabled: false,
      antialias: false
    }
  }
}

// Hilfsfunktionen für Vanta
export const vantaHelpers = {
  // Performance-Mode basierend auf Device und Browser-Leistung
  getPerformanceMode() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (isMobile) return 'low'
    
    // Einfacher Performance-Check
    const performanceEntry = window.performance.timing
    const pageLoadTime = performanceEntry.loadEventEnd - performanceEntry.navigationStart
    
    if (pageLoadTime < 2000) return 'high'
    if (pageLoadTime < 4000) return 'medium'
    return 'low'
  },

  // Konfiguration für verschiedene Bildschirmgrößen
  getResponsiveConfig(width) {
    if (width < 768) {
      return {
        ...vantaConfig.mobileConfig,
        scale: 0.8
      }
    }
    if (width < 1024) {
      return {
        renderClouds: 12,
        cloudDensity: 0.025,
        fps: 30,
        scale: 0.9
      }
    }
    return {}
  },

  // Optimierte Einstellungen basierend auf Systemressourcen
  getOptimizedConfig() {
    const performanceMode = this.getPerformanceMode()
    const screenWidth = window.innerWidth
    const responsiveConfig = this.getResponsiveConfig(screenWidth)

    return {
      ...vantaConfig,
      ...vantaConfig.performanceModes[performanceMode],
      ...responsiveConfig
    }
  }
} 