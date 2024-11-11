<template>
  <section id="services" class="services">
    <div class="container">
      <div class="section-title">
        <h2>Unsere Services</h2>
        <p>Entdecken Sie unsere umfassenden Cloud-Lösungen</p>
      </div>

      <div class="row">
        <div v-for="service in services" :key="service.id" 
             class="col-lg-4">
          <div class="service-box" :class="service.boxClass">
            <div class="icon">
              <i :class="service.icon"></i>
            </div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
            <ul class="feature-list">
              <li v-for="(feature, index) in service.features" :key="index">
                <i class="bi bi-check2-circle"></i>
                {{ feature }}
              </li>
            </ul>
            <a :href="service.link" class="read-more">
              <span>Mehr erfahren</span>
              <i class="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="section-shape-bottom">
      <div class="shape-waves">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ServicesSection',
  data() {
    return {
      services: [
        {
          id: 1,
          icon: 'bi bi-hdd-network',
          title: 'VelocityDesk',
          boxClass: 'blue',
          description: 'Ihr virtueller Desktop in der Cloud - schnell, sicher und überall verfügbar',
          features: [
            'Windows & Linux Desktops',
            'Volle GPU Unterstützung',
            'Integrierte Backup-Lösung',
            'Pay-as-you-go Modell'
          ],
          link: '#velocitydesk'
        },
        {
          id: 2,
          icon: 'bi bi-shield-check',
          title: 'SecureAccess',
          boxClass: 'purple',
          description: 'Sicherer Zugriff auf Ihre Cloud-Ressourcen mit modernster Verschlüsselung',
          features: [
            'Zero-Trust Security',
            'Multi-Faktor Auth',
            'VPN Integration',
            'Access Control'
          ],
          link: '#secureaccess'
        },
        {
          id: 3,
          icon: 'bi bi-speedometer2',
          title: 'Performance+',
          boxClass: 'green',
          description: 'Optimierte Leistung für anspruchsvolle Workloads',
          features: [
            'Auto-Scaling',
            'Load Balancing',
            'Performance Monitoring',
            'Resource Optimization'
          ],
          link: '#performance'
        }
      ]
    }
  },
  mounted() {
    document.querySelectorAll('.service-box').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }
}
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
}

.col-lg-4 {
  display: flex;
}

.service-box {
  padding: 40px;
  border-radius: 20px;
  background: var(--color-white);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  height: 100%;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.service-box:hover {
  transform: translateY(-10px);
}

.service-box .icon {
  margin-bottom: 30px;
  width: 70px;
  height: 70px;
  background: var(--color-light);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.service-box:hover .icon {
  background: var(--color-primary);
}

.service-box .icon i {
  font-size: 32px;
  color: var(--color-primary);
  transition: all 0.3s ease;
}

.service-box:hover .icon i {
  color: var(--color-white);
}

.service-box h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--color-primary);
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 15px 0;
}

.feature-list li {
  padding: 8px 0;
  display: flex;
  align-items: center;
  font-size: 16px;
}

.feature-list li i {
  color: var(--color-secondary);
  margin-right: 12px;
  font-size: 18px;
}

.read-more {
  display: inline-flex;
  align-items: center;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
  margin-top: 15px;
}

.read-more i {
  margin-left: 8px;
  transition: all 0.3s ease;
}

.read-more:hover i {
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .service-box {
    padding: 30px;
  }
}

/* Color Variations */
.service-box.purple::before { background: linear-gradient(45deg, var(--color-primary), var(--color-secondary)); }
.service-box.blue::before { background: linear-gradient(45deg, #4834D4, #686DE0); }
.service-box.green::before { background: linear-gradient(45deg, #2ecc71, #27ae60); }

.services {
  padding: 100px 0 150px 0;
  position: relative;
  background: var(--color-white);
  margin-bottom: -50px;
}

.section-shape-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  overflow: hidden;
}

.shape-waves {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  transform-origin: bottom;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background: var(--color-light);
  border-radius: 1000% 1000% 0 0;
}

.wave:nth-child(1) {
  opacity: 0.5;
  animation: wave 8s linear infinite;
}

.wave:nth-child(2) {
  opacity: 0.3;
  animation: wave 10s linear infinite;
  animation-delay: -5s;
}

.wave:nth-child(3) {
  opacity: 0.2;
  animation: wave 12s linear infinite;
  animation-delay: -2s;
}

@keyframes wave {
  0% {
    transform: translateX(0) translateZ(0) scaleY(1);
  }
  50% {
    transform: translateX(-25%) translateZ(0) scaleY(0.8);
  }
  100% {
    transform: translateX(-50%) translateZ(0) scaleY(1);
  }
}
</style>