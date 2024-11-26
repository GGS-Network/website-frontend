<template>
  <div class="services-page">
    <section class="services-content">
      <div class="container">
        <h1>Unsere Leistungen</h1>
        
        <div class="services-text">
          <div class="service-grid">
            <div class="service-item">
              <div class="service-icon">
                <i class="bi bi-database"></i>
              </div>
              <h3>Database as a Service (DBaaS)</h3>
              <p>
                Schnelle, sichere und skalierbare Lösung für das Management von Datenbanken. 
                Optimiert für moderne Unternehmensanforderungen mit automatischer Skalierung, 
                Backup-Management und Hochverfügbarkeit.
              </p>
            </div>

            <div class="service-item">
              <div class="service-icon">
                <i class="bi bi-cloud"></i>
              </div>
              <h3>Windows Company Infrastructure (IaaS)</h3>
              <p>
                Komplette Cloud-Infrastrukturlösung für Unternehmen. Flexible Ressourcenverwaltung, 
                maximale Sicherheit und optimale Performance für Ihre IT-Systeme.
              </p>
            </div>

            <div class="service-item">
              <div class="service-icon">
                <i class="bi bi-display"></i>
              </div>
              <h3>Desktop as a Service (DaaS)</h3>
              <p>
                Sichere und flexible Remote-Arbeitsplätze für Ihr Team. Zugriff von überall, 
                zentrale Verwaltung und automatische Updates für maximale Produktivität.
              </p>
            </div>

            <div class="service-item">
              <div class="service-icon">
                <i class="bi bi-diagram-3"></i>
              </div>
              <h3>Network as a Service (NaaS)</h3>
              <p>
                Hochverfügbare und sichere Netzwerklösungen. Optimierte Performance, 
                automatisches Routing und umfassende Sicherheitsfunktionen für Ihre 
                Unternehmenskommunikation.
              </p>
            </div>

            <div class="service-item">
              <div class="service-icon">
                <i class="bi bi-hdd-network"></i>
              </div>
              <h3>Storage Backend as a Service (BaaS)</h3>
              <p>
                Skalierbare Speicherlösungen für alle Anforderungen. Automatische Backups, 
                Verschlüsselung und flexible Zugriffsoptionen für Ihre Unternehmensdaten.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Services'
}
</script>

<style scoped>
.services-page {
  padding-top: 120px;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  color: var(--color-white);
}

.services-content {
  padding: 40px 0;
}

.services-content h1 {
  color: var(--color-white);
  margin-bottom: 30px;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
}

.services-text {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 40px;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.service-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 15px;
  transition: transform 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.service-item:hover {
  transform: translateY(-5px);
}

.service-icon {
  font-size: 2.5rem;
  color: var(--color-tertiary);
  margin-bottom: 1rem;
  text-align: center;
}

.service-item h3 {
  color: var(--color-white);
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.service-item p {
  color: var(--color-light);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .services-content {
    padding: 20px 0;
  }

  .services-text {
    padding: 20px;
  }

  .services-content h1 {
    font-size: 2rem;
  }

  .service-grid {
    grid-template-columns: 1fr;
  }
}

@supports not (backdrop-filter: blur(10px)) {
  .services-text {
    background: rgba(255, 255, 255, 0.05);
  }
}
</style> 