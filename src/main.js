import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/css/main.css'
import '@fortawesome/fontawesome-free/css/all.css'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { registerSW } from 'virtual:pwa-register'

// PWA Service Worker Registration
registerSW({ 
  immediate: true,
  onNeedRefresh() {},
  onOfflineReady() {}
})

// Pinia Store mit Persistenz
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

// Toast Konfiguration
const toastOptions = {
    position: "top-right",
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
}

// Globale Performance Optimierungen
app.config.performance = true

// Router mit Caching
router.beforeEach((to, from, next) => {
  // Prefetch der Komponenten für verlinkte Routen
  if (to.matched.length) {
    to.matched.forEach(record => {
      const component = record.components.default
      if (typeof component === 'function') {
        component()
      }
    })
  }
  next()
})

app.use(pinia)
app.use(router)
app.use(Toast, toastOptions)
app.mount('#app') 