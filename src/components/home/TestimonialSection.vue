<template>
  <section class="testimonial-section py-5">
    <div class="container">
      <div class="section-title text-center mb-5">
        <h2>Was unsere Kunden sagen</h2>
        <p>Erfahren Sie, wie Velocity Desk Unternehmen bei ihrer digitalen Transformation unterstützt</p>
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
        class="testimonials-swiper"
      >
        <swiper-slide v-for="(testimonial, index) in testimonials" :key="index">
          <div class="testimonial-card">
            <div class="testimonial-icon">
              <i class="bi bi-quote"></i>
            </div>
            <div class="testimonial-content">
              <div class="company-logo">
                <img :src="testimonial.logo" :alt="testimonial.company">
              </div>
              <p class="testimonial-text">{{ testimonial.text }}</p>
            </div>
            <div class="testimonial-author">
              <h4>{{ testimonial.author }}</h4>
              <p>{{ testimonial.company }}</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// Import der SVG-Logos
import lawFirmLogo from '@/assets/images/testimonials/law-firm-logo.svg'
import techSolutionsLogo from '@/assets/images/testimonials/tech-solutions-logo.svg'
import marketingAgencyLogo from '@/assets/images/testimonials/marketing-agency-logo.svg'
import energyProviderLogo from '@/assets/images/testimonials/energy-provider-logo.svg'
import medicalCenterLogo from '@/assets/images/testimonials/medical-center-logo.svg'

export default defineComponent({
  name: 'TestimonialSection',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      SwiperAutoplay: Autoplay,
      SwiperPagination: Pagination,
      SwiperNavigation: Navigation,
      testimonials: [
        {
          text: 'Velocity Desk hat unsere IT komplett transformiert – schneller, sicherer und einfacher als je zuvor.',
          author: 'Anwaltskanzlei Müller & Partner',
          company: 'Rechtsanwälte',
          logo: lawFirmLogo
        },
        {
          text: 'Die zentrale Verwaltung von Datenbanken und Desktops spart uns monatlich 20 % der IT-Kosten.',
          author: 'Tech4Solutions',
          company: 'IT-Dienstleister',
          logo: techSolutionsLogo
        },
        {
          text: 'Hervorragender Support und innovative Lösungen, die uns einen echten Wettbewerbsvorteil verschaffen.',
          author: 'Marketing Plus GmbH',
          company: 'Digitalagentur',
          logo: marketingAgencyLogo
        },
        {
          text: 'Die Implementierung war reibungslos und der Support ist erstklassig. Absolute Empfehlung!',
          author: 'Stadtwerke Musterstadt',
          company: 'Energieversorger',
          logo: energyProviderLogo
        },
        {
          text: 'Endlich eine All-in-One Lösung, die hält was sie verspricht. Wir sind begeistert!',
          author: 'Dr. Schmidt & Kollegen',
          company: 'Medizinisches Zentrum',
          logo: medicalCenterLogo
        }
      ]
    }
  }
})
</script>

<style scoped>
.testimonial-section {
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

.testimonials-swiper {
  padding: 20px 0 60px;
}

.testimonial-card {
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

.testimonial-card::before {
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

.testimonial-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 30px 60px rgba(72, 52, 212, 0.15);
  border-color: rgba(72, 52, 212, 0.2);
}

.testimonial-card:hover::before {
  background: linear-gradient(135deg, rgba(72, 52, 212, 0.1) 0%, rgba(72, 52, 212, 0.02) 100%);
}

.testimonial-icon {
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

.testimonial-card:hover .testimonial-icon {
  transform: scale(1.1) rotate(-5deg);
  box-shadow: 0 15px 30px rgba(72, 52, 212, 0.3);
}

.testimonial-icon i {
  font-size: 32px;
  color: white;
  transition: all 0.5s ease;
}

.testimonial-card:hover .testimonial-icon i {
  transform: scale(1.1);
}

.testimonial-content {
  flex-grow: 1;
  position: relative;
  z-index: 1;
}

.testimonial-text {
  color: var(--color-secondary);
  font-size: 1.1rem;
  line-height: 1.7;
  font-style: italic;
  margin-bottom: 30px;
}

.testimonial-author {
  margin-top: auto;
  position: relative;
  z-index: 1;
}

.testimonial-author h4 {
  color: var(--color-primary);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 5px;
}

.testimonial-author p {
  color: var(--color-secondary);
  font-size: 0.9rem;
  margin: 0;
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
  .testimonial-section {
    padding: 60px 0;
  }

  .section-title h2 {
    font-size: 2rem;
  }

  .testimonial-card {
    min-height: 350px;
    padding: 25px;
  }

  .testimonial-icon {
    width: 65px;
    height: 65px;
  }

  .testimonial-icon i {
    font-size: 28px;
  }

  .testimonial-text {
    font-size: 1rem;
  }

  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    display: none;
  }
}

.company-logo {
  width: 120px;
  height: 60px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.company-logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.testimonial-card:hover .company-logo {
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}
</style> 