<template>
  <section id="services" class="services">
    <div class="container">
      <div class="section-title text-center mb-5">
        <h2>Was bietet Velocity Desk?</h2>
        <p>Velocity Desk bietet Ihnen ein leistungsstarkes IT-Ökosystem: Von Database as a Service (DBaaS) bis hin zu Network as a Service (NaaS) decken wir alles ab, was Ihr Unternehmen braucht.</p>
      </div>

      <div class="services-grid">
        <div class="service-card" @click="$emit('show-service', 'dbaas')">
          <div class="service-icon">
            <i class="bi bi-database"></i>
          </div>
          <div class="service-content">
            <h3>Database as a Service (DBaaS)</h3>
            <p>Schnelle, skalierbare Datenbanken für Unternehmen jeder Größe.</p>
          </div>
          <div class="service-hover">
            <span>Mehr erfahren</span>
            <i class="bi bi-arrow-right"></i>
          </div>
        </div>

        <div class="service-card" @click="$emit('show-service', 'daas')">
          <div class="service-icon">
            <i class="bi bi-display"></i>
          </div>
          <div class="service-content">
            <h3>Desktop as a Service (DaaS)</h3>
            <p>Flexibler und sicherer Zugriff auf Remote-Arbeitsplätze – jederzeit, überall.</p>
          </div>
          <div class="service-hover">
            <span>Mehr erfahren</span>
            <i class="bi bi-arrow-right"></i>
          </div>
        </div>

        <div class="service-card" @click="$emit('show-service', 'iaas')">
          <div class="service-icon">
            <i class="bi bi-cloud"></i>
          </div>
          <div class="service-content">
            <h3>Windows Company Infrastructure (IaaS)</h3>
            <p>Vollständige Unternehmens-IT in der Cloud, ohne Kompromisse bei Leistung oder Sicherheit.</p>
          </div>
          <div class="service-hover">
            <span>Mehr erfahren</span>
            <i class="bi bi-arrow-right"></i>
          </div>
        </div>

        <div class="service-card" @click="$emit('show-service', 'naas')">
          <div class="service-icon">
            <i class="bi bi-diagram-3"></i>
          </div>
          <div class="service-content">
            <h3>Network as a Service (NaaS)</h3>
            <p>Sichere und leistungsstarke Netzwerke, die skalieren, wenn Sie es brauchen.</p>
          </div>
          <div class="service-hover">
            <span>Mehr erfahren</span>
            <i class="bi bi-arrow-right"></i>
          </div>
        </div>

        <div class="service-card" @click="$emit('show-service', 'baas')">
          <div class="service-icon">
            <i class="bi bi-hdd-network"></i>
          </div>
          <div class="service-content">
            <h3>Storage Backend as a Service (BaaS)</h3>
            <p>Zuverlässige Speicherlösungen mit DSGVO-Konformität.</p>
          </div>
          <div class="service-hover">
            <span>Mehr erfahren</span>
            <i class="bi bi-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ServiceSection',
  emits: ['show-service']
}
</script>

<style scoped>
.services {
  padding: 100px 0;
  background: var(--color-white);
  position: relative;
  margin: 50px 0;
}

.services::after {
  content: '';
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(72, 52, 212, 0.2), transparent);
}

.section-title {
  text-align: center;
  margin-bottom: 50px;
}

.section-title h2 {
  color: var(--color-primary);
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.section-title p {
  color: var(--color-secondary);
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.6;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
}

.service-card {
  position: relative;
  background: white;
  border-radius: 20px;
  padding: 30px;
  transition: all 0.3s ease;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(72, 52, 212, 0.1);
  cursor: pointer;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(72, 52, 212, 0.15);
}

.service-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.service-icon i {
  font-size: 30px;
  color: white;
}

.service-content h3 {
  color: var(--color-primary);
  font-size: 1.3rem;
  margin-bottom: 15px;
  font-weight: 600;
}

.service-content p {
  color: var(--color-secondary);
  line-height: 1.6;
  margin: 0;
}

.service-hover {
  position: absolute;
  bottom: -50px;
  left: 0;
  width: 100%;
  padding: 15px 30px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;
  opacity: 0;
}

.service-card:hover .service-hover {
  bottom: 0;
  opacity: 1;
}

.service-hover span {
  font-weight: 500;
}

.service-hover i {
  font-size: 20px;
}

@media (max-width: 768px) {
  .services {
    padding: 60px 0;
    margin: 30px 0;
  }

  .services-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 10px;
  }

  .service-card {
    padding: 20px;
  }

  .service-icon {
    width: 60px;
    height: 60px;
  }

  .service-icon i {
    font-size: 24px;
  }

  .section-title h2 {
    font-size: 2rem;
  }

  .section-title p {
    font-size: 1rem;
  }
}
</style> 