<template>
  <div class="wrapper">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card-group">
          <div class="card p-4">
            <div class="card-body">
              <form v-on:submit.prevent="login">
                <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                <div class="form-group">
                  <label for="email">Email Address</label>
                  <input
                    type="email"
                    v-model="email"
                    class="form-control"
                    name="email"
                    placeholder="Enter Email"
                    autocomplete="off"
                  >
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <div class="input-group mb-3">
                    <input
                      :type="show ? 'text' : 'password'"
                      class="form-control"
                      v-model="password"
                      placeholder="Password"
                      aria-label="Password"
                      aria-describedby="button-addon2"
                      autocomplete="off"
                    >
                    <div class="input-group-append">
                      <button
                        @click="showPassword"
                        class="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                      >
                        <i :class="show ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <button class="btn btn-primary btn-block" type="submit">Login</button>
                  <p class="mt-2">
                    Belum punya akun ?
                    <router-link to="/register">Daftar disini &#128522;.</router-link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <!-- <div class="card text-white bg-argya py-5 d-md d-md-down-none" style="width:44%">
            <div class="card-body"></div>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import router from "../router";
import EvenBus from "./EventBus";

export default {
  data() {
    return {
      email: "",
      password: "",
      show: false
    };
  },

  methods: {
    login() {
      axios
        .post("http://localhost:5000/api/users/login", {
          email: this.email,
          password: this.password
        })
        .then(res => {
          if (res && res.data.error) {
            this.$swal("Error!", res.data.error, "error");
            return;
          }
          localStorage.setItem("usertoken", res.data.token);
          localStorage.setItem(
            "userdata",
            res.data.user ? JSON.stringify(res.data.user) : null
          );
          this.email = "";
          this.password = "";
          console.log("resss", res);
          if (res.data && res.data.user && res.data.user.role !== "patient") {
            this.$router.push({ name: "DashboardAdmin" });
          } else {
            this.$router.push({ name: "LandingPage" });
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.emitMethod();
    },
    emitMethod() {
      EvenBus.$emit("logged-in", "loggedin");
    },
    showPassword() {
      this.show = !this.show;
    },
    goToRegister() {
      this.$router.push("/register");
    }
  }
};
</script>

<style>
.wrapper {
  background-image: url("~@/assets/images/weather.png");
  font-family: Arial, Helvetica, sans-serif;
  padding: 150px;
}

.wrap {
  max-width: 400px;
  border-radius: 50px;
  margin: inherit;
  background: #f0f8ff;
  box-sizing: border-box;
  padding: 30px;
  color: #000000;
  /* margin-top: 200px; */
}

input[type="password"],
input[class="form-control"],
input[type="email"] {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 5px;

  outline: mediumblue;
  border: mediumblue;
  border-bottom: 1px dotted #00ffff;
  color: #000000;
  border-radius: 0px;
  margin: 0px;
  font-weight: bold;
}

input[type="submit"] {
  width: 200%;
  box-sizing: border-box;
  padding: 10px 0;
  margin-top: 30px;
  outline: none;
  border: none;
  background: #0000ff;
  opacity: 0.7;
  border-radius: 20px;
  font-size: 20px;
  color: #8a2be2;
}
input[type="submit"],
button[class="btn btn-outline-secondary"] {
  background: #003366;
  opacity: 0.7;
}
</style>