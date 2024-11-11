<template>
  <section id="stats" class="stats-counter section-bg">
    <div class="container">
      <div class="row counters">
        <div v-for="stat in stats" :key="stat.id" class="col-lg-3 col-6 text-center">
          <span ref="countUpRefs" class="counter-number">0</span>
          <p>{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'StatsSection',
  data() {
    return {
      stats: [
        { id: 1, value: 99.9, label: 'Verfügbarkeit %', decimals: 1 },
        { id: 2, value: 1000, label: 'Aktive Kunden', decimals: 0 },
        { id: 3, value: 5000, label: 'Server weltweit', decimals: 0 },
        { id: 4, value: 24, label: 'Support (h/Tag)', decimals: 0 }
      ],
      countUpRefs: []
    }
  },
  mounted() {
    // Intersection Observer für das Starten der Animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.startCountAnimation();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    // Beobachte die Section
    observer.observe(this.$el);
  },
  methods: {
    startCountAnimation() {
      this.$refs.countUpRefs.forEach((el, index) => {
        const stat = this.stats[index];
        const duration = 2000; // 2 Sekunden
        const steps = 60; // Anzahl der Schritte
        const stepDuration = duration / steps;
        let current = 0;
        const increment = stat.value / steps;
        
        const updateCounter = () => {
          current += increment;
          if (current <= stat.value) {
            el.textContent = stat.decimals > 0 
              ? current.toFixed(stat.decimals)
              : Math.round(current);
            setTimeout(updateCounter, stepDuration);
          } else {
            el.textContent = stat.decimals > 0 
              ? stat.value.toFixed(stat.decimals)
              : Math.round(stat.value);
          }
        };
        
        updateCounter();
      });
    }
  }
}
</script>

<style scoped>
.stats-counter {
  padding: 60px 0;
  background: var(--color-light);
}

.counter-number {
  font-size: 48px;
  display: block;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 10px;
  font-family: var(--font-primary);
}

.counters p {
  padding: 0;
  margin: 0 0 20px 0;
  font-size: 15px;
  color: var(--color-default);
}

@media (max-width: 768px) {
  .counter-number {
    font-size: 36px;
  }
  
  .counters p {
    font-size: 14px;
  }
}
</style> 