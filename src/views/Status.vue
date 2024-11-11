<template>
  <div class="status-page">
    <div class="status-container">
      <div v-if="announcements.length > 0" class="announcements">
        <div v-for="announcement in announcements" 
             :key="announcement.id" 
             class="announcement"
             :class="announcement.type">
          <div class="announcement-icon">
            <i class="bi" :class="getAnnouncementIcon(announcement.type)"></i>
          </div>
          <div class="announcement-content">
            <div class="announcement-message">{{ announcement.message }}</div>
            <div v-if="announcement.startDate || announcement.endDate" class="announcement-time">
              {{ formatAnnouncementTime(announcement) }}
            </div>
          </div>
        </div>
      </div>

      <div class="status-header">
        <h1>System Status</h1>
        <div class="overall-status" :class="overallStatusClass">
          <span class="status-indicator"></span>
          {{ overallStatusText }}
        </div>
        <div class="last-updated">
          Zuletzt aktualisiert: {{ formattedLastUpdate }}
        </div>
      </div>

      <div class="services-grid">
        <div v-for="service in services" 
             :key="service.id" 
             class="service-card"
             :class="getStatusClass(service.status)">
          <h3>{{ service.service }}</h3>
          <div class="service-status">
            <span class="status-indicator"></span>
            {{ getStatusText(service.status) }}
          </div>
          <div class="service-metrics">
            <div class="metric">
              <span class="label">Uptime</span>
              <span class="value">{{ service.uptime.toFixed(2) }}%</span>
            </div>
            <div class="metric">
              <span class="label">Reaktionszeit</span>
              <span class="value">{{ service.responseTime }}ms</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div class="refresh-button">
        <button @click="fetchStatus" :disabled="loading">
          <i class="bi bi-arrow-clockwise"></i>
          Aktualisieren
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';
import { ref, onMounted, computed } from 'vue';

export default {
  name: 'Status',
  setup() {
    const services = ref([]);
    const overallStatus = ref('operational');
    const lastUpdated = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const announcements = ref([]);

    const fetchStatus = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await api.get('/status');
        services.value = response.data.services;
        announcements.value = response.data.announcements;
        overallStatus.value = response.data.overall.status;
        lastUpdated.value = new Date(response.data.overall.lastUpdated);
      } catch (err) {
        error.value = 'Fehler beim Laden der Statusdaten';
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchStatus();
      const interval = setInterval(fetchStatus, 60000);

      const header = document.querySelector('#header');
      if (header) {
        header.classList.remove('header-scrolled');
      }

      return () => clearInterval(interval);
    });

    const getStatusClass = (status) => ({
      'status-operational': status === 'operational',
      'status-degraded': status === 'degraded',
      'status-outage': status === 'outage'
    });

    const getStatusText = (status) => {
      const texts = {
        operational: 'Betriebsbereit',
        degraded: 'Eingeschränkt',
        outage: 'Störung'
      };
      return texts[status] || status;
    };

    const getAnnouncementIcon = (type) => {
      const icons = {
        maintenance: 'bi-wrench',
        alert: 'bi-exclamation-triangle',
        info: 'bi-info-circle'
      };
      return icons[type] || 'bi-info-circle';
    };

    const formatAnnouncementTime = (announcement) => {
      const options = { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
      };
      
      if (announcement.startDate && announcement.endDate) {
        return `Von ${new Date(announcement.startDate).toLocaleString('de-DE', options)} bis ${new Date(announcement.endDate).toLocaleString('de-DE', options)}`;
      } else if (announcement.startDate) {
        return `Ab ${new Date(announcement.startDate).toLocaleString('de-DE', options)}`;
      } else if (announcement.endDate) {
        return `Bis ${new Date(announcement.endDate).toLocaleString('de-DE', options)}`;
      }
      return '';
    };

    return {
      services,
      overallStatus,
      loading,
      error,
      fetchStatus,
      getStatusClass,
      getStatusText,
      overallStatusClass: computed(() => getStatusClass(overallStatus.value)),
      overallStatusText: computed(() => getStatusText(overallStatus.value)),
      formattedLastUpdate: computed(() => {
        if (!lastUpdated.value) return '';
        return new Intl.DateTimeFormat('de-DE', {
          dateStyle: 'short',
          timeStyle: 'medium'
        }).format(lastUpdated.value);
      }),
      announcements,
      getAnnouncementIcon,
      formatAnnouncementTime
    };
  }
};
</script>

<style scoped>
.status-page {
  min-height: 100vh;
  background: var(--gradient-primary);
  padding-top: var(--header-height);
  position: relative;
  z-index: 1;
}

.status-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  position: relative;
  z-index: 2;
}

.status-header {
  text-align: center;
  margin-bottom: 40px;
  color: var(--color-white);
}

.status-header h1 {
  color: var(--color-white);
  margin-bottom: 20px;
  font-size: 2.5rem;
}

.overall-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
  margin: 10px 0;
  background: var(--color-white);
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.status-operational {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #2fb344;
  color: #2fb344;
}

.status-operational .status-indicator {
  background: #2fb344;
  box-shadow: 0 0 10px rgba(47, 179, 68, 0.5);
}

.status-degraded {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #ff9500;
  color: #ff9500;
}

.status-degraded .status-indicator {
  background: #ff9500;
  box-shadow: 0 0 10px rgba(255, 149, 0, 0.5);
}

.status-outage {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #ff3b30;
  color: #ff3b30;
}

.status-outage .status-indicator {
  background: #ff3b30;
  box-shadow: 0 0 10px rgba(255, 59, 48, 0.5);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.service-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--color-white);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.service-card h3 {
  color: var(--color-white);
  margin-bottom: 15px;
}

.service-status {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 0;
  font-weight: 500;
}

.service-metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metric .label {
  font-size: 12px;
  color: var(--color-white);
  opacity: 0.7;
}

.metric .value {
  font-weight: 500;
  color: var(--color-white);
}

.refresh-button {
  text-align: center;
  margin-top: 20px;
}

.refresh-button button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-white);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.refresh-button button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.refresh-button button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.error-message {
  text-align: center;
  color: #ff3b30;
  margin: 20px 0;
  padding: 15px;
  background: rgba(255, 59, 48, 0.1);
  border: 1px solid rgba(255, 59, 48, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(5px);
}

.last-updated {
  font-size: 14px;
  color: var(--color-white);
  opacity: 0.7;
  margin-top: 5px;
}

.announcements {
  margin-bottom: 30px;
}

.announcement {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--color-white);
}

.announcement.maintenance {
  border-left: 4px solid #ff9500;
}

.announcement.alert {
  border-left: 4px solid #ff3b30;
}

.announcement.info {
  border-left: 4px solid #007aff;
}

.announcement-icon {
  font-size: 24px;
  min-width: 24px;
}

.announcement-content {
  flex: 1;
}

.announcement-message {
  font-weight: 500;
  margin-bottom: 5px;
}

.announcement-time {
  font-size: 14px;
  opacity: 0.8;
}

.maintenance .announcement-icon {
  color: #ff9500;
}

.alert .announcement-icon {
  color: #ff3b30;
}

.info .announcement-icon {
  color: #007aff;
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .status-header h1 {
    font-size: 2rem;
  }
}
</style>