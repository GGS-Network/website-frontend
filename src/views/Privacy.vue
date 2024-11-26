<template>
  <div class="privacy-page">
    <section class="privacy-content">
      <div class="container">
        <h1>Datenschutzerklärung</h1>
        
        <div class="privacy-text">
          <h2>Einleitung</h2>
          <p>Wir, die GGS-Network UG, nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>

          <h2>Verantwortliche Stelle</h2>
          <p>Verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
          <p>Global Gateway Solutions Network (GGS-Network) UG</p>
          <p>-</p>
          <p>privacy@ggs-network.com</p>
          <p>+49 (0) 15679229548</p>

          <h2>Datenerhebung und -verarbeitung</h2>
          <p>Wir erheben und verarbeiten personenbezogene Daten nur, wenn dies gesetzlich erlaubt ist oder Sie in die Datenerhebung einwilligen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können, wie Name, Adresse, E-Mail-Adresse und IP-Adresse.</p>

          <h2>Ihre Rechte</h2>
          <p>Sie haben das Recht, jederzeit Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem das Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Weitere Rechte umfassen:</p>
          <ul>
            <li>Das Recht auf Einschränkung der Verarbeitung</li>
            <li>Das Recht auf Datenübertragbarkeit</li>
            <li>Das Widerspruchsrecht gegen die Verarbeitung Ihrer Daten</li>
            <li>Das Recht auf Widerruf Ihrer Einwilligung zur Datenverarbeitung</li>
          </ul>

          <h2>Zwecke der Datenverarbeitung</h2>
          <p>Wir verarbeiten personenbezogene Daten zu folgenden Zwecken:</p>
          <ul>
            <li>Zur Bereitstellung unserer Dienstleistungen</li>
            <li>Zur Erfüllung vertraglicher Verpflichtungen</li>
            <li>Zur Optimierung und Personalisierung unserer Dienstleistungen</li>
            <li>Zu Marketingzwecken, sofern Sie dem zugestimmt haben</li>
          </ul>

          <h2>Rechtsgrundlagen der Verarbeitung</h2>
          <p>Die Verarbeitung Ihrer Daten erfolgt auf Basis folgender Rechtsgrundlagen:</p>
          <ul>
            <li>Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO</li>
            <li>Erfüllung eines Vertrags gemäß Art. 6 Abs. 1 lit. b DSGVO</li>
            <li>Erfüllung einer rechtlichen Verpflichtung gemäß Art. 6 Abs. 1 lit. c DSGVO</li>
            <li>Wahrung berechtigter Interessen gemäß Art. 6 Abs. 1 lit. f DSGVO</li>
          </ul>

          <h2>Datensicherheit</h2>
          <p>Wir treffen technische und organisatorische Maßnahmen, um Ihre Daten gegen Verlust, Manipulation und unberechtigten Zugriff zu schützen.</p>

          <h2>Verwendete Frameworks und Cookies</h2>
          <p>Unsere Website nutzt verschiedene Frameworks und Technologien, die für den Betrieb und die Funktionalität erforderlich sind. Hier finden Sie eine detaillierte Auflistung der verwendeten Technologien und deren Cookies:</p>

          <div class="framework-section">
            <h3>Vue.js</h3>
            <p>Unser Frontend basiert auf Vue.js (Version 3):</p>
            <ul>
              <li>Keine permanenten Cookies</li>
              <li>Temporäre Session-Storage für Routing-Informationen</li>
              <li>Speicherdauer: Nur während der aktiven Sitzung</li>
            </ul>
          </div>

          <div class="framework-section">
            <h3>Bootstrap</h3>
            <p>Für das responsive Design verwenden wir Bootstrap:</p>
            <ul>
              <li>Keine eigenen Cookies</li>
              <li>Nur lokale CSS- und JavaScript-Dateien</li>
            </ul>
          </div>

          <div class="framework-section">
            <h3>Swiper</h3>
            <p>Für Karussell-Funktionen:</p>
            <ul>
              <li>Temporäre Einstellungen im localStorage</li>
              <li>Speichert Benutzereinstellungen für Animationen</li>
              <li>Speicherdauer: 24 Stunden</li>
            </ul>
          </div>

          <div class="framework-section">
            <h3>Vue-Toastification</h3>
            <p>Für System-Benachrichtigungen:</p>
            <ul>
              <li>Temporäre Session-Cookies</li>
              <li>Speicherdauer: Bis zum Schließen des Browsers</li>
            </ul>
          </div>

          <h2>Technisch notwendige Cookies</h2>
          <p>Folgende Cookies sind für den Betrieb unserer Website technisch notwendig:</p>
          <div class="table-responsive">
            <table class="cookie-table">
              <thead>
                <tr>
                  <th>Cookie-Name</th>
                  <th>Zweck</th>
                  <th>Speicherdauer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>session-token</td>
                  <td>Authentifizierung und Sitzungsverwaltung</td>
                  <td>24 Stunden</td>
                </tr>
                <tr>
                  <td>csrf-token</td>
                  <td>Sicherheit (CSRF-Schutz)</td>
                  <td>Sitzungsdauer</td>
                </tr>
                <tr>
                  <td>ui-preferences</td>
                  <td>Benutzereinstellungen (Theme, Sprache)</td>
                  <td>6 Monate</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Cookie-Einstellungen</h2>
          <p>Sie können Ihre Cookie-Einstellungen jederzeit anpassen:</p>
          <ul>
            <li>Notwendige Cookies: Immer aktiv (technisch erforderlich)</li>
            <li>Funktionale Cookies: Können deaktiviert werden (eingeschränkte Funktionalität)</li>
            <li>Analyse-Cookies: Standardmäßig deaktiviert</li>
          </ul>

          <div class="cookie-control mt-4">
            <button class="btn btn-primary" @click="handleCookieSettings">
              Cookie-Einstellungen anpassen
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Privacy',
  inject: ['openCookieSettings'],
  methods: {
    handleCookieSettings() {
      this.openCookieSettings()
    }
  }
}
</script>

