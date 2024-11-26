<template>
  <section id="services" class="services">
    <div class="container">
      <div class="section-title text-center mb-5">
        <h2>Was bietet Velocity Desk?</h2>
        <p>Velocity Desk bietet Ihnen ein leistungsstarkes IT-Ökosystem: Von Database as a Service (DBaaS) bis hin zu Network as a Service (NaaS) decken wir alles ab, was Ihr Unternehmen braucht.</p>
      </div>

      <swiper
        :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation]"
        :slides-per-view="1"
        :space-between="30"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :pagination="{ clickable: true, dynamicBullets: true }"
        :navigation="true"
        :breakpoints="{
          '320': {
            slidesPerView: 1,
            spaceBetween: 20
          },
          '640': {
            slidesPerView: 1,
            spaceBetween: 20
          },
          '768': {
            slidesPerView: 2,
            spaceBetween: 30
          },
          '1024': {
            slidesPerView: 3,
            spaceBetween: 30
          },
          '1400': {
            slidesPerView: 3,
            spaceBetween: 40
          }
        }"
        :centeredSlides="isMobile"
        :loop="true"
        class="services-swiper"
      >
        <swiper-slide v-for="(service, type) in services" :key="type">
          <div class="service-card" @click="$emit('show-service', type)">
            <div class="service-icon">
              <i :class="service.icon"></i>
            </div>
            <div class="service-content">
              <h3>{{ service.title }}</h3>
              <p>{{ service.description }}</p>
            </div>
            <div class="service-hover">
              <span>Mehr erfahren</span>
              <i class="bi bi-arrow-right"></i>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default {
  name: 'ServiceSection',
  components: {
    Swiper,
    SwiperSlide
  },
  emits: ['show-service'],
  data() {
    return {
      SwiperAutoplay: Autoplay,
      SwiperPagination: Pagination,
      SwiperNavigation: Navigation,
      windowWidth: window.innerWidth,
      services: {
        dbaas: {
          icon: 'bi bi-database',
          title: 'Database as a Service (DBaaS)',
          description: 'Schnelle, skalierbare Datenbanken für Unternehmen jeder Größe.'
        },
        daas: {
          icon: 'bi bi-display',
          title: 'Desktop as a Service (DaaS)',
          description: 'Flexibler und sicherer Zugriff auf Remote-Arbeitsplätze – jederzeit, überall.'
        },
        iaas: {
          icon: 'bi bi-cloud',
          title: 'Windows Company Infrastructure (IaaS)',
          description: 'Vollständige Unternehmens-IT in der Cloud, ohne Kompromisse bei Leistung oder Sicherheit.'
        },
        naas: {
          icon: 'bi bi-diagram-3',
          title: 'Network as a Service (NaaS)',
          description: 'Sichere und leistungsstarke Netzwerke, die skalieren, wenn Sie es brauchen.'
        },
        baas: {
          icon: 'bi bi-hdd-network',
          title: 'Storage Backend as a Service (BaaS)',
          description: 'Zuverlässige Speicherlösungen mit DSGVO-Konformität.'
        },
        saas: {
          icon: 'bi bi-server',
          title: 'Server as a Service (SaaS)',
          description: 'Enterprise Server-Infrastruktur mit maximaler Leistung.'
        }
      }
    }
  },
  computed: {
    isMobile() {
      return this.windowWidth < 768
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
    }
  }
}
</script>

<style scoped>
.services {
  padding: 100px 0;
  background: var(--color-white);
  position: relative;
  margin: 50px 0;
}

.section-title h2 {
  color: var(--color-primary);
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-title p {
  color: var(--color-secondary);
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.6;
}

.services-swiper {
  padding: 20px 0 60px;
  margin: 0 -15px;
}

.service-card {
  background: white;
  border-radius: 24px;
  padding: 30px;
  height: 100%;
  min-height: 400px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(72, 52, 212, 0.05);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(135deg, rgba(72, 52, 212, 0.05) 0%, rgba(72, 52, 212, 0) 100%);
  z-index: 0;
  transition: all 0.5s ease;
}

.service-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 30px 60px rgba(72, 52, 212, 0.15);
  border-color: rgba(72, 52, 212, 0.2);
}

.service-card:hover::before {
  background: linear-gradient(135deg, rgba(72, 52, 212, 0.1) 0%, rgba(72, 52, 212, 0.02) 100%);
}

.service-icon {
  position: relative;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  transition: all 0.5s ease;
  box-shadow: 0 10px 20px rgba(72, 52, 212, 0.2);
}

.service-card:hover .service-icon {
  transform: scale(1.1) rotate(-5deg);
  box-shadow: 0 15px 30px rgba(72, 52, 212, 0.3);
}

.service-icon i {
  font-size: 32px;
  color: white;
  transition: all 0.5s ease;
}

.service-card:hover .service-icon i {
  transform: scale(1.1);
}

.service-content {
  position: relative;
  z-index: 1;
  flex-grow: 1;
}

.service-content h3 {
  color: var(--color-primary);
  font-size: 1.4rem;
  margin-bottom: 15px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.service-content p {
  color: var(--color-secondary);
  line-height: 1.7;
  margin: 0;
  font-size: 1.05rem;
}

.service-hover {
  position: absolute;
  bottom: -50px;
  left: 0;
  width: 100%;
  padding: 20px 35px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  z-index: 2;
}

.service-card:hover .service-hover {
  bottom: 0;
  opacity: 1;
}

.service-hover span {
  font-weight: 500;
  letter-spacing: 0.5px;
}

.service-hover i {
  font-size: 20px;
  transition: transform 0.3s ease;
}

.service-card:hover .service-hover i {
  transform: translateX(5px);
}

/* Verbesserte Swiper Styles */
:deep(.swiper-slide) {
  height: auto;
  transition: transform 0.3s ease;
}

:deep(.swiper-slide-active) {
  transform: scale(1.02);
}

:deep(.swiper-pagination) {
  bottom: -10px;
}

:deep(.swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
  background: var(--color-primary);
  opacity: 0.5;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  transform: scale(1.2);
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: var(--color-primary);
  width: 44px;
  height: 44px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: var(--color-primary);
  color: white;
  transform: scale(1.1);
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
  font-size: 20px;
}

@media (max-width: 768px) {
  .service-card {
    min-height: 350px;
    padding: 25px;
  }

  .service-icon {
    width: 65px;
    height: 65px;
  }

  .service-icon i {
    font-size: 28px;
  }

  .service-content h3 {
    font-size: 1.2rem;
  }

  .service-content p {
    font-size: 1rem;
  }

  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    display: none;
  }
}

/* Smooth Scrolling für iOS */
@supports (-webkit-overflow-scrolling: touch) {
  .services-swiper {
    -webkit-overflow-scrolling: touch;
  }
}
</style> 