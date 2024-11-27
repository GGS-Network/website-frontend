import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/main.css'
import '@fortawesome/fontawesome-free/css/all.css'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import { registerSW } from 'virtual:pwa-register'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Erstelle die App-Instanz
const app = createApp(App)

// PWA Service Worker Registration
registerSW({ 
  immediate: true,
  onNeedRefresh() {},
  onOfflineReady() {}
})

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

// Globaler Error Handler
app.config.errorHandler = (err, vm, info) => {
  console.error('Global error:', err)
  console.error('Component:', vm)
  console.error('Info:', info)
}

app.use(router)
app.use(Toast, toastOptions)
app.mount('#app') 