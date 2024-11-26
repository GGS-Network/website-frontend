<template>
  <header v-if="!isDashboardPage" id="header" class="fixed-top" :class="{ 'header-scrolled': isScrolled }">
    <div class="container d-flex align-items-center justify-content-between">
      <!-- Logo links -->
      <div class="logo">
        <router-link to="/" class="d-flex align-items-center">
          <svg class="logo-svg" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
            <g class="logo-icon">
              <path d="M40 35c0-6.627-5.373-12-12-12-1.4 0-2.743.24-4 .683C22.805 18.966 18.177 15.5 12.75 15.5 5.707 15.5 0 21.207 0 28.25c0 .55.035 1.092.103 1.623C.035 30.408 0 30.95 0 31.5 0 37.299 4.701 42 10.5 42h27c4.142 0 7.5-3.358 7.5-7.5z" 
                    fill="currentColor"/>
            </g>
          </svg>
          <span class="logo-text">VelocityDesk</span>
        </router-link>
      </div>

      <!-- Navigation rechts -->
      <nav id="navbar" class="navbar" :class="{ 'navbar-mobile': isMobileNavOpen }">
        <ul>
          <li><router-link to="/" class="nav-link" :class="{ 'active': isHomePage }">Home</router-link></li>
          <li><router-link to="/services" class="nav-link" :class="{ 'active': isServicesPage }">Leistungen</router-link></li>
          <li><router-link to="/features" class="nav-link" :class="{ 'active': isFeaturesPage }">Funktionen</router-link></li>
          <li><router-link to="/vision" class="nav-link" :class="{ 'active': isVisionPage }">Vision</router-link></li>
          <li><router-link to="/status" class="nav-link" :class="{ 'active': isStatusPage }">Status</router-link></li>
          <li><router-link to="/about-us" class="nav-link" :class="{ 'active': isAboutUsPage }">Über uns</router-link></li>
        </ul>
      </nav>

      <i class="bi bi-list mobile-nav-toggle" @click="toggleMobileNav"></i>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isMobileNavOpen: false,
      isScrolled: false,
      lastScrollY: 0,
      scrollDirection: 'down'
    }
  },
  computed: {
    isDashboardPage() {
      return this.$route.path.startsWith('/dashboard')
    },
    isHomePage() {
      return this.$route.path === '/'
    },
    isServicesPage() {
      return this.$route.path === '/services'
    },
    isFeaturesPage() {
      return this.$route.path === '/features'
    },
    isVisionPage() {
      return this.$route.path === '/vision'
    },
    isStatusPage() {
      return this.$route.path === '/status'
    },
    isAboutUsPage() {
      return this.$route.path === '/about-us'
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll() // Initial check
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    toggleMobileNav() {
      this.isMobileNavOpen = !this.isMobileNavOpen
    },
    handleScroll() {
      const currentScrollY = window.scrollY
      this.isScrolled = currentScrollY > 50
    }
  },
  watch: {
    $route() {
      // Schließe mobile Navigation bei Routenwechsel
      this.isMobileNavOpen = false
      // Prüfe Scroll-Status neu
      this.handleScroll()
    }
  }
}
</script>

<style scoped>
#header {
  height: var(--header-height);
  transition: all 0.5s;
  z-index: 997;
  background: transparent;
  padding: 25px 0;
  margin-top: 15px;
}

.header-scrolled {
  background: rgba(72, 52, 212, 0.85) !important;
  backdrop-filter: blur(10px) saturate(160%) !important;
  -webkit-backdrop-filter: blur(10px) saturate(160%) !important;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  margin-top: 0 !important;
  padding: 15px 0 !important;
}

.logo-svg {
  height: 40px;
  width: auto;
  margin-right: 10px;
  color: var(--color-white);
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  font-family: var(--font-primary);
  color: var(--color-white);
  letter-spacing: 0.5px;
}

.navbar ul {
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  align-items: center;
  gap: 10px;
}

.nav-link {
  position: relative;
  display: inline-block;
  padding: 5px 0;
  margin: 0 15px;
  font-weight: 500;
  font-size: 15px;
  color: var(--color-white);
  text-decoration: none;
  transition: all 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-white);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.mobile-nav-toggle {
  display: none;
  color: var(--color-white);
  font-size: 28px;
  cursor: pointer;
  line-height: 0;
  transition: 0.5s;
  position: fixed;
  right: 20px;
  top: 20px;
}

@media (max-width: 991px) {
  .mobile-nav-toggle {
    display: block;
  }

  .navbar {
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    max-width: 300px;
    bottom: 0;
    transition: 0.3s;
    z-index: 9997;
    background: var(--gradient-primary);
    padding-top: 80px;
  }

  .navbar ul {
    flex-direction: column;
    padding: 20px;
    gap: 0;
  }

  .navbar li {
    width: 100%;
    margin: 5px 0;
  }

  .nav-link {
    margin: 5px 0;
    padding: 10px 15px;
    display: block;
  }

  .navbar-mobile {
    right: 0;
  }
}
</style> 