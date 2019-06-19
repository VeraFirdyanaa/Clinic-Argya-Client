<template>
  <div class="row">
    <div class="col-md-12">
      <h2 class="page-header">Doctors</h2>
      <b-button v-b-modal.modal-form variant="outline-primary" class="mb-2">
        <i class="fa fa-plus"></i>&nbsp;Tambah Doctors
      </b-button>
      <div class="row">
        <div class="col-md-5 offset-md-7">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Find Doctor ..."
              aria-describedby="button-addon2"
              v-model="search"
              autocomplete="false"
            >
          </div>
        </div>
      </div>
      <table class="table table-striped table-hovered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>No. Telp</th>
            <th>Gender</th>
            <th>Specialist</th>
            <th>Email</th>
            <th>rates</th>
            <th>Picture</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(doctor) in doctors" :key="doctor._id">
            <td>{{ doctor.name }}</td>
            <td>{{ doctor.address }}</td>
            <td>{{ doctor.noTelp }}</td>
            <td>{{ doctor.gender }}</td>
            <td>{{ doctor.specialist }}</td>
            <td>{{ doctor.userId.email }}</td>
            <td>{{ doctor.rates | currency }}</td>
            <td>
              <img
                v-if="doctor.picture"
                :src="doctor.picture"
                alt="GAmbar"
                width="100"
                height="100"
              >
            </td>
            <td>
              <b-button-group>
                <b-button size="sm" variant="info" @click="onEdit(doctor)">
                  <i class="fa fa-pencil-alt"></i>&nbsp;Edit
                </b-button>
                <b-button size="sm" variant="danger" @click="onDelete(doctor)">
                  <i class="fa fa-trash"></i>&nbsp;Hapus
                </b-button>
              </b-button-group>
            </td>
          </tr>
        </tbody>
      </table>
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        @change="getDoctors($event)"
        :per-page="perPage"
      ></b-pagination>
    </div>
    <b-modal id="modal-form" title="Form Doctor" @ok="ok()">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              v-model="doctor.name"
              class="form-control"
              name="name"
              v-validate="{ required: true }"
            >
          </div>
          <span class="text-danger">{{ errors.first('name') }}</span>
          <div class="form-group">
            <label for="address">Address</label>
            <textarea
              name="address"
              v-model="doctor.address"
              class="form-control"
              v-validate="{ required: true }"
            ></textarea>
          </div>
          <span class="text-danger">{{ errors.first('address') }}</span>
          <div class="form-group">
            <label for="noTelp">No. Telpon</label>
            <input
              type="text"
              v-model="doctor.noTelp"
              class="form-control"
              name="noTelp"
              v-validate="{ required: true }"
            >
          </div>
          <span class="text-danger">{{ errors.first('noTelp') }}</span>
          <div class="form-group">
            <label for="specialist">Specialist</label>
            <input
              type="text"
              v-model="doctor.specialist"
              class="form-control"
              name="specialist"
              v-validate="{ required: true }"
            >
          </div>
          <span class="text-danger">{{ errors.first('specialist') }}</span>
          <div class="form-group">
            <label for="name">Gender</label>
            <select name="gender" v-model="doctor.gender" class="form-control">
              <option value="Pria">Pria</option>
              <option value="Wanita">Wanita</option>
            </select>
          </div>
          <div class="form-group">
            <label for="rates">Rates</label>
            <input
              type="number"
              v-model="doctor.rates"
              class="form-control"
              name="rates"
              v-validate="{ required: true }"
            >
            <span class="text-danger">{{ errors.first('rates') }}</span>
          </div>
          <div class="form-group">
            <label for="picture">Picture</label>
            <img
              v-if="editing && picture"
              :src="picture"
              alt="Gambar lama"
              width="300"
              height="300"
            >
            <picture-input
              ref="pictureInput"
              width="300"
              height="300"
              margin="16"
              accept="image/jpeg, image/png"
              size="10"
              button-class="btn btn-primary"
              :custom-strings="{
                      upload: '<h1>Bummer!</h1>',
                      drag: 'Drag a 😺 Image'
                    }"
              @change="onChange"
            ></picture-input>
          </div>
          <div v-if="!editing">
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                v-model="doctor.email"
                name="email"
                class="form-control"
                v-validate="{ required: true, email: true }"
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
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import PictureInput from "vue-picture-input";
import UploadImage from 'vue-upload-image';

