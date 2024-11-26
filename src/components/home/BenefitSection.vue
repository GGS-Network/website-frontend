<template>
  <section class="benefits">
    <div class="container">
      <div class="section-title text-center mb-5">
        <h2>Ihre Vorteile mit Velocity Desk</h2>
        <p>Entdecken Sie die vielfältigen Vorteile unserer integrierten IT-Lösung</p>
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
          '768': {
            slidesPerView: 2,
            spaceBetween: 30
          },
          '1024': {
            slidesPerView: 3,
            spaceBetween: 30
          }
        }"
        :loop="true"
        class="benefits-swiper"
      >
        <swiper-slide v-for="benefit in benefits" :key="benefit.id">
          <div class="benefit-card">
            <div class="benefit-icon">
              <i :class="benefit.icon"></i>
            </div>
            <div class="benefit-content">
              <h3>{{ benefit.title }}</h3>
              <p>{{ benefit.description }}</p>
            </div>
            <div class="benefit-features">
              <ul>
                <li v-for="(feature, index) in benefit.features" :key="index">
                  <i class="bi bi-check-circle-fill"></i>
                  {{ feature }}
                </li>
              </ul>
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
  name: 'BenefitSection',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      SwiperAutoplay: Autoplay,
      SwiperPagination: Pagination,
      SwiperNavigation: Navigation,
      benefits: [
        {
          id: 1,
          icon: 'bi bi-shield-check',
          title: 'Maximale Sicherheit',
          description: 'Umfassender Schutz Ihrer Daten und Systeme',
          features: [
            'Enterprise-Grade Verschlüsselung',
            'Mehrstufige Authentifizierung',
            'Regelmäßige Sicherheits-Updates'
          ]
        },
        {
          id: 2,
          icon: 'bi bi-graph-up',
          title: 'Skalierbare Leistung',
          description: 'Wachsen Sie flexibel mit Ihren Anforderungen',
          features: [
            'Automatische Ressourcenanpassung',
            'Pay-as-you-grow Modell',
            'Unbegrenzte Kapazitäten'
          ]
        },
        {
          id: 3,
          icon: 'bi bi-cash-coin',
          title: 'Kosteneffizienz',
          description: 'Optimierte IT-Ausgaben und volle Kostenkontrolle',
          features: [
            'Keine Investitionskosten',
            'Transparente Abrechnung',
            'Reduzierte Betriebskosten'
          ]
        },
        {
          id: 4,
          icon: 'bi bi-lightning',
          title: 'Hohe Verfügbarkeit',
          description: 'Zuverlässiger Betrieb rund um die Uhr',
          features: [
            '99.99% Uptime-Garantie',
            'Redundante Systeme',
            '24/7 Monitoring'
          ]
        },
        {
          id: 5,
          icon: 'bi bi-gear',
          title: 'Einfache Verwaltung',
          description: 'Intuitive Steuerung aller IT-Ressourcen',
          features: [
            'Zentrales Dashboard',
            'Automatisierte Prozesse',
            'Self-Service Portal'
          ]
        },
        {
          id: 6,
          icon: 'bi bi-clock-history',
          title: 'Schnelle Migration',
          description: 'Reibungsloser Übergang in die Cloud',
          features: [
            'Automatisierte Migration',
            'Zero-Downtime Transfer',
            'Datenintegrität garantiert'
          ]
        },
        {
          id: 7,
          icon: 'bi bi-headset',
          title: '24/7 Support',
          description: 'Professionelle Unterstützung rund um die Uhr',
          features: [
            'Dedizierte Support-Teams',
            'Mehrsprachiger Support',
            'Schnelle Reaktionszeiten'
          ]
        },
        {
          id: 8,
          icon: 'bi bi-shield-lock',
          title: 'DSGVO-Konformität',
          description: 'Vollständige Einhaltung der Datenschutzrichtlinien',
          features: [
            'Zertifizierte Rechenzentren',
            'Verschlüsselte Übertragung',
            'Dokumentierte Prozesse'
          ]
        },
        {
          id: 9,
          icon: 'bi bi-tools',
          title: 'Flexible Integration',
          description: 'Nahtlose Anbindung bestehender Systeme',
          features: [
            'Offene API-Schnittstellen',
            'Standard-Protokolle',
            'Custom Integrationen'
          ]
        },
        {
          id: 10,
          icon: 'bi bi-graph-up-arrow',
          title: 'Performance-Optimierung',
          description: 'Kontinuierliche Leistungsverbesserung',
          features: [
            'Automatisches Load-Balancing',
            'Performance-Monitoring',
            'Proaktive Optimierung'
          ]
        },
        {
          id: 11,
          icon: 'bi bi-globe',
          title: 'Globale Verfügbarkeit',
          description: 'Weltweiter Zugriff auf Ihre Ressourcen',
          features: [
            'Multi-Region Deployment',
            'Edge Computing',
            'Content Delivery Network'
          ]
        },
        {
          id: 12,
          icon: 'bi bi-patch-check',
          title: 'Zertifizierte Qualität',
          description: 'Höchste Standards für Ihre IT',
          features: [
            'ISO 27001 zertifiziert',
            'TÜV-geprüft',
            'Regelmäßige Audits'
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.benefits {
  padding: 100px 0;
  background: var(--color-light);
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
  font-size: 1.1rem;
}

.benefits-swiper {
  padding: 20px 0 60px;
}

.benefit-card {
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

.benefit-card::before {
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

.benefit-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 30px 60px rgba(72, 52, 212, 0.15);
  border-color: rgba(72, 52, 212, 0.2);
}

.benefit-card:hover::before {
  background: linear-gradient(135deg, rgba(72, 52, 212, 0.1) 0%, rgba(72, 52, 212, 0.02) 100%);
}

.benefit-icon {
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

.benefit-card:hover .benefit-icon {
  transform: scale(1.1) rotate(-5deg);
  box-shadow: 0 15px 30px rgba(72, 52, 212, 0.3);
}

.benefit-icon i {
  font-size: 32px;
  color: white;
  transition: all 0.5s ease;
}

.benefit-card:hover .benefit-icon i {
  transform: scale(1.1);
}

.benefit-content {
  margin-bottom: 20px;
}

.benefit-content h3 {
  color: var(--color-primary);
  font-size: 1.4rem;
  margin-bottom: 10px;
  font-weight: 600;
}

.benefit-content p {
  color: var(--color-secondary);
  line-height: 1.6;
  margin: 0;
}

.benefit-features {
  margin-top: auto;
}

.benefit-features ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.benefit-features li {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-secondary);
  margin-bottom: 10px;
}

.benefit-features li i {
  color: var(--color-primary);
  font-size: 1.2rem;
}

/* Swiper Custom Styles */
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
  .benefits {
    padding: 60px 0;
  }

  .section-title h2 {
    font-size: 2rem;
  }

  .benefit-card {
    min-height: 350px;
    padding: 25px;
  }

  .benefit-icon {
    width: 65px;
    height: 65px;
  }

  .benefit-icon i {
    font-size: 28px;
  }

  .benefit-content h3 {
    font-size: 1.2rem;
  }

  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    display: none;
  }
}
</style> 