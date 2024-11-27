class SecurityService {
  constructor() {
    this.rateLimit = {
      requests: new Map(),
      maxRequests: 100,
      timeWindow: 60000 // 1 Minute
    }
    this.checkCount = 0
    console.log('%cSecurity Service Initialized', 'color: #7158e2; font-weight: bold; font-size: 12px;')
  }

  async performSecurityCheck() {
    this.checkCount++
    console.group(`%cSecurity Check #${this.checkCount}`, 'color: #7158e2; font-weight: bold;')
    console.time('Security Check Duration')

    try {
      // Browser-Fingerprinting
      const fingerprint = await this.getBrowserFingerprint()
      console.log('%cBrowser Fingerprint:', 'color: #4834d4;', fingerprint)
      
      // Bot-Erkennung
      const botCheck = this.checkForBot()
      console.log('%cBot Check:', 'color: #4834d4;', botCheck ? '⚠️ Bot detected' : '✅ No bot detected')
      
      // VPN/Proxy-Erkennung
      const proxyCheck = await this.checkForProxy()
      console.log('%cProxy Check:', 'color: #4834d4;', proxyCheck ? '⚠️ Proxy detected' : '✅ No proxy detected')
      
      // Rate Limiting Check
      const rateLimitOk = this.checkRateLimit()
      console.log('%cRate Limit:', 'color: #4834d4;', rateLimitOk ? '✅ Within limits' : '⚠️ Rate limit exceeded')
      
      // Geolocation Check
      const geoCheck = await this.checkGeolocation()
      console.log('%cGeolocation:', 'color: #4834d4;', geoCheck || 'Not available')

      // Zusammenfassung der Checks
      const checkResults = {
        fingerprint,
        isBot: botCheck,
        isProxy: proxyCheck,
        rateLimitOk,
        geoCheck,
        timestamp: new Date().toISOString()
      }

      const passed = !botCheck && !proxyCheck && rateLimitOk
      console.log('%cFinal Result:', 'color: #4834d4; font-weight: bold;', 
        passed ? '✅ PASSED' : '❌ FAILED'
      )

      console.timeEnd('Security Check Duration')
      console.groupEnd()

      return {
        passed,
        details: checkResults
      }

    } catch (error) {
      console.error('%cSecurity Check Error:', 'color: #ff3b30;', error)
      console.timeEnd('Security Check Duration')
      console.groupEnd()
      return {
        passed: false,
        error: 'Security check failed'
      }
    }
  }

  async getBrowserFingerprint() {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      cores: navigator.hardwareConcurrency || 'unknown',
      memory: navigator?.deviceMemory || 'unknown',
      cookiesEnabled: navigator.cookieEnabled
    }
  }

  checkForBot() {
    const botPatterns = [
      /bot/i, /spider/i, /crawl/i, /headless/i,
      /selenium/i, /chrome-lighthouse/i
    ]
    
    const userAgent = navigator.userAgent.toLowerCase()
    return botPatterns.some(pattern => pattern.test(userAgent))
  }

  async checkForProxy() {
    // Hier könnte eine API-Abfrage zu einem Proxy-Detection-Service erfolgen
    return false
  }

  checkRateLimit() {
    const now = Date.now()
    const windowStart = now - this.rateLimit.timeWindow
    
    // Alte Einträge entfernen
    for (const [timestamp] of this.rateLimit.requests) {
      if (timestamp < windowStart) {
        this.rateLimit.requests.delete(timestamp)
      }
    }
    
    // Aktuelle Anfrage hinzufügen
    this.rateLimit.requests.set(now, true)
    
    return this.rateLimit.requests.size <= this.rateLimit.maxRequests
  }

  async checkGeolocation() {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
      
      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    } catch {
      return null
    }
  }

  // XSS-Prävention
  sanitizeInput(input) {
    if (typeof input !== 'string') return input
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
  }

  // CSRF-Token Management
  getCsrfToken() {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
  }
}

export const securityService = new SecurityService() 

// Performance Monitoring
if (process.env.NODE_ENV === 'development') {
  window.securityMetrics = {
    checks: 0,
    failures: 0,
    avgCheckTime: 0,
    lastCheck: null
  }

  const originalPerformCheck = securityService.performSecurityCheck.bind(securityService)
  securityService.performSecurityCheck = async function() {
    const startTime = performance.now()
    const result = await originalPerformCheck()
    const duration = performance.now() - startTime

    window.securityMetrics.checks++
    if (!result.passed) window.securityMetrics.failures++
    window.securityMetrics.avgCheckTime = 
      (window.securityMetrics.avgCheckTime * (window.securityMetrics.checks - 1) + duration) 
      / window.securityMetrics.checks
    window.securityMetrics.lastCheck = new Date()

    console.log('%cSecurity Metrics:', 'color: #7158e2; font-weight: bold;', {
      totalChecks: window.securityMetrics.checks,
      failureRate: `${((window.securityMetrics.failures / window.securityMetrics.checks) * 100).toFixed(2)}%`,
      avgCheckTime: `${window.securityMetrics.avgCheckTime.toFixed(2)}ms`,
      lastCheck: window.securityMetrics.lastCheck
    })

    return result
  }
} 