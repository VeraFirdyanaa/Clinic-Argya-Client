<template>
  <div class="row">
    <div class="col-md-12">
      <h2 class="page-header">Medicines</h2>
      <b-button v-b-modal.modal-form variant="outline-primary" class="mb-2">
        <i class="fa fa-plus"></i>&nbsp;Tambah Medicines
      </b-button>
      <table class="table table-striped table-hovered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Form</th>
            <th>Expired</th>
            <th>Created</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(medicine) in medicines" :key="medicine._id">
            <td>{{ medicine.name }}</td>
            <td>{{ medicine.form }}</td>
            <td>{{ medicine.expiredDate }}</td>
            <td>{{ medicine.createdDate }}</td>
            <td>{{ medicine.price }}</td>
            <td>
              <b-button-group>
                <b-button size="sm" variant="info" @click="onEdit(medicine)">
                  <i class="fa fa-pencil-alt"></i>&nbsp;Edit
                </b-button>
                <b-button size="sm" variant="danger" @click="onDelete(medicine)">
                  <i class="fa fa-trash"></i>&nbsp;Hapus
                </b-button>
              </b-button-group>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal id="modal-form" title="Form Medicine" @ok="ok()">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" v-model="medicine.name" class="form-control">
          </div>
          <div class="form-group">
            <label for="form">Form</label>
            <select name="form" v-model="medicine.form" class="form-control">
              <option value="tablet">Tablet</option>
              <option value="kapsul">Kapsul</option>
              <option value="sirup">Sirup</option>
            </select>
          </div>
          <div class="form-group">
            <label for="price">Price</label>
            <input type="number" v-model="medicine.price" class="form-control">
          </div>
          <div class="form-group">
            <label for="expiredDate">Expired Date</label>
            <datepicker
              name="expiredDate"
              v-model="medicine.expiredDate"
              v-validate="{ required: true }"
              input-class="form-control"
              autocomplete="off"
            ></datepicker>
            <span class="text-danger">{{ errors.first('expiredDate') }}</span>
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
      medicines: [],
      _id: null,
      medicine: {
        name: null,
        price: 0,
        form: null,
        expiredDate: null
      }
    };
  },
  mounted() {
    this.getMedicines();
    this.$root.$on("bv::modal::hide", (bvEvent, modalId) => {
      this.onReset();
    });
  },
  methods: {
    getMedicines() {
      fetch("http://localhost:5000/api/medicines")
        .then(res => res.json())
        .then(res => {
          this.medicines = res.medicines;
        })
        .catch(err => {
          console.log("an error occured", err.response);
        });
    },
    ok() {
      if (this.editing) {
        fetch("http://localhost:5000/api/medicines/" + this._id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.medicine)
        })
          .then(res => res.json())
          .then(res => {
            if (res && res.medicine._id) {
              this.onReset();
              this.getMedicines();
              alert("Sukses Menyimpan Medicine!");
            } else {
              alert("Gagal Menyimpan!");
            }
          })
          .catch(err => console.log("an error occured", err.response));
      } else {
        fetch("http://localhost:5000/api/medicines", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.medicine)
        })
          .then(res => res.json())
          .then(res => {
            if (res && res._id) {
              this.onReset();
              this.getMedicines();
              alert("Sukses Menyimpan Medicine!");
            } else {
              alert("Gagal Menyimpan!");
            }
          })
          .catch(err => console.log("an error occured", err.response));
      }
    },
    onEdit(medicine) {
      fetch("http://localhost:5000/api/medicines/" + medicine._id)
        .then(res => res.json())
        .then(res => {
          this.editing = true;
          this.medicine = res;
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
      this.medicine = {
        name: null,
        price: 0,
        form: null,
        expiredDate: null
      };
    },
    onDelete(medicine) {
      this.$swal({
        title: `Are you sure want to delete ${medicine.name}?`,
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
          fetch("http://localhost:5000/api/medicines/" + medicine._id, {
            method: "DELETE"
          })
            .then(res => res.json)
            .then(res => {
              this.getMedicines();
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
