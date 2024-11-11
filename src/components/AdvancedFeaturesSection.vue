<template>
  <section id="advanced-features" class="advanced-features">
    <div class="section-shape-top">
      <div class="shape-waves">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
    </div>
    <div class="container">
      <div class="section-title">
        <h2>Enterprise Features</h2>
        <p>Professionelle Lösungen für Ihr Unternehmen</p>
      </div>

      <div class="row g-4">
        <div class="col-lg-4">
          <div class="advanced-feature">
            <div class="feature-icon">
              <i class="bi bi-shield-lock"></i>
            </div>
            <h4>Enterprise Security</h4>
            <p>Umfassende Sicherheitslösungen mit:</p>
            <ul>
              <li><i class="bi bi-check2"></i> DDoS-Schutz</li>
              <li><i class="bi bi-check2"></i> SSL/TLS Verschlüsselung</li>
              <li><i class="bi bi-check2"></i> Firewall Management</li>
              <li><i class="bi bi-check2"></i> 24/7 Security Monitoring</li>
            </ul>
          </div>
        </div>
        
        <div class="col-lg-4">
          <div class="advanced-feature">
            <div class="feature-icon">
              <i class="bi bi-graph-up"></i>
            </div>
            <h4>Performance Analytics</h4>
            <p>Echtzeit-Monitoring und Analysen für:</p>
            <ul>
              <li><i class="bi bi-check2"></i> Resource Utilization</li>
              <li><i class="bi bi-check2"></i> Performance Metrics</li>
              <li><i class="bi bi-check2"></i> Cost Optimization</li>
              <li><i class="bi bi-check2"></i> Predictive Scaling</li>
            </ul>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="advanced-feature">
            <div class="feature-icon">
              <i class="bi bi-cloud-check"></i>
            </div>
            <h4>Cloud Management</h4>
            <p>Umfassendes Cloud Management mit:</p>
            <ul>
              <li><i class="bi bi-check2"></i> Multi-Cloud Support</li>
              <li><i class="bi bi-check2"></i> Automatisierung</li>
              <li><i class="bi bi-check2"></i> Resource Optimization</li>
              <li><i class="bi bi-check2"></i> Compliance Management</li>
            </ul>
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
  name: 'AdvancedFeaturesSection'
}
</script>

<style scoped>
.advanced-features {
  background: var(--color-light);
  padding: 150px 0;
  position: relative;
  margin: -50px 0;
  z-index: 1;
}

.section-shape-top,
.section-shape-bottom {
  position: absolute;
  left: 0;
  width: 100%;
  height: 150px;
  overflow: hidden;
}

.section-shape-top {
  top: 0;
  transform: rotate(180deg);
}

.section-shape-bottom {
  bottom: 0;
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
  background: var(--color-white);
  border-radius: 1000% 1000% 0 0;
}

.section-shape-top .wave {
  background: var(--color-white);
}

.section-shape-bottom .wave {
  background: var(--color-white);
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

.advanced-feature {
  padding: 40px;
  border-radius: 20px;
  background: var(--color-white);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  height: 100%;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.advanced-feature:hover {
  transform: translateY(-10px);
}

.advanced-feature .feature-icon {
  width: 70px;
  height: 70px;
  background: var(--color-light);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  transition: all 0.3s ease;
}

.advanced-feature:hover .feature-icon {
  background: var(--color-primary);
}

.advanced-feature .feature-icon i {
  font-size: 32px;
  color: var(--color-primary);
  transition: all 0.3s ease;
}

.advanced-feature:hover .feature-icon i {
  color: var(--color-white);
}

.advanced-feature h4 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--color-primary);
}

.advanced-feature p {
  color: var(--color-default);
  margin-bottom: 15px;
}

.advanced-feature ul {
  list-style: none;
  padding: 0;
  margin: 20px 0 0;
}

.advanced-feature ul li {
  padding: 8px 0;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: var(--color-default);
}

.advanced-feature ul li i {
  color: var(--color-secondary);
  margin-right: 12px;
  font-size: 18px;
}

@media (max-width: 768px) {
  .advanced-feature {
    padding: 30px;
  }
  
  .advanced-feature h4 {
    font-size: 20px;
  }
  
  .advanced-feature ul li {
    font-size: 14px;
  }
}
</style> 