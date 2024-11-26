<template>
  <div class="modal fade custom-modal" id="serviceModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-header-content">
            <div class="modal-icon">
              <i :class="currentService.icon"></i>
            </div>
            <h5 class="modal-title">{{ currentService.title }}</h5>
            <p class="modal-subtitle">{{ currentService.subtitle }}</p>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="service-details">
            <div class="service-description">
              <p>{{ currentService.description }}</p>
            </div>

            <div class="service-features">
              <h6>Funktionen & Vorteile:</h6>
              <ul>
                <li v-for="(feature, index) in currentService.features" :key="index">
                  <i class="bi bi-check2-circle"></i>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <div class="service-specs" v-if="currentService.specs">
              <h6>Technische Details:</h6>
              <div class="specs-grid">
                <div v-for="(spec, index) in currentService.specs" :key="index" class="spec-item">
                  <i :class="spec.icon"></i>
                  <span>{{ spec.label }}</span>
                  <strong>{{ spec.value }}</strong>
                </div>
              </div>
            </div>

            <div class="text-center mt-4">
              <button class="btn btn-primary" @click="$emit('show-contact')">
                <i class="bi bi-envelope me-2"></i>
                Beratungsgespräch vereinbaren
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
  name: 'ServiceModal',
  emits: ['show-contact'],
  data() {
    return {
      modal: null,
      currentServiceType: '',
      services: {
        dbaas: {
          icon: 'bi bi-database',
          title: 'Database as a Service (DBaaS)',
          subtitle: 'Skalierbare Datenbanklösungen',
          description: 'Unsere DBaaS-Lösung bietet eine vollständig verwaltete Datenbankplattform, die sich automatisch an Ihre Anforderungen anpasst.',
          features: [
            'Automatische Skalierung der Ressourcen',
            'Integrierte Backup- und Recovery-Lösungen',
            'Hochverfügbarkeit durch Multi-AZ Deployment',
            'Performance-Monitoring und Optimierung',
            'DSGVO-konforme Datenspeicherung'
          ],
          specs: [
            { icon: 'bi bi-speedometer', label: 'Performance', value: 'Bis zu 1M IOPS' },
            { icon: 'bi bi-hdd', label: 'Storage', value: 'Bis zu 256 TB' },
            { icon: 'bi bi-shield-check', label: 'Backup', value: 'Real-time Replikation' },
            { icon: 'bi bi-clock', label: 'Recovery', value: 'RTO < 15 Min' }
          ]
        },
        daas: {
          icon: 'bi bi-display',
          title: 'Desktop as a Service (DaaS)',
          subtitle: 'Flexible Remote-Arbeitsplätze',
          description: 'Greifen Sie von überall sicher auf Ihren Arbeitsplatz zu. Unsere DaaS-Lösung macht mobiles Arbeiten einfach und sicher.',
          features: [
            'Zugriff von jedem Gerät',
            'Windows und Linux Desktops',
            'Integrierte Sicherheitsfunktionen',
            'Automatische Updates',
            'Zentrale Verwaltung'
          ],
          specs: [
            { icon: 'bi bi-cpu', label: 'CPU', value: 'Bis zu 64 vCPUs' },
            { icon: 'bi bi-memory', label: 'RAM', value: 'Bis zu 512 GB' },
            { icon: 'bi bi-gpu-card', label: 'GPU', value: 'NVIDIA A100' },
            { icon: 'bi bi-hdd', label: 'Storage', value: 'NVMe SSD' }
          ]
        },
        iaas: {
          icon: 'bi bi-cloud',
          title: 'Windows Company Infrastructure (IaaS)',
          subtitle: 'Cloud-basierte Unternehmens-IT',
          description: 'Modernisieren Sie Ihre gesamte IT-Infrastruktur mit unserer skalierbaren Cloud-Lösung.',
          features: [
            'Flexible Ressourcenzuweisung',
            'Pay-as-you-go Modell',
            'Hochverfügbarkeitsoptionen',
            'Disaster Recovery',
            'Managed Services'
          ],
          specs: [
            { icon: 'bi bi-diagram-2', label: 'Verfügbarkeit', value: '99.999%' },
            { icon: 'bi bi-clock-history', label: 'Backup', value: 'Kontinuierlich' },
            { icon: 'bi bi-shield-lock', label: 'Firewall', value: 'Next-Gen Security' },
            { icon: 'bi bi-diagram-3', label: 'Skalierung', value: 'Auto-Scaling' }
          ]
        },
        naas: {
          icon: 'bi bi-diagram-3',
          title: 'Network as a Service (NaaS)',
          subtitle: 'Intelligente Netzwerklösungen',
          description: 'Unser NaaS bietet sichere und leistungsstarke Netzwerkverbindungen für Ihr Unternehmen.',
          features: [
            'Software-defined Networking',
            'Automatisches Load-Balancing',
            'DDoS-Schutz',
            'VPN-Services',
            'Traffic-Optimierung'
          ],
          specs: [
            { icon: 'bi bi-speedometer2', label: 'Bandbreite', value: 'Bis zu 400 Gbit/s' },
            { icon: 'bi bi-shield-check', label: 'DDoS-Schutz', value: 'Bis zu 20 Tbps' },
            { icon: 'bi bi-clock', label: 'Latenz', value: '< 5ms' },
            { icon: 'bi bi-globe', label: 'Redundanz', value: 'Multi-Region' }
          ]
        },
        baas: {
          icon: 'bi bi-hdd-network',
          title: 'Storage Backend as a Service (BaaS)',
          subtitle: 'Sichere Speicherlösungen',
          description: 'Speichern Sie Ihre Daten sicher und skalierbar in unserer Cloud-Storage-Lösung.',
          features: [
            'Automatische Verschlüsselung',
            'Versionierung',
            'Geo-Redundanz',
            'S3-kompatible API',
            'Lifecycle Management'
          ],
          specs: [
            { icon: 'bi bi-hdd-stack', label: 'Kapazität', value: 'Exabyte-Skalierung' },
            { icon: 'bi bi-arrow-repeat', label: 'Redundanz', value: '6-fach Global' },
            { icon: 'bi bi-lightning', label: 'Durchsatz', value: '100 GB/s' },
            { icon: 'bi bi-shield-lock', label: 'Verschlüsselung', value: 'AES-256-GCM' }
          ]
        },
        saas: {
          icon: 'bi bi-server',
          title: 'Server as a Service (SaaS)',
          subtitle: 'Enterprise Server-Infrastruktur',
          description: 'Hochleistungs-Serverinfrastruktur für anspruchsvolle Unternehmensanwendungen mit maximaler Verfügbarkeit und Skalierbarkeit.',
          features: [
            'Dedizierte Hardware-Ressourcen',
            'Bare Metal Server Option',
            'Kubernetes-Ready',
            'Multi-Datacenter Deployment',
            'Enterprise Support 24/7/365'
          ],
          specs: [
            { icon: 'bi bi-cpu-fill', label: 'Prozessor', value: 'Bis zu 128 Cores' },
            { icon: 'bi bi-memory', label: 'RAM', value: 'Bis zu 2 TB ECC' },
            { icon: 'bi bi-hdd-network-fill', label: 'Storage', value: 'All-Flash Arrays' },
            { icon: 'bi bi-speedometer2', label: 'Netzwerk', value: '400 Gbit/s' },
            { icon: 'bi bi-shield-check', label: 'Verfügbarkeit', value: '99.99999%' }
          ]
        }
      }
    }
  },
  computed: {
    currentService() {
      return this.services[this.currentServiceType] || this.services.dbaas
    }
  },
  mounted() {
    this.modal = new Modal(document.getElementById('serviceModal'))
  },
  methods: {
    show(serviceType) {
      this.currentServiceType = serviceType
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

.modal-body {
  padding: 30px;
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

.service-description {
  margin-bottom: 25px;
  color: var(--color-secondary);
  line-height: 1.6;
}

.service-features {
  margin-bottom: 30px;
}

.service-features h6 {
  color: var(--color-primary);
  font-weight: 600;
  margin-bottom: 15px;
}

.service-features ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.service-features li {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  color: var(--color-secondary);
}

.service-features li i {
  color: var(--color-primary);
  margin-right: 10px;
  font-size: 1.2rem;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

.spec-item {
  background: rgba(72, 52, 212, 0.05);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  transition: all 0.3s ease;
}

.spec-item:hover {
  background: rgba(72, 52, 212, 0.1);
  transform: translateY(-2px);
}

.spec-item i {
  font-size: 24px;
  color: var(--color-primary);
  margin-bottom: 8px;
  display: block;
}

.spec-item span {
  display: block;
  color: var(--color-secondary);
  font-size: 0.9rem;
  margin-bottom: 4px;
}

.spec-item strong {
  display: block;
  color: var(--color-primary);
  font-size: 1.1rem;
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
  .specs-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .service-features li {
    font-size: 0.95rem;
  }
  
  .modal-header {
    padding: 20px;
  }
  
  .modal-body {
    padding: 20px;
  }
  
  .btn-primary {
    width: 100%;
  }
}
</style> 