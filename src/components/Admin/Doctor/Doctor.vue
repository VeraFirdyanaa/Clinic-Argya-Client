<template>
  <div class="row">
    <div class="col-md-12">
      <h2 class="page-header">Doctors</h2>
      <b-button v-b-modal.modal-form variant="outline-primary" class="mb-2">
        <i class="fa fa-plus"></i>&nbsp;Tambah Doctors
      </b-button>
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
            <td>{{ doctor.rates }}</td>
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
          <div v-if="!editing">
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                v-model="doctor.email"
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
              <input type="password" v-model="doctor.password" class="form-control">
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editing: false,
      doctors: [],
      _id: null,
      doctor: {
        name: null,
        address: null,
        noTelp: null,
        rates: 0,
        gender: null,
        specialist: null,
        email: null,
        password: null
      }
    };
  },
  mounted() {
    this.getDoctors();
    this.$root.$on("bv::modal::hide", (bvEvent, modalId) => {
      this.onReset();
    });
  },
  methods: {
    getDoctors() {
      fetch("http://localhost:5000/api/doctors")
        .then(res => res.json())
        .then(res => {
          this.doctors = res.doctors;
        })
        .catch(err => {
          console.log("an error occured", err.response);
        });
    },
    ok() {
      if (this.editing) {
        fetch("http://localhost:5000/api/doctors/" + this._id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.doctor)
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
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.doctor)
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
    }
  }
};
</script>

<style>
</style>