export default {
  components: {
    PictureInput
  },
  data() {
    return {
      editing: false,
      doctors: [],
      _id: null,
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      search: "",
      picture: null,
      doctor: {
        name: null,
        address: null,
        noTelp: null,
        rates: 0,
        gender: null,
        specialist: null,
        email: null,
        password: null
      },
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
    }, 500),
    search: _.debounce(function(val) {
      this.getDoctors(1);
    }, 500)
  },
  created() {
    this.search = "";
  },
  mounted() {
    this.getDoctors(this.currentPage);
    this.$root.$on("bv::modal::hide", (bvEvent, modalId) => {
      this.onReset();
    });
  },
  methods: {
    getDoctors(page) {
      fetch(
        "http://localhost:5000/api/doctors?page=" +
          page +
          "&limit=" +
          this.perPage +
          "&name=" +
          this.search
      )
        .then(res => res.json())
        .then(res => {
          this.doctors = res.doctors;
          this.totalRows = res.total;
        })
        .catch(err => {
          console.log("an error occured", err.response);
        });
    },
    onChange(image) {
      if (this.$refs.pictureInput.file) {
        this.picture = this.$refs.pictureInput.file;
      } else {
        console.log("Old browser. No support for Filereader API");
      }
    },
    ok() {
      this.doctor.password = this.password;
      let fd = new FormData();
      fd.append("name", this.doctor.name);
      fd.append("address", this.doctor.address);
      fd.append("noTelp", this.doctor.noTelp);
      fd.append("rates", this.doctor.rates);
      fd.append("gender", this.doctor.gender);
      fd.append("specialist", this.doctor.specialist);
      fd.append("email", this.doctor.email);
      fd.append("password", this.doctor.password);
      fd.append("picture", this.picture);
      if (this.editing) {
        fetch("http://localhost:5000/api/doctors/" + this._id, {
          method: "PUT",
          headers: {
            // "Content-Type": "multipart/form-data"
          },
          body: fd
        })
          .then(res => res.json())
          .then(res => {
            if (res && res.doctor._id) {
              this.onReset();
              this.getDoctors();
              alert("Sukses Menyimpan Doctor!");
            } else {
              alert("Gagal Menyimpan!");
            }
          })
          .catch(err => console.log("an error occured", err.response));
      } else {
        fetch("http://localhost:5000/api/doctors", {
          method: "POST",
          headers: {
            // "Content-Type": "multipart/form-data"
          },
          body: fd
        })
          .then(res => res.json())
          .then(res => {
            if (res && res._id) {
              this.onReset();
              this.getDoctors();
              alert("Sukses Menyimpan Doctor!");
            } else {
              alert("Gagal Menyimpan!");
            }
          })
          .catch(err => console.log("an error occured", err.response));
      }
    },
    onEdit(doctor) {
      fetch("http://localhost:5000/api/doctors/" + doctor._id)
        .then(res => res.json())
        .then(res => {
          this.editing = true;
          this.doctor = res;
          this._id = res._id;
          this.$bvModal.show("modal-form");
        })
        .catch(err => {
          console.log(err);
        });
    },
    onReset() {
      this.editing = false;
      this._id = null;
      this.doctor = {
        name: null,
        address: null,
        noTelp: null,
        rates: 0,
        gender: null,
        specialist: null,
        email: null,
        password: null
      };
    },
    onDelete(doctor) {
      this.$swal({
        title: `Are you sure want to delete dr. ${doctor.name}?`,
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !this.$swal.isLoading()
      }).then(result => {
        if (result.value) {
          fetch("http://localhost:5000/api/doctors/" + doctor._id, {
            method: "DELETE"
          })
            .then(res => res.json)
            .then(res => {
              this.getDoctors();
              this.$swal("Deleted!", "Your file has been deleted.", "success");
            })
            .catch(err => {
              this.$swal.showValidationMessage(
                `Request Failed: ${err.response}`
              );
            });
        }
      });
    },
    showPassword() {
      this.show = !this.show;
    }
  }
};
</script>

<style scoped>
ul,
li {
  list-style: none;
}
</style>
