<template>
  <div class="row">
    <div class="col-md-12">
      <h2 class="page-header">Nurses</h2>
      <b-button v-b-modal.modal-form variant="outline-primary" class="mb-2">
        <i class="fa fa-plus"></i>&nbsp;Tambah Nurses
      </b-button>
      <table class="table table-striped table-hovered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>No. Telp</th>
            <th>Gender</th>
            <th>Place of Birth</th>
            <th>Date of Birth</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(nurse) in nurses" :key="nurse._id">
            <td>{{ nurse.name }}</td>
            <td>{{ nurse.address }}</td>
            <td>{{ nurse.noTelp }}</td>
            <td>{{ nurse.gender }}</td>
            <td>{{ nurse.pob }}</td>
            <td>{{ nurse.dob }}</td>
            <td>{{ nurse.age }}</td>
            <td>
              <b-button-group>
                <b-button size="sm" variant="info" @click="onEdit(nurse)">
                  <i class="fa fa-pencil-alt"></i>&nbsp;Edit
                </b-button>
                <b-button size="sm" variant="danger" @click="onDelete(nurse)">
                  <i class="fa fa-trash"></i>&nbsp;Hapus
                </b-button>
              </b-button-group>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal id="modal-form" title="Form Nurse" @ok="ok()">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" v-model="nurse.name" class="form-control">
          </div>
          <div class="form-group">
            <label for="address">Address</label>
            <textarea name="address" v-model="nurse.address" class="form-control"></textarea>
          </div>
          <div class="form-group">
            <label for="noTelp">No. Telpon</label>
            <input type="text" v-model="nurse.noTelp" class="form-control">
          </div>
          <div class="form-group">
            <label for="name">Gender</label>
            <select name="gender" v-model="nurse.gender" class="form-control">
              <option value="Pria">Pria</option>
              <option value="Wanita">Wanita</option>
            </select>
          </div>
          <div class="form-group">
            <label for="age">Age</label>
            <input type="number" v-model="nurse.age" class="form-control">
          </div>
          <div class="form-group">
            <label for="pob">Place of Birth</label>
            <input type="text" v-model="nurse.pob" class="form-control">
          </div>
          <div class="form-group">
            <label for="dob">Date of Birth</label>
            <datepicker
              name="dob"
              v-model="nurse.dob"
              v-validate="{ required: true }"
              input-class="form-control"
              autocomplete="off"
            ></datepicker>
            <span class="text-danger">{{ errors.first('dob') }}</span>
          </div>
          <div v-if="!editing">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" v-model="nurse.email" class="form-control">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" v-model="nurse.password" class="form-control">
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    Datepicker
  },
  data() {
    return {
      editing: false,
      nurses: [],
      _id: null,
      nurse: {
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
  mounted() {
    this.getNurses();
    this.$root.$on("bv::modal::hide", (bvEvent, modalId) => {
      this.onReset();
    });
  },
  methods: {
    getNurses() {
      fetch("http://localhost:5000/api/nurses")
        .then(res => res.json())
        .then(res => {
          this.nurses = res.nurses;
        })
        .catch(err => {
          console.log("an error occured", err.response);
        });
    },
    ok() {
      if (this.editing) {
        fetch("http://localhost:5000/api/nurses/" + this._id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.nurse)
        })
          .then(res => res.json())
          .then(res => {
            if (res && res.nurse._id) {
              this.onReset();
              this.getNurses();
              alert("Sukses Menyimpan Nurse!");
            } else {
              alert("Gagal Menyimpan!");
            }
          })
          .catch(err => console.log("an error occured", err.response));
      } else {
        fetch("http://localhost:5000/api/nurses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.nurse)
        })
          .then(res => res.json())
          .then(res => {
            if (res && res._id) {
              this.onReset();
              this.getNurses();
              alert("Sukses Menyimpan Nurse!");
            } else {
              alert("Gagal Menyimpan!");
            }
          })
          .catch(err => console.log("an error occured", err.response));
      }
    },
    onEdit(nurse) {
      fetch("http://localhost:5000/api/nurses/" + nurse._id)
        .then(res => res.json())
        .then(res => {
          this.editing = true;
          this.nurse = res;
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
      this.nurse = {
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
    onDelete(nurse) {
      this.$swal({
        title: `Are you sure want to delete ${nurse.name}?`,
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
          fetch("http://localhost:5000/api/nurses/" + nurse._id, {
            method: "DELETE"
          })
            .then(res => res.json)
            .then(res => {
              this.getNurses();
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
