<template>
  <section id="pricing" class="pricing">
    <div class="container">
      <div class="section-title">
        <h2>Unsere Tarife</h2>
        <p>Wählen Sie zwischen Business und Enterprise Lösungen</p>
      </div>

      <div class="pricing-tabs">
        <button 
          :class="['tab-btn', { active: activeTab === 'business' }]" 
          @click="activeTab = 'business'"
        >
          Business
        </button>
        <button 
          :class="['tab-btn', { active: activeTab === 'enterprise' }]" 
          @click="activeTab = 'enterprise'"
        >
          Enterprise
        </button>
      </div>

      <div class="row g-4 mt-4" v-if="activeTab === 'business'">
        <div v-for="plan in businessPlans" :key="plan.id" class="col-lg-4">
          <div class="pricing-box" :class="{ featured: plan.featured }">
            <span v-if="plan.featured" class="featured-badge">Beliebt</span>
            <h3>{{ plan.name }}</h3>
            <div class="price">
              <span class="currency">€</span>
              <span class="amount">{{ plan.price }}</span>
              <span class="period">/Monat</span>
            </div>
            <ul>
              <li v-for="(feature, index) in plan.features" :key="index">
                <i class="bi bi-check-circle"></i>
                {{ feature }}
              </li>
            </ul>
            <a href="#contact" class="buy-btn">Jetzt starten</a>
          </div>
        </div>
      </div>

      <div class="row g-4 mt-4" v-if="activeTab === 'enterprise'">
        <div v-for="plan in enterprisePlans" :key="plan.id" class="col-lg-4">
          <div class="pricing-box enterprise" :class="{ featured: plan.featured }">
            <span v-if="plan.featured" class="featured-badge">Top-Seller</span>
            <h3>{{ plan.name }}</h3>
            <div class="price">
              <span class="currency">€</span>
              <span class="amount">{{ plan.price }}</span>
              <span class="period">/Monat</span>
            </div>
            <ul>
              <li v-for="(feature, index) in plan.features" :key="index">
                <i class="bi bi-check-circle"></i>
                {{ feature }}
              </li>
            </ul>
            <a href="#contact" class="buy-btn">Kontakt aufnehmen</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PricingSection',
  data() {
    return {
      activeTab: 'business',
      businessPlans: [
        {
          id: 1,
          name: 'Starter',
          price: 99,
          features: [
            '2 vCPUs',
            '4 GB RAM',
            '100 GB SSD Storage',
            '1 TB Traffic',
            'Basic Support',
            '99.9% Uptime'
          ]
        },
        {
          id: 2,
          name: 'Business',
          price: 199,
          featured: true,
          features: [
            '4 vCPUs',
            '8 GB RAM',
            '250 GB SSD Storage',
            'Unbegrenzter Traffic',
            'Premium Support',
            '99.95% Uptime'
          ]
        },
        {
          id: 3,
          name: 'Professional',
          price: 399,
          features: [
            '8 vCPUs',
            '16 GB RAM',
            '500 GB SSD Storage',
            'Unbegrenzter Traffic',
            '24/7 Support',
            '99.99% Uptime'
          ]
        }
      ],
      enterprisePlans: [
        {
          id: 1,
          name: 'Enterprise S',
          price: 2000,
          features: [
            'Dedizierte Hardware',
            '32 vCPUs',
            '64 GB RAM',
            '2 TB NVMe Storage',
            'Enterprise Support',
            'Hardware Firewall',
            'Backup inklusive',
            'DDoS Protection'
          ]
        },
        {
          id: 2,
          name: 'Enterprise M',
          price: 5000,
          featured: true,
          features: [
            'Dedizierte Hardware',
            '64 vCPUs',
            '128 GB RAM',
            '5 TB NVMe Storage',
            '24/7 Enterprise Support',
            'HA Setup',
            'Managed Backup',
            'Advanced DDoS Protection'
          ]
        },
        {
          id: 3,
          name: 'Enterprise L',
          price: 10000,
          features: [
            'Custom Hardware',
            'Unlimitierte Resources',
            'Dediziertes Team',
            'Multi-DC Setup',
            'Disaster Recovery',
            'Custom SLA',
            'White-Glove Service',
            'Enterprise Security Suite'
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.pricing {
  padding: 80px 0;
  background: var(--color-light);
}

.pricing-tabs {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
  padding: 5px;
  background: var(--color-white);
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
}

.tab-btn {
  padding: 12px 30px;
  border: none;
  border-radius: 25px;
  background: transparent;
  color: var(--color-primary);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.tab-btn.active {
  color: var(--color-white);
}

.pricing-tabs::before {
  content: '';
  position: absolute;
  width: 50%;
  height: 90%;
  background: var(--gradient-primary);
  border-radius: 25px;
  top: 5%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  left: 5px;
}

.pricing-tabs:has(.tab-btn:last-child.active)::before {
  transform: translateX(100%);
}

/* Fallback für Browser die :has nicht unterstützen */
@supports not (selector(:has(*))) {
  .tab-btn.active {
    background: var(--gradient-primary);
  }
}

.row {
  transition: all 0.3s ease;
  opacity: 1;
  transform: translateX(0);
}

.row.ng-enter, 
.row.ng-leave {
  opacity: 0;
  transform: translateX(30px);
}

.pricing-box {
  background: var(--color-white);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  height: 100%;
}

.pricing-box.enterprise {
  background: linear-gradient(145deg, var(--color-white), var(--color-light));
  border: 2px solid var(--color-primary);
}

.pricing-box:hover {
  transform: translateY(-10px);
}

.featured {
  border: 2px solid var(--color-secondary);
}

.featured-badge {
  position: absolute;
  top: 20px;
  right: -35px;
  transform: rotate(45deg);
  background: var(--gradient-primary);
  color: var(--color-white);
  padding: 8px 40px;
  font-size: 14px;
  font-weight: 500;
}

.price {
  margin: 30px 0;
  color: var(--color-primary);
}

.currency {
  font-size: 24px;
  font-weight: 600;
  vertical-align: top;
  line-height: 1;
}

.amount {
  font-size: 48px;
  font-weight: 700;
  font-family: var(--font-primary);
}

.period {
  font-size: 16px;
  color: var(--color-default);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0 0 30px;
}

ul li {
  padding: 10px 0;
  display: flex;
  align-items: center;
  color: var(--color-default);
}

ul li i {
  color: var(--color-secondary);
  margin-right: 10px;
  font-size: 18px;
}

.buy-btn {
  display: inline-block;
  padding: 12px 35px;
  border-radius: 50px;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.buy-btn:hover {
  background: var(--gradient-primary);
  color: var(--color-white);
  border-color: transparent;
}

.enterprise .buy-btn {
  background: var(--gradient-primary);
  color: var(--color-white);
  border: none;
}

.enterprise .buy-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .pricing-box {
    padding: 30px;
  }
  
  .amount {
    font-size: 36px;
  }

  .pricing-tabs {
    width: calc(100% - 40px);
    max-width: 300px;
  }

  .tab-btn {
    padding: 10px 20px;
    font-size: 14px;
    flex: 1;
    text-align: center;
  }
}
</style> 