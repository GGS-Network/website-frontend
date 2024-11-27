<template>
  <Transition name="announcement-fade">
    <div v-if="show" class="announcement-banner">
      <div class="announcement-content">
        <div class="announcement-message">
          <i class="bi bi-info-circle"></i>
          <span>
            VelocityDesk wird voraussichtlich am 01.12.2025 um 18:00 Uhr (EU West / CET) veröffentlicht.
            <br>
            <span class="announcement-subtitle">
              Wir freuen uns darauf, Ihnen unsere innovativen IT-Infrastruktur-Lösungen präsentieren zu können.
            </span>
          </span>
        </div>
        <div class="announcement-actions">
          <button class="learn-more" @click="goToStatus">
            Mehr erfahren
            <i class="bi bi-arrow-right"></i>
          </button>
          <button class="close-button" @click="closeAnnouncement">
            <i class="bi bi-x"></i>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'AnnouncementBanner',
  data() {
    return {
      show: true
    }
  },
  methods: {
    closeAnnouncement() {
      this.show = false
      localStorage.setItem('announcement-closed', 'true')
    },
    goToStatus() {
      this.$router.push('/status')
    }
  },
  mounted() {
    const isClosed = localStorage.getItem('announcement-closed')
    if (isClosed) {
      this.show = false
    }
  }
}
</script>

<style scoped>
.announcement-banner {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  max-width: 450px;
  width: calc(100% - 60px);
}

.announcement-content {
  background: rgba(72, 52, 212, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  color: var(--color-white);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.announcement-message {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  line-height: 1.5;
}

.announcement-message i {
  font-size: 20px;
  color: var(--color-tertiary);
  margin-top: 2px;
}

.announcement-subtitle {
  font-size: 0.9em;
  opacity: 0.8;
}

.announcement-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
}

.learn-more {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--color-white);
  padding: 8px 16px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.learn-more:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.close-button {
  background: transparent;
  border: none;
  color: var(--color-light);
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-white);
  transform: rotate(90deg);
}

.announcement-fade-enter-active,
.announcement-fade-leave-active {
  transition: all 0.3s ease;
}

.announcement-fade-enter-from,
.announcement-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 768px) {
  .announcement-banner {
    bottom: 20px;
    right: 20px;
    width: calc(100% - 40px);
  }

  .announcement-content {
    padding: 15px;
  }

  .announcement-actions {
    flex-direction: column;
    gap: 10px;
    align-items: stretch;
  }

  .learn-more {
    justify-content: center;
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style> 