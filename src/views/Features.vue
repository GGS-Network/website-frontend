<template>
  <div class="features-page">
    <section class="features-content">
      <div class="container">
        <h1>Unsere Funktionen</h1>
        
        <div class="features-text">
          <div class="feature-grid">
            <div class="feature-item">
              <div class="feature-icon">
                <i class="bi bi-shield-check"></i>
              </div>
              <h3>Maximale Sicherheit</h3>
              <p>
                Modernste Verschlüsselungstechnologien und regelmäßige Sicherheitsupdates 
                gewährleisten den Schutz Ihrer sensiblen Unternehmensdaten. Multi-Faktor-Authentifizierung 
                und rollenbasierte Zugriffskontrollen bieten zusätzliche Sicherheitsebenen.
              </p>
            </div>

            <div class="feature-item">
              <div class="feature-icon">
                <i class="bi bi-speedometer2"></i>
              </div>
              <h3>Hohe Performance</h3>
              <p>
                Optimierte Serverarchitektur und modernste Technologien sorgen für 
                schnelle Reaktionszeiten und maximale Leistung. Load-Balancing und 
                automatische Skalierung garantieren konstant hohe Performance.
              </p>
            </div>

            <div class="feature-item">
              <div class="feature-icon">
                <i class="bi bi-gear"></i>
              </div>
              <h3>Automatisierung</h3>
              <p>
                Automatisierte Prozesse für Backups, Updates und Wartungsarbeiten 
                reduzieren den administrativen Aufwand und minimieren menschliche Fehler.
              </p>
            </div>

            <div class="feature-item">
              <div class="feature-icon">
                <i class="bi bi-graph-up"></i>
              </div>
              <h3>Skalierbarkeit</h3>
              <p>
                Flexible Ressourcenanpassung ermöglicht es Ihnen, Ihre IT-Infrastruktur 
                entsprechend Ihren aktuellen Anforderungen zu skalieren. Bezahlen Sie nur 
                für die Ressourcen, die Sie tatsächlich nutzen.
              </p>
            </div>

            <div class="feature-item">
              <div class="feature-icon">
                <i class="bi bi-clock-history"></i>
              </div>
              <h3>24/7 Verfügbarkeit</h3>
              <p>
                Hochverfügbarkeitsarchitektur und redundante Systeme gewährleisten 
                unterbrechungsfreien Betrieb. Unser Support-Team ist rund um die Uhr 
                für Sie erreichbar.
              </p>
            </div>

            <div class="feature-item">
              <div class="feature-icon">
                <i class="bi bi-tools"></i>
              </div>
              <h3>Einfache Integration</h3>
              <p>
                Standardisierte APIs und moderne Schnittstellen ermöglichen eine 
                nahtlose Integration in Ihre bestehende IT-Landschaft. Umfangreiche 
                Dokumentation und Support erleichtern die Implementierung.
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
  name: 'Features'
}
</script>

<style scoped>
.features-page {
  padding-top: 120px;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  color: var(--color-white);
}

.features-content {
  padding: 40px 0;
}

.features-content h1 {
  color: var(--color-white);
  margin-bottom: 30px;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
}

.features-text {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 40px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 15px;
  transition: transform 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.feature-item:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 2.5rem;
  color: var(--color-tertiary);
  margin-bottom: 1rem;
  text-align: center;
}

.feature-item h3 {
  color: var(--color-white);
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-weight: 600;
  text-align: center;
}

.feature-item p {
  color: var(--color-light);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .features-content {
    padding: 20px 0;
  }

  .features-text {
    padding: 20px;
  }

  .features-content h1 {
    font-size: 2rem;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }
}

@supports not (backdrop-filter: blur(10px)) {
  .features-text {
    background: rgba(255, 255, 255, 0.05);
  }
}
</style> 