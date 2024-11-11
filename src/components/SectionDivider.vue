<template>
  <div class="section-divider" :class="type">
    <div class="divider-line"></div>
  </div>
</template>

<script>
export default {
  name: 'SectionDivider',
  props: {
    type: {
      type: String,
      default: 'default',
      validator: value => ['default', 'reverse', 'gradient'].includes(value)
    }
  }
}
</script>

<style scoped>
.section-divider {
  position: relative;
  height: 2px;
  margin: 60px 0;
  background: transparent;
}

.divider-line {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 2px;
  background: var(--gradient-primary);
  border-radius: 2px;
}

.reverse .divider-line {
  background: var(--color-light);
}

.gradient .divider-line {
  width: 120px;
  background: linear-gradient(90deg, 
    transparent,
    var(--color-primary),
    var(--color-secondary),
    var(--color-primary),
    transparent
  );
}

@media (max-width: 768px) {
  .section-divider {
    margin: 40px 0;
  }
  
  .divider-line {
    width: 60px;
  }
  
  .gradient .divider-line {
    width: 90px;
  }
}
</style> 