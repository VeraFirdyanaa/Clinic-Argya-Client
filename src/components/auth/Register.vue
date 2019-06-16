<template>
  <div class="wrapper">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card-group">
          <div class="card p-4">
            <div class="card-body">
              <form v-on:submit.prevent="register">
                <div class="text-center img-block mb-2">
                  <img
                    src="~@/assets/images/logo.jpeg"
                    class="text-center"
                    width="250px"
                    height="250px"
                  >
                </div>
                <h1 class="h3 mb-3 font-weight-normal">Register</h1>
                <div class="form-group">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    v-model="name"
                    class="form-control"
                    name="name"
                    v-validate="{ required: true }"
                    placeholder="Enter Name"
                    autocomplete="off"
                  >
                  <span class="text-danger">{{ errors.first('name') }}</span>
                </div>
                <div class="form-group">
                  <label for="job">Job</label>
                  <input
                    type="text"
                    v-model="job"
                    class="form-control"
                    name="job"
                    v-validate="{ required: true }"
                    placeholder="Enter Job"
                    autocomplete="off"
                  >
                  <span class="text-danger">{{ errors.first('job') }}</span>
                </div>
                <div class="form-group">
                  <label for="address">Address</label>
                  <textarea
                    v-model="address"
                    v-validate="{ required: true }"
                    class="form-control"
                    name="address"
                    autocomplete="off"
                  ></textarea>
                  <span class="text-danger">{{ errors.first('address') }}</span>
                </div>
                <div class="form-group">
                  <label for="no_telp">No Telp</label>
                  <input
                    type="text"
                    v-model="no_telp"
                    class="form-control"
                    autocomplete="off"
                    name="no_telp"
                    v-validate="{ required: true, numeric: true }"
                    placeholder="Enter Number Telelphone"
                  >
                  <span
                    class="text-danger"
                    v-for="(error, index) in errors.collect('no_telp')"
                    :key="index"
                  >{{ error }}</span>
                </div>
                <div class="form-group">
                  <label for="gender">Gender</label>
                  <select
                    class="form-control"
                    v-model="gender"
                    name="gender"
                    v-validate="{ required: true }"
                    autocomplete="off"
                    id="inlineFormCustomSelect"
                  >
                    <option value="Pria">Pria</option>
                    <option value="Wanita">Wanita</option>
                  </select>
                  <span class="text-danger">{{ errors.first('gender') }}</span>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="pob">Place of Birth</label>
                      <input
                        type="text"
                        name="pob"
                        v-model="pob"
                        v-validate="{ required: true }"
                        autocomplete="off"
                        class="form-control"
                      >
                      <span class="text-danger">{{ errors.first('pob') }}</span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="dob">Date of Birth</label>
                      <datepicker
                        name="dob"
                        v-model="dob"
                        v-validate="{ required: true }"
                        input-class="form-control"
                        autocomplete="off"
                      ></datepicker>
                      <span class="text-danger">{{ errors.first('dob') }}</span>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="age">Age</label>
                  <input
                    type="text"
                    v-model="age"
                    class="form-control"
                    name="age"
                    v-validate="{ required: true }"
                    placeholder="Enter Age"
                    autocomplete="off"
                  >
                  <span class="text-danger">{{ errors.first('age') }}</span>
                </div>

                <div class="form-group">
                  <label for="email">Email Address</label>
                  <input
                    type="email"
                    v-model="email"
                    class="form-control"
                    name="email"
                    v-validate="{ required: true, email: true }"
                    placeholder="Enter Email"
                    autocomplete="off"
                  >
                  <span
                    class="text-danger"
                    v-for="(error, index) in errors.collect('email')"
                    :key="index"
                  >{{ error }}</span>
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <div class="input-group mb-3">
                    <input
                      :type="show ? 'text' : 'password'"
                      class="form-control"
                      v-model="password"
                      name="password"
                      placeholder="Password"
                      aria-label="Enter a Password"
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
                  <ul>
                    <li
                      class="text-danger mt-1"
                      v-for="(error, index) in Object.keys(passwordErrors)"
                      :key="index"
                    >{{ passwordErrors[error].isError ? passwordErrors[error].errMessage : null }}</li>
                  </ul>
                </div>
                <button class="btn btn-lg btn-info btn-block" type="submit">Register</button>
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
import Datepicker from "vuejs-datepicker";
import _ from "lodash";
//import router from "../router";

export default {
  components: {
    Datepicker
  },
  data() {
    return {
      name: "",
      job: "",
      address: "",
      no_telp: "",
      gender: "",
      pob: "",
      dob: "",
      age: null,
      email: "",
      password: "",
      show: false,
      passwordErrors: {
        ALPHA_NUMERIC_DASH: {
          errMessage:
            "Password must contain an 1 Uppercase, 1 Lowercase and must contain alphabet , numeric and symbols e.g @!_#*$%&",
          isError: false
        },
        MAX_8: {
          errMessage: "Minimum length of password is 8",
          isError: false
        }
      }
    };
  },
  watch: {
    password: _.debounce(function(val) {
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_!@#\$%\^&\*])/.test(val)) {
        console.log("[IS-ERROR] alpha numeric is false");
        this.passwordErrors["ALPHA_NUMERIC_DASH"].isError = false;
      } else {
        console.log("[IS-ERROR] alpha numeric is true");
        this.passwordErrors["ALPHA_NUMERIC_DASH"].isError = true;
      }

      if (/^(?=.{8,})/.test(val)) {
        console.log("[IS-ERROR] max_8 is false");
        this.passwordErrors["MAX_8"].isError = false;
      } else {
        console.log("[IS-ERROR] max_8 is true");
        this.passwordErrors["MAX_8"].isError = true;
      }
    }, 500)
  },
  methods: {
    register() {
      axios
        .post("http://localhost:5000/api/patients", {
          name: this.name,
          job: this.job,
          address: this.address,
          noTelp: this.no_telp,
          gender: this.gender,
          pob: this.pob,
          dob: this.dob,
          age: this.age,
          email: this.email,
          password: this.password
        })
        .then(res => {
          this.$router.push({ name: "Login" });
        })
        .catch(err => {
          console.log(err.response);
          let resp = err && err.response ? err.response.data : null;
          if (resp && resp.name === "MongoError") {
            alert(resp.errmsg);
          }

          if (resp && resp.name === "ValidationError") {
            alert(resp.message);
          }
        });
    },
    showPassword() {
      this.show = !this.show;
    }
  }
};
</script>

<style>
.wrapper {
  background-image: url("~@/assets/images/weather.png");
  font-family: Arial, Helvetica, sans-serif;
  padding: 100px;
}

.bg-argya {
  background-image: url("~@/assets/images/sunat.jpg");
  background-size: contain;
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

.datepicker form {
  text-align: center;
}
input[type="text"],
input[type="password"],
textarea[class="form-control"],
select[class="form-control"],
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
ul,
li {
  list-style: none;
}
</style>