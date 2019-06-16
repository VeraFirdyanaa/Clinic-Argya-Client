<template>
  <div class="row">
    <div class="col-md-12">
      <h2 class="page-header">Patients</h2>
      <b-button v-b-modal.modal-form variant="outline-primary" class="mb-2">
        <i class="fa fa-plus"></i>&nbsp;Tambah Patients
      </b-button>
      <div class="row">
        <div class="col-md-5 offset-md-7">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Find Patient ..."
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
            <th>Job</th>
            <th>Address</th>
            <th>No. Telp</th>
            <th>Gender</th>
            <th>Place of Birth</th>
            <th>Date of Birth</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(patient) in patients" :key="patient._id">
            <td>{{ patient.name }}</td>
            <td>{{ patient.job }}</td>
            <td>{{ patient.address }}</td>
            <td>{{ patient.noTelp }}</td>
            <td>{{ patient.gender }}</td>
            <td>{{ patient.pob }}</td>
            <td>{{ patient.dob | moment("dddd, MMMM do YYYY") }}</td>
            <td>{{ patient.age }}</td>
          </tr>
        </tbody>
      </table>
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        @change="getPatients($event)"
        :per-page="perPage"
      ></b-pagination>
    </div>
    <b-modal id="modal-form" title="Form Patient" @ok="ok()">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" v-model="patient.name" class="form-control">
          </div>
          <div class="form-group">
            <label for="address">Address</label>
            <textarea name="address" v-model="patient.address" class="form-control"></textarea>
          </div>
          <div class="form-group">
            <label for="noTelp">No. Telpon</label>
            <input type="text" v-model="patient.noTelp" class="form-control">
          </div>
          <div class="form-group">
            <label for="job">Job</label>
            <input type="text" v-model="patient.job" class="form-control">
          </div>
          <div class="form-group">
            <label for="name">Gender</label>
            <select name="gender" v-model="patient.gender" class="form-control">
              <option value="Pria">Pria</option>
              <option value="Wanita">Wanita</option>
            </select>
          </div>
          <div class="form-group">
            <label for="age">Age</label>
            <input type="number" v-model="patient.age" class="form-control">
          </div>
          <div class="form-group">
            <label for="pob">Place of Birth</label>
            <input type="text" v-model="patient.pob" class="form-control">
          </div>
          <div class="form-group">
            <label for="dob">Date of Birth</label>
            <datepicker
              name="dob"
              v-model="patient.dob"
              v-validate="{ required: true }"
              input-class="form-control"
              autocomplete="off"
            ></datepicker>
            <span class="text-danger">{{ errors.first('dob') }}</span>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" v-model="patient.email" class="form-control">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="patient.password" class="form-control">
          </div>
        </div>
      </div>
    </b-modal>
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
      patients: [],
      perPage: 10,
      currentPage: 1,
      totalRows: 0,
      search: "",
      patient: {
        name: null,
        job: null,
        pob: null,
        dob: null,
        address: null,
        noTelp: null,
        gender: null,
        email: null,
        password: null,
        age: 0
      }
    };
  },
  watch: {
    search: _.debounce(function(val) {
      this.getPatients(1);
    }, 500)
  },
  mounted() {
    this.getPatients(this.currentPage);
  },
  methods: {
    getPatients(page) {
      fetch(
        `http://localhost:5000/api/patients?page=${page}&limit=${
          this.perPage
        }&name=${this.search}`
      )
        .then(res => res.json())
        .then(res => {
          this.patients = res.patients;
          this.totalRows = res.total;
        })
        .catch(err => {
          console.log("an error occured", err.response);
        });
    },
    ok() {
      fetch("http://localhost:5000/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.patient)
      })
        .then(res => res.json())
        .then(res => {
          if (res && res._id) {
            this.patient = {
              name: null,
              job: null,
              pob: null,
              dob: null,
              address: null,
              noTelp: null,
              gender: null,
              email: null,
              password: null,
              age: 0
            };
            this.getPatients();
            alert("Sukses Menyimpan Patient!");
          } else {
            alert("Gagal Menyimpan!");
          }
        })
        .catch(err => console.log("an error occured", err.response));
    }
  }
};
</script>

<style>
</style>
