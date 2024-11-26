<template>
  <div class="modal fade custom-modal" id="demoModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-header-content">
            <div class="modal-icon">
              <i class="bi bi-play-circle"></i>
            </div>
            <h5 class="modal-title">VelocityDesk Demo</h5>
            <p class="modal-subtitle">Entdecken Sie unsere Plattform in Aktion</p>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-0">
          <div class="video-container">
            <div class="ratio ratio-16x9">
              <iframe 
                :src="videoUrl" 
                title="VelocityDesk Demo" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div class="video-info p-4">
            <h6>Highlights der Demo:</h6>
            <ul class="feature-list">
              <li><i class="bi bi-check2-circle"></i> Zentrale Verwaltung aller IT-Ressourcen</li>
              <li><i class="bi bi-check2-circle"></i> Automatisierte Bereitstellung von Services</li>
              <li><i class="bi bi-check2-circle"></i> Echtzeit-Monitoring und Reporting</li>
              <li><i class="bi bi-check2-circle"></i> Skalierbare Infrastruktur nach Bedarf</li>
            </ul>
            <div class="text-center mt-4">
              <button class="btn btn-primary" @click="$emit('show-contact')">
                <i class="bi bi-envelope me-2"></i>
                Persönliche Demo anfragen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'

export default {
  name: 'DemoModal',
  emits: ['show-contact'],
  data() {
    return {
      modal: null,
      videoUrl: 'about:blank' // Hier Ihre Demo-Video URL einfügen
    }
  },
  mounted() {
    this.modal = new Modal(document.getElementById('demoModal'))
  },
  methods: {
    show() {
      this.modal.show()
    },
    hide() {
      this.modal.hide()
    }
  }
}
</script>

<style scoped>
.custom-modal .modal-content {
  border: none;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.modal-header {
  background: var(--gradient-primary);
  border-bottom: none;
  padding: 25px;
  position: relative;
}

.modal-header-content {
  text-align: center;
  width: 100%;
  color: var(--color-white);
}

.modal-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
}

.modal-icon i {
  font-size: 24px;
  color: var(--color-white);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 5px;
}

.modal-subtitle {
  font-size: 0.9rem;
  opacity: 0.9;
  margin: 0;
}

.btn-close {
  position: absolute;
  right: 20px;
  top: 20px;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2) !important;
  border-radius: 50%;
  padding: 8px;
  opacity: 1 !important;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-close:hover {
  background: rgba(255, 255, 255, 0.3) !important;
  transform: rotate(90deg);
}

.video-container {
  background: #000;
}

.video-info {
  background: var(--color-white);
}

.video-info h6 {
  color: var(--color-primary);
  font-weight: 600;
  margin-bottom: 15px;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: var(--color-secondary);
}

.feature-list li i {
  color: var(--color-primary);
  margin-right: 10px;
  font-size: 1.2rem;
}

.btn-primary {
  background: var(--gradient-primary);
  border: none;
  padding: 12px 30px;
  border-radius: 50px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(72, 52, 212, 0.2);
}

/* Überschreiben des Standard Bootstrap Close-Button Bilds */
.btn-close {
  background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e") center/1em auto no-repeat !important;
}

@media (max-width: 768px) {
  .modal-header {
    padding: 20px;
  }
  
  .video-info {
    padding: 20px !important;
  }
  
  .btn-primary {
    width: 100%;
  }
}
</style> 