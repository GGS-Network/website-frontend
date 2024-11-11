<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <div class="sidebar" :class="{ 'collapsed': isSidebarCollapsed }">
      <div class="sidebar-header">
        <div class="logo">
          <svg class="logo-svg" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
            <g class="logo-icon">
              <path d="M40 35c0-6.627-5.373-12-12-12-1.4 0-2.743.24-4 .683C22.805 18.966 18.177 15.5 12.75 15.5 5.707 15.5 0 21.207 0 28.25c0 .55.035 1.092.103 1.623C.035 30.408 0 30.95 0 31.5 0 37.299 4.701 42 10.5 42h27c4.142 0 7.5-3.358 7.5-7.5z" 
                    fill="currentColor"/>
            </g>
          </svg>
          <span v-show="!isSidebarCollapsed">VelocityDesk</span>
        </div>
        <button type="button" class="collapse-btn" @click="toggleSidebar">
          <i class="bi" :class="isSidebarCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'"></i>
        </button>
      </div>

      <div class="sidebar-content">
        <nav class="sidebar-nav">
          <router-link to="/dashboard" class="nav-item" active-class="active">
            <i class="bi bi-speedometer2"></i>
            <span v-show="!isSidebarCollapsed">Dashboard</span>
          </router-link>

          <router-link to="/profile" class="nav-item" active-class="active">
            <i class="bi bi-person"></i>
            <span v-show="!isSidebarCollapsed">Mein Profil</span>
          </router-link>

          <router-link to="/status" class="nav-item" active-class="active">
            <i class="bi bi-activity"></i>
            <span v-show="!isSidebarCollapsed">System Status</span>
            <span v-if="!isSidebarCollapsed && hasPermission('EDIT_STATUS')" 
                  class="nav-badge admin">Admin</span>
          </router-link>

          <template v-if="hasPermission('VIEW_TICKETS')">
            <div v-show="!isSidebarCollapsed" class="nav-section">Support</div>
            <router-link to="/tickets" class="nav-item" active-class="active">
              <i class="bi bi-ticket-detailed"></i>
              <span v-show="!isSidebarCollapsed">Tickets</span>
              <span v-if="!isSidebarCollapsed && hasPermission('EDIT_TICKETS')" 
                    class="nav-badge mod">Mod</span>
            </router-link>
          </template>

          <template v-if="hasPermission('VIEW_USERS')">
            <div v-show="!isSidebarCollapsed" class="nav-section">Administration</div>
            <router-link to="/users" class="nav-item" active-class="active">
              <i class="bi bi-people"></i>
              <span v-show="!isSidebarCollapsed">Benutzer</span>
            </router-link>
          </template>

          <template v-if="hasPermission('EDIT_SYSTEM_SETTINGS')">
            <router-link to="/settings" class="nav-item" active-class="active">
              <i class="bi bi-gear"></i>
              <span v-show="!isSidebarCollapsed">Systemeinstellungen</span>
              <span v-show="!isSidebarCollapsed" class="nav-badge superadmin">Superadmin</span>
            </router-link>
          </template>
        </nav>
      </div>

      <div class="sidebar-footer">
        <div v-show="!isSidebarCollapsed" class="user-info">
          <div class="user-avatar">
            <i class="bi bi-person-circle"></i>
          </div>
          <div class="user-details">
            <span class="user-name">{{ userName }}</span>
            <span class="user-role">{{ userRole }}</span>
          </div>
        </div>
        <button @click="handleLogout" class="logout-btn" :title="isSidebarCollapsed ? 'Abmelden' : ''">
          <i class="bi bi-box-arrow-right"></i>
          <span v-show="!isSidebarCollapsed">Abmelden</span>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content" :class="{ 'expanded': isSidebarCollapsed }">
      <div class="content-wrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { auth } from '@/services/api';
import { authStore } from '@/store/auth';
import { hasPermission } from '@/utils/permissions';

export default {
  name: 'DashboardLayout',
  setup() {
    const isSidebarCollapsed = ref(false);
    const userName = computed(() => authStore.user?.name || 'Benutzer');
    const userRole = computed(() => {
      const level = authStore.user?.accessLevel || 0;
      return ['Benutzer', 'Support', 'Moderator', 'Admin', 'Superadmin'][level];
    });

    const toggleSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value;
      // Event für andere Komponenten
      window.dispatchEvent(new CustomEvent('sidebar-toggle', {
        detail: { collapsed: isSidebarCollapsed.value }
      }));
    };

    const handleLogout = async () => {
      try {
        await auth.logout();
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

    return {
      isSidebarCollapsed,
      toggleSidebar,
      handleLogout,
      userName,
      userRole,
      hasPermission: (permission) => hasPermission(authStore.user?.accessLevel || 0, permission)
    };
  }
};
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: var(--color-light);
}

.sidebar {
  width: 280px;
  background: var(--gradient-primary);
  color: var(--color-white);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1000;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  height: 80px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--color-white);
  font-weight: 600;
  font-size: 20px;
  white-space: nowrap;
}

.logo-svg {
  height: 35px;
  width: auto;
  min-width: 35px;
}

.collapse-btn {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: var(--color-white);
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  padding: 0;
  margin-left: auto;
}

.collapse-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(2px);
}

.collapse-btn i {
  font-size: 18px;
  line-height: 1;
}

.sidebar-content {
  flex: 1;
  padding: 20px 0;
  overflow-y: auto;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-section {
  padding: 10px 20px;
  font-size: 12px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 20px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: var(--color-white);
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 0;
  position: relative;
  white-space: nowrap;
}

.nav-item i {
  font-size: 20px;
  min-width: 24px;
  text-align: center;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.2);
  font-weight: 500;
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--color-white);
  border-radius: 0 4px 4px 0;
}

.nav-badge {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: auto;
}

.nav-badge.admin {
  background: rgba(72, 52, 212, 0.2);
  color: #4834d4;
}

.nav-badge.mod {
  background: rgba(46, 204, 113, 0.2);
  color: #2ecc71;
}

.nav-badge.superadmin {
  background: rgba(255, 59, 48, 0.2);
  color: #ff3b30;
}

.sidebar-footer {
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-avatar i {
  font-size: 24px;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-name {
  font-weight: 500;
  font-size: 14px;
}

.user-role {
  font-size: 12px;
  opacity: 0.7;
}

.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 59, 48, 0.1);
  border: none;
  border-radius: 12px;
  color: var(--color-white);
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.logout-btn:hover {
  background: rgba(255, 59, 48, 0.2);
  transform: translateY(-2px);
}

.logout-btn i {
  font-size: 20px;
  min-width: 24px;
}

.main-content {
  flex: 1;
  margin-left: 280px;
  transition: all 0.3s ease;
  min-height: 100vh;
  background: var(--color-light);
  position: relative;
  z-index: 1;
  padding-bottom: 60px;
}

.main-content.expanded {
  margin-left: 80px;
}

.content-wrapper {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 60px);
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    height: 100vh;
  }

  .sidebar.show {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0;
    padding-bottom: 80px;
  }

  .main-content.expanded {
    margin-left: 0;
  }

  .content-wrapper {
    min-height: calc(100vh - 80px);
  }
}
</style> 