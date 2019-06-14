<template>
  <div id="myPage">
    <navbar></navbar>
    <div id="wrapper">
      <!-- Sidebar -->
      <ul class="sidebar navbar-nav">
        <li class="nav-item active">
          <router-link to="/dashboard" class="nav-link">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </router-link>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="pagesDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-fw fa-folder"></i>
            <span>Master Data</span>
          </a>
          <div class="dropdown-menu" aria-labelledby="pagesDropdown">
            <!-- <h6 class="dropdown-header">Login Screens:</h6> -->
            <router-link to="/dashboard/doctors" class="dropdown-item">Doctors</router-link>
            <router-link to="/dashboard/nurses" class="dropdown-item">Nurses</router-link>
            <router-link to="/dashboard/patients" class="dropdown-item">Patients</router-link>
            <router-link to="/dashboard/medicines" class="dropdown-item">Medicines</router-link>
          </div>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/appointments" class="nav-link">
            <i class="fas fa-fw fa-chart-area"></i>
            <span>Appointments</span>
          </router-link>
        </li>
      </ul>

      <div id="content-wrapper">
        <div class="container-fluid">
          <!-- Breadcrumbs-->
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Dashboard</a>
            </li>
            <li class="breadcrumb-item active">Overview</li>
          </ol>
        </div>
        <div class="container-fluid">
          <router-view/>
        </div>
      </div>
      <!-- /.container-fluid -->

      <!-- Sticky Footer -->
      <footer class="sticky-footer">
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span>Copyright © Your Website 2019</span>
          </div>
        </div>
      </footer>
    </div>
    <!-- /.content-wrapper -->
  </div>
</template>

<script>
// import Navbar from "@/components/ui/navbar";
import Navbar from "@/components/Admin/Navbar";

export default {
  name: "DashboardWrapper",
  components: {
    navbar: Navbar
  }
};
</script>

<style>
</style>
