<template>
  <DashboardLayout>
    <div class="dashboard-content">
      <!-- Übersichtskarten -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="bi bi-hdd-rack"></i>
          </div>
          <div class="stat-info">
            <h3>System Status</h3>
            <div class="stat-value" :class="systemStatusClass">
              {{ systemStatus }}
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="bi bi-clock-history"></i>
          </div>
          <div class="stat-info">
            <h3>Uptime</h3>
            <div class="stat-value">99.9%</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="bi bi-ticket-detailed"></i>
          </div>
          <div class="stat-info">
            <h3>Offene Tickets</h3>
            <div class="stat-value">{{ openTickets }}</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="bi bi-people"></i>
          </div>
          <div class="stat-info">
            <h3>Aktive Benutzer</h3>
            <div class="stat-value">{{ activeUsers }}</div>
          </div>
        </div>
      </div>

      <!-- Aktuelle Ankündigungen -->
      <div class="dashboard-section">
        <div class="section-header">
          <h2>Aktuelle Ankündigungen</h2>
          <button v-if="hasPermission('EDIT_ANNOUNCEMENTS')" class="btn-add">
            <i class="bi bi-plus-lg"></i>
            Neue Ankündigung
          </button>
        </div>
        <div class="announcements-list">
          <div v-for="announcement in announcements" 
               :key="announcement.id" 
               class="announcement-card"
               :class="announcement.type">
            <div class="announcement-header">
              <i class="bi" :class="getAnnouncementIcon(announcement.type)"></i>
              <span class="announcement-type">{{ getAnnouncementType(announcement.type) }}</span>
              <span class="announcement-date">{{ formatDate(announcement.createdAt) }}</span>
            </div>
            <div class="announcement-content">
              {{ announcement.message }}
            </div>
            <div v-if="announcement.startDate || announcement.endDate" class="announcement-time">
              <i class="bi bi-calendar-event"></i>
              {{ formatAnnouncementTime(announcement) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Systemstatus -->
      <div class="dashboard-section">
        <div class="section-header">
          <h2>Systemstatus</h2>
          <button class="btn-refresh" @click="refreshStatus" :disabled="loading">
            <i class="bi bi-arrow-clockwise"></i>
            Aktualisieren
          </button>
        </div>
        <div class="services-grid">
          <div v-for="service in services" 
               :key="service.id" 
               class="service-card"
               :class="getStatusClass(service.status)">
            <div class="service-header">
              <h3>{{ service.service }}</h3>
              <div class="service-status">
                <span class="status-indicator"></span>
                {{ getStatusText(service.status) }}
              </div>
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
      </div>

      <!-- Letzte Aktivitäten -->
      <div class="dashboard-section">
        <div class="section-header">
          <h2>Letzte Aktivitäten</h2>
          <button v-if="hasPermission('VIEW_LOGS')" class="btn-view-all">
            Alle anzeigen
          </button>
        </div>
        <div class="activity-list">
          <div v-for="activity in recentActivities" 
               :key="activity.id" 
               class="activity-item">
            <div class="activity-icon" :class="activity.type">
              <i class="bi" :class="getActivityIcon(activity.type)"></i>
            </div>
            <div class="activity-details">
              <div class="activity-message">{{ activity.message }}</div>
              <div class="activity-meta">
                <span class="activity-user">{{ activity.user }}</span>
                <span class="activity-time">{{ formatTimeAgo(activity.timestamp) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script>
import { ref, onMounted } from 'vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import { hasPermission } from '@/utils/permissions';
import api from '@/services/api';

export default {
  name: 'Dashboard',
  components: {
    DashboardLayout
  },
  setup() {
    const systemStatus = ref('Betriebsbereit');
    const openTickets = ref(0);
    const activeUsers = ref(0);
    const announcements = ref([]);
    const services = ref([]);
    const recentActivities = ref([]);
    const loading = ref(false);

    const loadDashboardData = async () => {
      loading.value = true;
      try {
        // Hier API-Aufrufe für die verschiedenen Daten
        const [statusRes, announcementsRes, activitiesRes] = await Promise.all([
          api.get('/status'),
          api.get('/announcements'),
          api.get('/activities')
        ]);

        services.value = statusRes.data.services;
        announcements.value = announcementsRes.data;
        recentActivities.value = activitiesRes.data;
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      loadDashboardData();
    });

    const refreshStatus = () => {
      loadDashboardData();
    };

    const getAnnouncementIcon = (type) => {
      const icons = {
        maintenance: 'bi-wrench',
        alert: 'bi-exclamation-triangle',
        info: 'bi-info-circle'
      };
      return icons[type] || 'bi-info-circle';
    };

    const getAnnouncementType = (type) => {
      const types = {
        maintenance: 'Wartung',
        alert: 'Warnung',
        info: 'Information'
      };
      return types[type] || type;
    };

    const getActivityIcon = (type) => {
      const icons = {
        login: 'bi-box-arrow-in-right',
        update: 'bi-pencil-square',
        create: 'bi-plus-circle',
        delete: 'bi-trash',
        system: 'bi-gear'
      };
      return icons[type] || 'bi-circle';
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    };

    const formatTimeAgo = (timestamp) => {
      const now = new Date();
      const date = new Date(timestamp);
      const seconds = Math.floor((now - date) / 1000);

      if (seconds < 60) return 'Gerade eben';
      if (seconds < 3600) return `Vor ${Math.floor(seconds / 60)} Minuten`;
      if (seconds < 86400) return `Vor ${Math.floor(seconds / 3600)} Stunden`;
      return formatDate(date);
    };

    return {
      systemStatus,
      systemStatusClass: 'status-operational',
      openTickets,
      activeUsers,
      announcements,
      services,
      recentActivities,
      loading,
      hasPermission,
      refreshStatus,
      getAnnouncementIcon,
      getAnnouncementType,
      getActivityIcon,
      formatDate,
      formatTimeAgo
    };
  }
};
</script>

<style scoped>
.dashboard-content {
  padding: 30px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: var(--dashboard-color-white);
  border-radius: 15px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: var(--dashboard-shadow-sm);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--dashboard-shadow-md);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: var(--dashboard-gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--dashboard-color-white);
  font-size: 24px;
}

.stat-info h3 {
  font-size: 14px;
  color: var(--dashboard-color-default);
  opacity: 0.7;
  margin: 0 0 5px;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: var(--dashboard-color-primary);
}

/* Dashboard Sections */
.dashboard-section {
  background: var(--dashboard-color-white);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: var(--dashboard-shadow-sm);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  font-size: 18px;
  color: var(--dashboard-color-primary);
  margin: 0;
}

/* Buttons */
.btn-add,
.btn-refresh,
.btn-view-all {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.btn-add {
  background: var(--dashboard-gradient-primary);
  color: var(--dashboard-color-white);
}

.btn-refresh {
  background: var(--dashboard-color-light);
  color: var(--dashboard-color-primary);
}

.btn-view-all {
  background: transparent;
  color: var(--dashboard-color-primary);
}

/* Announcements */
.announcements-list {
  display: grid;
  gap: 15px;
}

.announcement-card {
  background: var(--dashboard-color-light);
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid transparent;
}

.announcement-card.maintenance {
  border-left-color: var(--dashboard-color-warning);
}

.announcement-card.alert {
  border-left-color: var(--dashboard-color-danger);
}

.announcement-card.info {
  border-left-color: var(--dashboard-color-info);
}

.announcement-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.announcement-type {
  font-weight: 500;
  color: var(--dashboard-color-primary);
}

.announcement-date {
  margin-left: auto;
  font-size: 14px;
  opacity: 0.7;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.service-card {
  background: var(--dashboard-color-light);
  border-radius: 12px;
  padding: 20px;
}

/* Activities */
.activity-list {
  display: grid;
  gap: 15px;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 15px;
  background: var(--dashboard-color-light);
  border-radius: 12px;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--dashboard-color-white);
}

.activity-details {
  flex: 1;
}

.activity-message {
  margin-bottom: 5px;
  color: var(--dashboard-color-default);
}

.activity-meta {
  display: flex;
  gap: 15px;
  font-size: 14px;
  opacity: 0.7;
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard-content {
    padding: 20px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style> 