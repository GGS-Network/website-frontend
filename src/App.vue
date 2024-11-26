<template>
  <div id="app">
    <Header />
    <router-view v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />
        <template #fallback>
          <div class="loading">Laden...</div>
        </template>
      </Suspense>
    </router-view>
    <Footer />
    <CookieConsent ref="cookieConsent" @preferences-updated="handleCookiePreferences" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

const Header = defineAsyncComponent(() => import('@/components/Header.vue'))
const Footer = defineAsyncComponent(() => import('@/components/Footer.vue'))
const CookieConsent = defineAsyncComponent(() => import('@/components/CookieConsent.vue'))

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    CookieConsent
  },
  methods: {
    handleCookiePreferences(preferences) {
      console.log('Cookie preferences updated:', preferences)
    },
    openCookieSettings() {
      this.$refs.cookieConsent.openSettings()
    }
  },
  provide() {
    return {
      openCookieSettings: this.openCookieSettings
    }
  }
}
</script>

<style>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: var(--color-white);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
}
</style> 