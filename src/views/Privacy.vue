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
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Privacy'
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
</style> 