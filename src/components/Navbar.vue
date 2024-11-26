<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">Home</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a @click.prevent="redirectToDashboard" class="nav-link" href="#" style="cursor: pointer">Dashboard</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/status">Status</router-link>
          </li>
          <!-- Weitere Menüpunkte... -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    redirectToDashboard(event) {
      event.preventDefault();
      const dashboardUrl = import.meta.env.VITE_DASHBOARD_URL;
      if (dashboardUrl) {
        window.open(dashboardUrl, '_blank'); // Öffnet in neuem Tab
        // Oder für gleiches Fenster:
        // window.location.href = dashboardUrl;
      }
    }
  }
}
</script> 