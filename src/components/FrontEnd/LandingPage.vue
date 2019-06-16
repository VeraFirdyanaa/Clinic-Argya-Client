<template>
  <div>
    <!-- layout and grid -->
    <b-container fluid>
      <div class="row kolom">
        <div class="col-md-12">
          <b-jumbotron>
            <template slot="header">Klinik Argya</template>

            <template slot="lead">
              <h2>Real Care Health Clinic</h2>
            </template>
          </b-jumbotron>
        </div>
      </div>
      <b-row>
        <b-col cols="12" md="12" lg="12" class="mb-5 mt-5">
          <div class="row">
            <div class="col-md-10 offset-md-1">
              <div class="card-group">
                <div class="card p-4 kolom">
                  <div class="card-body">
                    <h2 class="text-center text-white">Opening Hours</h2>
                    <div class="my-mt">
                      <div class="row mt-5 pl-2 pr-2">
                        <div class="col-md-6 text-white my-hr">Monday-Friday</div>
                        <div class="col-md-6 text-white my-hr">5.00 pm - 9.00 pm</div>
                      </div>
                      <div class="row mt-5 pl-2 pr-2">
                        <div class="col-md-6 text-white my-hr">Saturday</div>
                        <div class="col-md-6 text-white my-hr">9.00 am - 9.00 pm</div>
                      </div>
                      <div class="row mt-5 pl-2 pr-2">
                        <div class="col-md-6 text-white my-hr">Sunday</div>
                        <div class="col-md-6 text-white my-hr">9.00 am - 5.00 pm</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card p-2">
                  <div class="card-body">
                    <h2 class="text-center text-appointment">Appointment</h2>
                    <VueCtkDateTimePicker
                      v-model="timeCome"
                      inline
                      color="#62a93f"
                      button-color="#62a93f"
                    ></VueCtkDateTimePicker>
                    <div class="text-center">
                      <b-button variant="outline-success" size="lg" @click="onBooking">Book Now!</b-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <!-- carousel -->
        <b-col cols="12" md="8" lg="8" class="kolom">
          <div class="p-4">
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src="@/assets/images/klinik-argya-01.png" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                  <img src="@/assets/images/klinik-argya-02.png" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                  <img src="@/assets/images/klinik-argya-03.png" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                  <img src="@/assets/images/sunat.jpg" class="d-block w-100" alt="...">
                </div>
              </div>
              <a
                class="carousel-control-prev"
                href="#carouselExampleControls"
                role="button"
                data-slide="prev"
              >
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a
                class="carousel-control-next"
                href="#carouselExampleControls"
                role="button"
                data-slide="next"
              >
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          </div>
        </b-col>
        <!-- alamat, sosmed -->
        <b-col cols="12" md="4" lg="4" class="kolom d-flex flex-column justify-content-center">
          <b-row>
            <!-- alamat -->
            <b-col cols="12" class="mb-lg-4 mb-md-4 mb-sm-3 mb-2">
              <b-row>
                <b-col
                  cols="2"
                  md="2"
                  lg="2"
                  class="d-flex flex-column align-self-center text-center"
                >
                  <i class="fa fa-map-signs text-white fa-lg" aria-hidden="true"></i>
                </b-col>
                <b-col cols="10" md="10" lg="10" class="d-flex flex-column align-self-center">
                  <b-link
                    class="my-link"
                  >Jl. Mutiara Gading City, Babelan Kota, Kec. Babelan, Bekasi, Jawa Barat 17610</b-link>
                </b-col>
              </b-row>
            </b-col>
            <!-- facebook -->
            <b-col cols="12" class="my-lg-4 my-md-4 my-sm-3 my-2">
              <b-row>
                <b-col
                  cols="2"
                  md="2"
                  lg="2"
                  class="d-flex flex-column align-self-center text-center"
                >
                  <i class="fab fa-facebook text-white fa-lg"></i>
                </b-col>
                <b-col cols="10" md="10" lg="10" class="d-flex flex-column align-self-center">
                  <b-link class="my-link">Klinik Argya</b-link>
                </b-col>
              </b-row>
            </b-col>
            <!-- instagram -->
            <b-col cols="12" class="my-lg-4 my-md-4 my-sm-3 my-2">
              <b-row>
                <b-col
                  cols="2"
                  md="2"
                  lg="2"
                  class="d-flex flex-column align-self-center text-center"
                >
                  <i class="fab fa-instagram text-white fa-lg"></i>
                </b-col>
                <b-col cols="10" md="10" lg="10" class="d-flex flex-column align-self-center">
                  <b-link class="my-link">@klinikargya</b-link>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyFooter from "./Footer";

export default {
  components: {
    "my-footer": MyFooter
  },
  name: "LandingPage",
  data() {
    return {
      timeCome: null
    };
  },
  mounted() {
    console.log(this.formatDate());
  },
  methods: {
    formatDate() {
      var date = new Date(); //Using this we can convert any date format to JS Date

      var mm = date.getMonth() + 1; // getMonth() is zero-based

      var dd = date.getDate();

      if (mm < 10) {
        mm = "0" + mm;
      }
      if (dd < 10) {
        dd = "0" + dd;
      }
      return [date.getFullYear(), mm, dd].join("/"); // padding
    },
    onBooking() {
      let token = localStorage.getItem("usertoken");
      let userData = localStorage.getItem("userdata")
        ? JSON.parse(localStorage.getItem("userdata"))
        : null;
      if (!token) {
        this.$router.push({ name: "Login" });
      } else {
        if (this.timeCome) {
          this.$swal({
            title: "Are you sure?",
            text: "You will book an appointment for this day.",
            type: "info",
            showCancelButton: true,
            confirmButtonText: "Yes!",
            cancelButtonText: "No"
          }).then(result => {
            if (result.value) {
              fetch("http://localhost:5000/api/queues", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  timeCome: this.timeCome,
                  patient: userData ? userData.patient._id : null
                })
              })
                .then(res => res.json())
                .then(res => {
                  if (res && res._id) {
                    this.$swal(
                      "Sukses!",
                      "Berhasil Membuat Janji Konsultasi!",
                      "success"
                    );
                  } else {
                    this.$swal(
                      "Oopss..!",
                      "Gagal Membuat Janji Konsultasi!",
                      "error"
                    );
                  }
                })
                .catch(err => {
                  console.log("err", err);
                });
            }
          });
        } else {
          this.$swal("Oopps..!", "Please select date appointment!", "warning");
        }
      }
    }
  }
};
</script>

<style scoped>
.jumbotron {
  /* margin-top: 9vh; */
  background-color: #62a93f;
  color: #fcf8fb;
}

#carousel-1 {
  margin: 8vh 5vh;
}
.kolom {
  background-color: #62a93f;
}
#my-map {
  color: #fcf8fb;
}
#my-map:hover {
  color: #222222;
}

#my-twitter {
  color: #fcf8fb;
}
#my-twitter:hover {
  color: #222222;
}
#my-instagram {
  color: #fcf8fb;
}
#my-instagram:hover {
  color: #222222;
}

.my-link:link {
  color: #fcf8fb;
  text-decoration: none;
}
.my-link:visited {
  color: #fcf8fb;
  text-decoration: none;
}
.my-link:hover {
  color: #222222;
}
.text-appointment {
  color: #569d44;
}
.my-mt {
  margin-top: 5rem;
}
.my-hr {
  border-bottom: 1px dashed;
}
</style>
