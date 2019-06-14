<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="light"
      variant="light"
      id="navbar"
      style="height: 60px;padding-left: -150px;"
    >
      <div class="navbar">
        <div>
          <!-- Image and text -->
          <b-navbar variant="faded" type="light">
            <b-navbar-brand href="#">
              <img src="../../../image/logo-1.png" class="d-block" alt="Kitten" style="top:40px;">
              <div class="row">
                <div id="title" style="margin-top: -40px;margin-left: 70px;">Klinik Argya</div>
              </div>
            </b-navbar-brand>
          </b-navbar>
        </div>
        <b-navbar-toggle target="nav_collapse"/>

        <b-collapse is-nav id="nav_collapse" class="justify-content-md-center">
          <b-navbar-nav>
            <b-nav-item>
              <router-link to="/myself" class="dropdown-item" href="#">Tentang Kami</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/myactivity" class="dropdown-item" href="#">Promosi</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/myactivity" class="dropdown-item" href="#">Artikel Kesehatan</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/myactivity" class="dropdown-item" href="#">Kontak</router-link>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import Logo from "../../../image/logo-1.png";

export default {
  name: "navbar"
};
</script>

<style>
</style>


