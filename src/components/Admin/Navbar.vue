<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark static-top">
    <a class="navbar-brand mr-1" href="index.html">Klinik Argya</a>

    <button class="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" href="#">
      <i class="fas fa-bars"></i>
    </button>

    <!-- Navbar Search -->
    <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
      <!-- <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Search for..."
          aria-label="Search"
          aria-describedby="basic-addon2"
        >
        <div class="input-group-append">
          <button class="btn btn-primary" type="button">
            <i class="fas fa-search"></i>
          </button>
      </div>-->
    </form>

    <!-- Navbar -->
    <ul class="navbar-nav ml-auto ml-md-0">
      <li class="nav-item dropdown no-arrow">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="userDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i class="fas fa-user-circle fa-fw"></i>
          &nbsp; {{ profile && profile.name ? (role ? 'dr. ' : null) + profile.name : null }}
        </a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
          <a
            class="dropdown-item"
            href="#"
          >Specialist: {{ profile && profile.name ? profile.specialist : null}}</a>
          <div class="dropdown-divider"></div>
          <a
            class="dropdown-item"
            @click="logout"
            href="#"
            data-toggle="modal"
            data-target="#logoutModal"
          >Logout</a>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      profile: {},
      role: null
    };
  },
  mounted() {
    let userData = localStorage.getItem("userdata")
      ? JSON.parse(localStorage.getItem("userdata"))
      : null;
    if (userData) {
      switch (userData.role) {
        case "doctor":
          this.profile = userData.doctor;
          this.role = "doctor";
          break;
        case "patient":
          this.profile = userData.patient;
          this.role = "patient";
          break;
        default:
          this.profile = userData.nurse;
          this.role = "nurse";
      }
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("usertoken");
      localStorage.removeItem("userdata");
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style>
</style>
