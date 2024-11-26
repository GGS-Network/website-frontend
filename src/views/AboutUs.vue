<template>
  <div class="vision-page">
    <section class="vision-content">
      <div class="container">
        <h1>Über Uns – Velocity Desk</h1>
        
        <div class="vision-text">
          <p>
            Bei <strong>Velocity Desk</strong> glauben wir daran, dass IT einfach, sicher und effizient sein sollte. 
            Unser Ziel ist es, Unternehmen jeder Größe eine Plattform zu bieten, die ihre gesamte 
            IT-Infrastruktur zentralisiert, automatisiert und skaliert.
          </p>

          <p>
            Wir verstehen die Herausforderungen moderner Unternehmen: Komplexe Datenbanken, wachsende 
            Anforderungen an Sicherheit und Compliance sowie der Druck, gleichzeitig Kosten zu senken 
            und Innovationen voranzutreiben. Hier setzen wir an – mit einer Lösung, die alles vereint.
          </p>

          <p>
            <strong>Unsere Mission:</strong><br>
            Mit Velocity Desk möchten wir die Art und Weise, wie Unternehmen ihre IT verwalten, 
            grundlegend verändern. Unsere Plattform kombiniert leistungsstarke Technologien wie 
            <strong>Database as a Service (DBaaS)</strong>, <strong>Desktop as a Service (DaaS)</strong> 
            und <strong>Network as a Service (NaaS)</strong>, um IT-Prozesse zu optimieren und 
            Unternehmen zu entlasten.
          </p>

          <p>
            <strong>Unsere Werte:</strong>
          </p>

          <p>
            <strong>Innovation:</strong> Wir setzen auf modernste Technologien, die mit Ihrem 
            Unternehmen wachsen.<br>
            <strong>Sicherheit:</strong> Datenschutz und DSGVO-Konformität sind in unserer Plattform 
            fest verankert.<br>
            <strong>Flexibilität:</strong> Egal ob Start-up oder Großkonzern – unsere Lösungen passen 
            sich Ihren Bedürfnissen an.<br>
            <strong>Benutzerfreundlichkeit:</strong> Mit einem intuitiven Dashboard und automatisierten 
            Prozessen machen wir IT-Verwaltung kinderleicht.
          </p>

          <p>
            <strong>Warum Velocity Desk?</strong><br>
            Unsere Plattform ist mehr als ein Tool – sie ist ein Partner, der Unternehmen unterstützt, 
            ihre IT einfacher, sicherer und effizienter zu gestalten. Von Anwaltskanzleien, die 
            DSGVO-konforme Speicherlösungen benötigen, bis hin zu globalen Unternehmen, die skalierbare 
            IT-Infrastruktur suchen – wir bieten für jede Herausforderung die passende Lösung.
          </p>

          <p>
            Lassen Sie uns gemeinsam die Zukunft Ihrer IT gestalten!
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutUs'
}
</script>

<style scoped>
.vision-page {
  padding-top: 120px;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  color: var(--color-white);
}

.vision-content {
  padding: 40px 0;
}

.vision-content h1 {
  color: var(--color-white);
  margin-bottom: 30px;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
}

.vision-text {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 40px;
}

.vision-text p {
  margin-bottom: 20px;
  line-height: 1.8;
  color: var(--color-light);
}

.vision-text strong {
  color: var(--color-white);
}

@media (max-width: 768px) {
  .vision-content {
    padding: 20px 0;
  }

  .vision-text {
    padding: 20px;
  }

  .vision-content h1 {
    font-size: 2rem;
  }
}

@supports not (backdrop-filter: blur(10px)) {
  .vision-text {
    background: rgba(255, 255, 255, 0.05);
  }
}
</style> 