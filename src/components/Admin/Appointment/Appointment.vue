<template>
  <div class="row">
    <div class="col-md-12">
      <h2 class="page-header">Appointments</h2>
      <!-- <b-button v-b-modal.modal-form variant="outline-primary" class="mb-2">
        <i class="fa fa-plus"></i>&nbsp;Tambah Appointments
      </b-button>-->
      <div class="row">
        <div class="col-md-5 offset-md-7">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Find Appointment Code ..."
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
            <th>Code</th>
            <th>Arrival Time</th>
            <th>Patient</th>
            <th>Has Come ?</th>
            <th>Medical Record</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(appointment) in appointments" :key="appointment._id">
            <td>{{ appointment.code }}</td>
            <td>{{ appointment.timeCome | moment("dddd, MMMM do YYYY") }}</td>
            <td>{{ appointment.patient ? appointment.patient.name : '-' }}</td>
            <td>
              <span v-if="!appointment.hasCome">
                <b-button @click="setCheckIn(appointment)" variant="success" size="sm">Check In</b-button>
              </span>
              <span v-if="appointment.hasCome" class="text-success">Sudah Datang</span>
            </td>
            <td>
              <span v-if="appointment.medicalRecord">
                <router-link
                  class="btn btn-danger btn-sm"
                  :to="'/dashboard/medical-records/'+ appointment.medicalRecord"
                >
                  <i class="fa fa-eye"></i>&nbsp;Cek Medical Record
                </router-link>
              </span>
              <span v-if="!appointment.medicalRecord">Belum Ada!</span>
            </td>
            <td>{{ appointment.timeQueue | moment("dddd, MMMM do YYYY") }}</td>
            <td>
              <b-button-group>
                <b-button
                  size="sm"
                  variant="info"
                  @click="startProcedure(appointment)"
                  :disabled="appointment.medicalRecord ? true : false"
                >
                  <i class="fa fa-pencil-alt"></i>&nbsp;Start Treatment Procedure
                </b-button>
                <!-- <b-button size="sm" variant="danger" @click="onDelete(appointment)">
                  <i class="fa fa-trash"></i>&nbsp;Hapus
                </b-button>-->
              </b-button-group>
            </td>
          </tr>
        </tbody>
      </table>
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        @change="getAppointments($event)"
        :per-page="perPage"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import _ from "lodash";

export default {
  components: {
    Datepicker
  },
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      editing: false,
      appointments: [],
      _id: null,
      search: "",
      appointment: {
        name: null,
        address: null,
        noTelp: null,
        age: 0,
        gender: null,
        pob: null,
        dob: null,
        email: null,
        password: null
      }
    };
  },
  watch: {
    search: _.debounce(function(val) {
      this.getAppointments(1);
    }, 500)
  },
  mounted() {
    console.log(process.env.VUE_APP_SERVER_URL);
    this.getAppointments(this.currentPage);
  },
  methods: {
    getAppointments(page) {
      console.log(page);
      fetch(
        "http://localhost:5000/api/queues?page=" +
          page +
          "&limit=" +
          this.perPage +
          "&code=" +
          this.search
      )
        .then(res => res.json())
        .then(res => {
          this.appointments = res.queues;
          this.totalRows = res.total;
        })
        .catch(err => {
          console.log("an error occured", err.response);
        });
    },
    startProcedure(appointment) {
      this.$router.push({
        name: "Procedure",
        params: { id: appointment.code, _mongoID: appointment._id }
      });
    },
    setCheckIn(appointment) {
      this.$swal({
        title: `Are you sure want to check this patient has come ?`,
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, save it!",
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !this.$swal.isLoading()
      }).then(result => {
        if (result.value) {
          fetch("http://localhost:5000/api/queues/checkIn/" + appointment._id, {
            method: "PUT"
          })
            .then(res => res.json)
            .then(res => {
              this.getAppointments();
              this.$swal(
                "Saved!",
                res.message ? res.message : "Appointment Saved!",
                "success"
              );
            })
            .catch(err => {
              this.$swal.showValidationMessage(
                `Request Failed: ${err.response}`
              );
            });
        }
      });
    },
    onReset() {
      this.editing = false;
      this._id = null;
      this.appointment = {
        name: null,
        address: null,
        noTelp: null,
        age: 0,
        gender: null,
        pob: null,
        dob: null,
        email: null,
        password: null
      };
    },
    onDelete(appointment) {
      this.$swal({
        title: `Are you sure want to delete ${appointment.name}?`,
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
          fetch("http://localhost:5000/api/queues/" + appointment._id, {
            method: "DELETE"
          })
            .then(res => res.json)
            .then(res => {
              this.getAppointments();
              this.$swal("!", "Your file has been deleted.", "success");
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
