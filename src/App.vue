<template>
  <div id="app">
    <SecurityCheck />
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
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

const Header = defineAsyncComponent(() => import('@/components/Header.vue'))
const Footer = defineAsyncComponent(() => import('@/components/Footer.vue'))
const SecurityCheck = defineAsyncComponent(() => import('@/components/security/SecurityCheck.vue'))

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    SecurityCheck
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