<style scoped>
.privacy-page {
  padding-top: 120px;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  color: var(--color-white);
}

.privacy-content {
  padding: 40px 0;
}

.privacy-content h1 {
  color: var(--color-white);
  margin-bottom: 30px;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
}

.privacy-text {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 40px;
}

.privacy-text h2 {
  color: var(--color-white);
  margin: 25px 0 15px;
  font-size: 1.5rem;
  font-weight: 600;
  border-bottom: 2px solid var(--color-tertiary);
  padding-bottom: 10px;
  display: inline-block;
}

.privacy-text h2:first-child {
  margin-top: 0;
}

.privacy-text p {
  margin-bottom: 15px;
  line-height: 1.6;
  color: var(--color-light);
}

.privacy-text ul {
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 20px;
}

.privacy-text ul li {
  padding: 8px 0;
  padding-left: 25px;
  position: relative;
  color: var(--color-light);
}

.privacy-text ul li:before {
  content: "•";
  color: var(--color-tertiary);
  font-weight: bold;
  position: absolute;
  left: 0;
}

@media (max-width: 768px) {
  .privacy-content {
    padding: 20px 0;
  }

  .privacy-text {
    padding: 20px;
  }

  .privacy-content h1 {
    font-size: 2rem;
  }

  .privacy-text h2 {
    font-size: 1.3rem;
  }
}

@supports not (backdrop-filter: blur(10px)) {
  .privacy-text {
    background: rgba(255, 255, 255, 0.05);
  }
}

.framework-section {
  margin-bottom: 25px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.framework-section h3 {
  color: var(--color-white);
  font-size: 1.2rem;
  margin-bottom: 10px;
  font-weight: 600;
}

.cookie-table {
  width: 100%;
  margin: 20px 0;
  border-collapse: separate;
  border-spacing: 0;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  overflow: hidden;
}

.cookie-table th,
.cookie-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.cookie-table th {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-white);
  font-weight: 600;
}

.cookie-table td {
  color: var(--color-light);
}

.cookie-control .btn {
  background: var(--gradient-primary);
  border: none;
  padding: 12px 25px;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.cookie-control .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .cookie-table {
    display: block;
    overflow-x: auto;
  }
  
  .framework-section {
    padding: 10px;
  }
}
</style> 