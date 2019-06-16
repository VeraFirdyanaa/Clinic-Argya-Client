<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light" class="fixed-top">
      <b-navbar-brand href="#">
        <img
          id="logo-navbar"
          src="../../../assets/logo/logo navbar klinik argya.png"
          alt="klinik-argya"
          class="ml-lg-5 ml-md-3 ml-sm-2 ml-xs-1 my-0"
        >
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto mr-lg-5">
          <b-button @click="goToLogin" id="bottonLogIn" v-if="!isLoggedIn">Log In</b-button>
          <b-button @click="logout" id="bottonLogIn" v-if="isLoggedIn">Log Out</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {
      isLoggedIn: localStorage.getItem("usertoken") ? true : false
    };
  },
  methods: {
    goToLogin() {
      this.$router.push({ name: "Login" });
    },
    logout() {
      localStorage.removeItem("usertoken");
      localStorage.removeItem("userdata");
      this.$router.push({ name: "Login" });
    }
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
    }
  }
};
</script>
<style scoped>
/* select link pada navbar berdasarkan class dari bootstrap */
/* customize link info */
.navbar-light .navbar-nav #linkInfo .nav-link {
  color: #569d44;
  text-transform: uppercase;
  font: 22px arial, sans-serif;
  text-align: center;
  font-weight: bold;
  letter-spacing: 2px;
  padding: 20px 25px;
}
/* select link pada navbar berdasarkan class dari bootstrap */
/* customize hover link info */
.navbar-light .navbar-nav #linkInfo .nav-link:hover {
  text-align: center;
  color: #fcf8fb;
  background-color: #62a93f;
  min-height: 60px;
}
/* select navbar berdasrkan class dari bootstrap */
/* customize navbar */
.navbar {
  min-height: 60px;
  padding: 0px;
  background-color: #fcf8fb !important;
}

/* select button pada navbar berdasarkan class dari bootstrap */
/* customize button log in */
.navbar-light .navbar-nav #bottonLogIn {
  padding: 20px 25px;
  font: 22px arial, sans-serif;
  color: #569d44;
  text-transform: uppercase;
  text-align: center;
  background-color: #fcf8fb;
  letter-spacing: 2px;
  min-height: 60px;
  border: 0px;
  border-radius: 0px;
  font-weight: bold;
}
/* select button pada navbar berdasarkan class dari bootstrap */
/* customize hover button log in */
.navbar-light .navbar-nav #bottonLogIn:hover {
  color: #fcf8fb;
  background-color: #62a93f;
}
</style>



