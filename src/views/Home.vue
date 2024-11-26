<template>
  <main>
    <HeroSection @show-contact="showContact" @show-demo="showDemo" />
    <ServiceSection @show-service="showServiceInfo" />
    <BenefitSection />
    
    <!-- Modals -->
    <ContactModal ref="contactModal" />
    <DemoModal ref="demoModal" />
    <ServiceModal ref="serviceModal" />
  </main>
</template>

<script>
import HeroSection from '@/components/home/HeroSection.vue'
import ServiceSection from '@/components/home/ServiceSection.vue'
import BenefitSection from '@/components/home/BenefitSection.vue'
import ContactModal from '@/components/home/modals/ContactModal.vue'
import DemoModal from '@/components/home/modals/DemoModal.vue'
import ServiceModal from '@/components/home/modals/ServiceModal.vue'

export default {
  name: 'Home',
  components: {
    HeroSection,
    ServiceSection,
    BenefitSection,
    ContactModal,
    DemoModal,
    ServiceModal
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