<template>
  <main>
    <HeroSection @show-contact="showContact" @show-demo="showDemo" />
    <ServiceSection @show-service="showServiceInfo" />
    <BenefitSection />
    <!-- <TestimonialSection /> -->
    
    <!-- Modals -->
    <ContactModal ref="contactModal" />
    <DemoModal ref="demoModal" />
    <ServiceModal ref="serviceModal" />
    <AnnouncementBanner />
  </main>
</template>

<script>
import { onMounted } from 'vue'
import HeroSection from '@/components/home/HeroSection.vue'
import ServiceSection from '@/components/home/ServiceSection.vue'
import BenefitSection from '@/components/home/BenefitSection.vue'
// import TestimonialSection from '@/components/home/TestimonialSection.vue'
import ContactModal from '@/components/home/modals/ContactModal.vue'
import DemoModal from '@/components/home/modals/DemoModal.vue'
import ServiceModal from '@/components/home/modals/ServiceModal.vue'
import AnnouncementBanner from '@/components/home/AnnouncementBanner.vue'

export default {
  name: 'Home',
  components: {
    HeroSection,
    ServiceSection,
    BenefitSection,
    // TestimonialSection,
    ContactModal,
    DemoModal,
    ServiceModal,
    AnnouncementBanner
  },
  setup() {
    onMounted(() => {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 100)
    })
  },
  methods: {
    showContact() {
      this.$refs.contactModal.show()
    },
    showDemo() {
      this.$refs.demoModal.show()
    },
    showServiceInfo(service) {
      this.$refs.serviceModal.show(service)
    }
  }
}
</script>

<style scoped>
main {
  overflow-x: hidden;
  position: relative;
}

section {
  position: relative;
  z-index: 1;
}

section:nth-child(even) {
  background-color: var(--color-light);
}

section:nth-child(odd) {
  background-color: var(--color-white);
}

html {
  scroll-behavior: smooth;
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media (max-width: 768px) {
  .container {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style> 