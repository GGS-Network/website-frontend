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
          <li><router-link to="/" class="nav-link" :class="{ 'active': isHomePage }" @click="closeMobileNav">Home</router-link></li>
          <li><router-link to="/services" class="nav-link" :class="{ 'active': isServicesPage }" @click="closeMobileNav">Leistungen</router-link></li>
          <li><router-link to="/features" class="nav-link" :class="{ 'active': isFeaturesPage }" @click="closeMobileNav">Funktionen</router-link></li>
          <li><router-link to="/vision" class="nav-link" :class="{ 'active': isVisionPage }" @click="closeMobileNav">Vision</router-link></li>
          <li><router-link to="/status" class="nav-link" :class="{ 'active': isStatusPage }" @click="closeMobileNav">Status</router-link></li>
          <li><router-link to="/about-us" class="nav-link" :class="{ 'active': isAboutUsPage }" @click="closeMobileNav">Über uns</router-link></li>
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
  methods: {
    toggleMobileNav() {
      this.isMobileNavOpen = !this.isMobileNavOpen
      document.body.style.overflow = this.isMobileNavOpen ? 'hidden' : ''
    },
    closeMobileNav() {
      this.isMobileNavOpen = false
      document.body.style.overflow = ''
    },
    handleScroll() {
      const currentScrollY = window.scrollY
      this.isScrolled = currentScrollY > 50
    }
  },
  watch: {
    $route() {
      this.closeMobileNav()
      this.handleScroll()
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    document.body.style.overflow = ''
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
  background: rgba(72, 52, 212, 0.95) !important;
  backdrop-filter: blur(10px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(10px) saturate(180%) !important;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2) !important;
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
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  left: 50%;
  width: 0;
  height: 2px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  transform: translateX(-50%);
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
    position: fixed;
    right: 20px;
    top: 20px;
    z-index: 9999;
    background: transparent;
    border: none;
    font-size: 28px;
    transition: all 0.3s ease;
    cursor: pointer;
    color: var(--color-white);
    padding: 10px;
  }

  .navbar {
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    max-width: 300px;
    height: 100vh;
    transition: 0.3s;
    z-index: 9998;
    padding: 100px 0 0 0;
    background: linear-gradient(135deg, rgba(72, 52, 212, 0.97) 0%, rgba(104, 109, 224, 0.97) 100%);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    overflow-y: auto;
    box-shadow: -5px 0 25px rgba(0, 0, 0, 0.15);
  }

  .navbar.navbar-mobile {
    right: 0;
  }

  .navbar ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
  }

  .navbar ul li {
    width: 100%;
  }

  .nav-link {
    margin: 0;
    padding: 15px 20px;
    width: 100%;
    display: block;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.9);
  }

  .nav-link:hover,
  .nav-link.active {
    background: rgba(255, 255, 255, 0.15);
    color: var(--color-white);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .nav-link::after {
    display: none;
  }

  .logo {
    position: relative;
    z-index: 9999;
  }

  .logo-text {
    font-size: 20px;
  }

  .logo-svg {
    height: 30px;
  }

  /* Verbesserte Animation für Mobile-Menü */
  .navbar ul li {
    opacity: 0;
    transform: translateX(20px);
    animation: slideIn 0.3s ease forwards;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(30px);
      backdrop-filter: blur(0px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
      backdrop-filter: blur(10px);
    }
  }

  .navbar.navbar-mobile ul li {
    animation-play-state: running;
  }

  /* Animierte Verzögerung für jeden Menüpunkt */
  .navbar ul li:nth-child(1) { animation-delay: 0.1s; }
  .navbar ul li:nth-child(2) { animation-delay: 0.2s; }
  .navbar ul li:nth-child(3) { animation-delay: 0.3s; }
  .navbar ul li:nth-child(4) { animation-delay: 0.4s; }
  .navbar ul li:nth-child(5) { animation-delay: 0.5s; }
  .navbar ul li:nth-child(6) { animation-delay: 0.6s; }

  /* Hamburger Icon Animation */
  .mobile-nav-toggle {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(72, 52, 212, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .mobile-nav-toggle:hover {
    background: rgba(72, 52, 212, 0.9);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }

  /* Scrollbar Styling für mobile Navigation */
  .navbar::-webkit-scrollbar {
    width: 5px;
  }

  .navbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }

  .navbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 3px;
  }

  .navbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.25);
  }
}

/* Verbesserte Touch-Bereiche für mobile Geräte */
@media (hover: none) {
  .nav-link {
    padding: 15px 20px;
  }

  .mobile-nav-toggle {
    padding: 12px;
  }
}

/* Landscape Mode Anpassungen */
@media (max-width: 991px) and (orientation: landscape) {
  .navbar {
    padding-top: 80px;
  }

  .nav-link {
    padding: 10px 20px;
  }
}
</style> 