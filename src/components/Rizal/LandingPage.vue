<template>
  <div>
    <!-- jumbotron -->
    <b-jumbotron class="mb-0 mb-lg-5 mb-md-3">
      <template slot="header">Welcome</template>

      <template slot="lead">Welcome to Klinik Argya Web Application.</template>

      <hr class="my-4">

      <p>
        Klik Info untuk informasi tentang web app ini,
        atau Log-In untuk langsung menggunakan service dari web app ini.
      </p>
    </b-jumbotron>
    <!-- layout and grid -->
    <b-container fluid>
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
            <!-- <b-carousel id="carousel-1" :interval="4000" controls indicators>
              <b-carousel-slide img-src="@/assets/images/klinik-argya-01.png" img-alt="gambar-01"></b-carousel-slide>

              <b-carousel-slide img-src="@/assets/images/klinik-argya-02.png" img-alt="gambar-02"></b-carousel-slide>

              <b-carousel-slide img-src="@/assets/images/klinik-argya-03.png" img-alt="gambar-03"></b-carousel-slide>
            </b-carousel>-->
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
                  <b-link href="#foo">
                    <font-awesome-icon id="my-map" icon="map-marked-alt" size="2x"/>
                  </b-link>
                </b-col>
                <b-col cols="10" md="10" lg="10" class="d-flex flex-column align-self-center">
                  <b-link
                    class="my-link"
                  >Jl. Mutiara Gading City, Babelan Kota, Kec. Babelan, Bekasi, Jawa Barat 17610</b-link>
                </b-col>
              </b-row>
            </b-col>
            <!-- twitter -->
            <b-col cols="12" class="my-lg-4 my-md-4 my-sm-3 my-2">
              <b-row>
                <b-col
                  cols="2"
                  md="2"
                  lg="2"
                  class="d-flex flex-column align-self-center text-center"
                >
                  <b-link href="#">
                    <font-awesome-icon id="my-twitter" icon="twitter" size="2x"/>
                  </b-link>
                </b-col>
                <b-col cols="10" md="10" lg="10" class="d-flex flex-column align-self-center">
                  <b-link class="my-link">@Lorem</b-link>
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
                  <b-link href="#">
                    <!-- <font-awesome-icon id="my-instagram" icon="instagram" size="2x"/> -->
                  </b-link>
                </b-col>
                <b-col cols="10" md="10" lg="10" class="d-flex flex-column align-self-center">
                  <b-link class="my-link">@LoremIpsum</b-link>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" md="12" lg="12" class="mb-5 mt-5">
          <h2 class="text-center text-appointment">Appointment</h2>
          <div class="col-md-8 offset-md-2 mb-3 mt-3">
            <VueCtkDateTimePicker v-model="timeCome" inline color="#62a93f" button-color="#62a93f"></VueCtkDateTimePicker>
            <div class="text-center">
              <b-button variant="outline-success" size="lg" @click="onBooking">Book Now!</b-button>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
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
  margin-top: 9vh;
  background-color: #62a93f;
  color: #fcf8fb;
  border-radius: 0px;
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
</style>
