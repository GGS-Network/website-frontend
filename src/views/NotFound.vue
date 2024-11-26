<template>
  <div class="privacy-page">
    <section class="privacy-content">
      <div class="container">
        <h1>404 - Seite nicht gefunden</h1>
        
        <div class="privacy-text">
          <h2>Oops!</h2>
          <p>Die von Ihnen gesuchte Seite konnte leider nicht gefunden werden.</p>

          <p>
            Möglicherweise wurde die Seite verschoben, gelöscht oder die URL ist falsch geschrieben.
          </p>

          <h2>Was können Sie tun?</h2>
          <ul>
            <li>Überprüfen Sie die URL auf Tippfehler</li>
            <li>Kehren Sie zur <router-link to="/" class="text-white">Startseite</router-link> zurück</li>
            <li>Nutzen Sie die Navigation oben, um zu anderen Bereichen zu gelangen</li>
          </ul>

          <div class="text-center mt-5">
            <router-link to="/" class="btn btn-primary">
              Zurück zur Startseite
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
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

.btn-primary {
  background: var(--gradient-primary);
  border: none;
  padding: 12px 25px;
  border-radius: 50px;
  transition: all 0.3s ease;
  color: var(--color-white);
  text-decoration: none;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
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