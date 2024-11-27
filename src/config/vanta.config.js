// Basis-Konfiguration für Vanta.js
const baseConfig = {
  mouseControls: false,
  touchControls: false,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  skyColor: 0x4834d4,
  cloudColor: 0x686de0,
  cloudShadowColor: 0x7158e2,
  sunColor: 0xffffff,
  sunGlareColor: 0xffffff,
  sunlightColor: 0xffffff,
  shadowEnabled: true
}

// Gerätespezifische Konfigurationen
const deviceConfigs = {
  // Desktop High-End (große Bildschirme, hohe Leistung)
  desktop: {
    ...baseConfig,
    speed: 0.8,
    scale: 1.5,
    coverage: 0.7,
    opacity: 0.8,
    cloudWidth: 1.2,
    cloudHeight: 1.2,
    renderClouds: 15,
    cloudDensity: 0.03,
    fps: 60
  },

  // Desktop Low-End (große Bildschirme, niedrige Leistung)
  desktopLow: {
    ...baseConfig,
    speed: 0.6,
    scale: 1.3,
    coverage: 0.6,
    opacity: 0.7,
    cloudWidth: 1.0,
    cloudHeight: 1.0,
    renderClouds: 10,
    cloudDensity: 0.02,
    fps: 30
  },

  // Tablet
  tablet: {
    ...baseConfig,
    speed: 0.5,
    scale: 1.2,
    coverage: 0.5,
    opacity: 0.7,
    cloudWidth: 0.9,
    cloudHeight: 0.9,
    renderClouds: 8,
    cloudDensity: 0.02,
    fps: 30
  },

  // Mobile High-End
  mobile: {
    ...baseConfig,
    speed: 0.4,
    scale: 1.0,
    coverage: 0.4,
    opacity: 0.6,
    cloudWidth: 0.8,
    cloudHeight: 0.8,
    renderClouds: 6,
    cloudDensity: 0.015,
    fps: 30,
    scaleMobile: 1.0
  },

  // Mobile Low-End
  mobileLow: {
    ...baseConfig,
    speed: 0.3,
    scale: 0.8,
    coverage: 0.3,
    opacity: 0.5,
    cloudWidth: 0.7,
    cloudHeight: 0.7,
    renderClouds: 4,
    cloudDensity: 0.01,
    fps: 24,
    scaleMobile: 0.8
  }
}

// Performance-Erkennung
const detectPerformance = () => {
  const memory = navigator?.deviceMemory || 4
  const cores = navigator?.hardwareConcurrency || 4
  return {
    isHighEnd: memory >= 4 && cores >= 4,
    isLowEnd: memory < 4 || cores < 4
  }
}

// Gerätetyp-Erkennung
const detectDeviceType = (width) => {
  if (width >= 1200) return 'desktop'
  if (width >= 768) return 'tablet'
  return 'mobile'
}

// Konfiguration basierend auf Gerät und Performance
export const getVantaConfig = (width = window.innerWidth) => {
  const deviceType = detectDeviceType(width)
  const { isHighEnd } = detectPerformance()
  
  let mode = ''
  let config = null

  switch (deviceType) {
    case 'desktop':
      mode = isHighEnd ? 'Desktop High-End' : 'Desktop Low-End'
      config = isHighEnd ? deviceConfigs.desktop : deviceConfigs.desktopLow
      break
    case 'tablet':
      mode = 'Tablet'
      config = deviceConfigs.tablet
      break
    case 'mobile':
      mode = isHighEnd ? 'Mobile High-End' : 'Mobile Low-End'
      config = isHighEnd ? deviceConfigs.mobile : deviceConfigs.mobileLow
      break
    default:
      mode = 'Desktop Low-End (Fallback)'
      config = deviceConfigs.desktopLow
  }

  // Log aktiven Modus und Performance-Details
  console.log('%cVanta.js Mode:', 'color: #4834d4; font-weight: bold; font-size: 12px;')
  console.log({
    mode,
    deviceType,
    screenWidth: width,
    isHighEnd,
    memory: `${navigator?.deviceMemory || 'unknown'}GB`,
    cores: navigator?.hardwareConcurrency || 'unknown',
    fps: config.fps,
    quality: {
      clouds: config.renderClouds,
      density: config.cloudDensity,
      scale: config.scale
    }
  })

  return config
}

// Dynamische Konfigurationsanpassung
export const updateVantaConfig = (vantaEffect, width = window.innerWidth) => {
  const newConfig = getVantaConfig(width)
  if (vantaEffect) {
    vantaEffect.setOptions(newConfig)
  }
  return newConfig
}

// Performance-Optimierung für Scroll-Events
export const getScrollConfig = (isScrolling = false) => {
  return {
    renderClouds: isScrolling ? 6 : getVantaConfig().renderClouds,
    cloudDensity: isScrolling ? 0.01 : getVantaConfig().cloudDensity,
    fps: isScrolling ? 24 : getVantaConfig().fps
  }
} 