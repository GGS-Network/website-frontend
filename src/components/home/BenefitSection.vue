<template>
  <section id="benefits" class="benefits">
    <div class="container">
      <div class="section-title text-center mb-5">
        <h2>Warum Velocity Desk?</h2>
        <p>Entdecken Sie die Vorteile unserer zentralen IT-Plattform</p>
      </div>

      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon">
            <i class="bi bi-gear-wide-connected"></i>
          </div>
          <div class="benefit-content">
            <h3>Zentrale Verwaltung</h3>
            <p>Verwalten Sie Ihre gesamte IT-Infrastruktur von einer zentralen Plattform aus. Sparen Sie Zeit und reduzieren Sie Komplexität.</p>
            <ul class="benefit-features">
              <li><i class="bi bi-check2"></i> Einheitliches Dashboard</li>
              <li><i class="bi bi-check2"></i> Automatisierte Prozesse</li>
              <li><i class="bi bi-check2"></i> Echtzeit-Monitoring</li>
            </ul>
          </div>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">
            <i class="bi bi-shield-check"></i>
          </div>
          <div class="benefit-content">
            <h3>DSGVO-konform</h3>
            <p>Maximale Sicherheit und Datenschutz nach höchsten Standards. Ihre Daten sind bei uns in sicheren Händen.</p>
            <ul class="benefit-features">
              <li><i class="bi bi-check2"></i> Verschlüsselte Speicherung</li>
              <li><i class="bi bi-check2"></i> Zugriffskontrollen</li>
              <li><i class="bi bi-check2"></i> Audit-Protokolle</li>
            </ul>
          </div>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">
            <i class="bi bi-graph-up"></i>
          </div>
          <div class="benefit-content">
            <h3>Skalierbarkeit</h3>
            <p>Wachsen Sie flexibel mit Ihren Anforderungen. Unsere Plattform passt sich Ihren Bedürfnissen an.</p>
            <ul class="benefit-features">
              <li><i class="bi bi-check2"></i> Flexible Ressourcen</li>
              <li><i class="bi bi-check2"></i> Pay-as-you-grow</li>
              <li><i class="bi bi-check2"></i> Automatische Skalierung</li>
            </ul>
          </div>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">
            <i class="bi bi-puzzle"></i>
          </div>
          <div class="benefit-content">
            <h3>Einfache Integration</h3>
            <p>Nahtlose Einbindung in Ihre bestehende IT-Landschaft. Minimaler Aufwand, maximaler Nutzen.</p>
            <ul class="benefit-features">
              <li><i class="bi bi-check2"></i> Standard-APIs</li>
              <li><i class="bi bi-check2"></i> Flexible Konnektoren</li>
              <li><i class="bi bi-check2"></i> Schnelle Implementierung</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BenefitSection'
}
</script>

<style scoped>
.benefits {
  background: var(--color-white);
  padding: 100px 0;
  position: relative;
  margin: 50px 0;
}

.benefits::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(135deg, rgba(72, 52, 212, 0.05) 0%, rgba(72, 52, 212, 0.01) 100%);
  z-index: 0;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  position: relative;
  z-index: 1;
}

.benefit-card {
  background: white;
  border-radius: 20px;
  padding: 30px;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(72, 52, 212, 0.1);
  position: relative;
  overflow: hidden;
}

.benefit-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(72, 52, 212, 0.15);
}

.benefit-card:hover::before {
  transform: scaleX(1);
}

.benefit-icon {
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

.benefit-icon i {
  font-size: 30px;
  color: white;
}

.benefit-content h3 {
  color: var(--color-primary);
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 15px;
}

.benefit-content p {
  color: var(--color-secondary);
  line-height: 1.6;
  margin-bottom: 20px;
}

.benefit-features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.benefit-features li {
  display: flex;
  align-items: center;
  color: var(--color-secondary);
  margin-bottom: 10px;
  font-size: 0.95rem;
}

.benefit-features li i {
  color: var(--color-primary);
  margin-right: 10px;
  font-size: 1.1rem;
}

.section-title p {
  color: var(--color-secondary);
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .benefits {
    padding: 60px 0;
    margin: 30px 0;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 15px;
  }

  .benefit-card {
    padding: 25px;
  }

  .benefit-icon {
    width: 60px;
    height: 60px;
  }

  .benefit-icon i {
    font-size: 24px;
  }
}
</style> 