<template>
  <div class="row">
    <div class="col-md-12">
      <h2 class="page-header">Rooms</h2>
      <b-button v-b-modal.modal-form variant="outline-primary" class="mb-2">
        <i class="fa fa-plus"></i>&nbsp;Tambah Kamar
      </b-button>
      <!-- <div class="row">
        <div class="col-md-5 offset-md-7">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Find Room ..."
              aria-describedby="button-addon2"
              v-model="search"
              autocomplete="false"
            >
          </div>
        </div>
      </div>-->
      <table class="table table-striped table-hovered">
        <thead>
          <tr>
            <th>Tipe Kamar</th>
            <th>Kapasitas Kamar</th>
            <th>Tarif per Malam</th>
            <th>Rawat Inap</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(room) in rooms" :key="room._id">
            <td>{{ room.roomType }}</td>
            <td>{{ room.roomCapacity }}</td>
            <td>{{ room.roomRates }}</td>
            <td>
              <button class="btn btn-primary">List Opname in this room</button>
            </td>
            <td>
              <b-button-group>
                <b-button size="sm" variant="info" @click="onEdit(room)">
                  <i class="fa fa-pencil-alt"></i>&nbsp;Edit
                </b-button>
                <b-button size="sm" variant="danger" @click="onDelete(room)">
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
        @change="getRooms($event)"
        :per-page="perPage"
      ></b-pagination>
    </div>
    <b-modal id="modal-form" title="Form Room" @ok="ok()">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="roomType">Tipe Kamar</label>
            <input type="text" v-model="room.roomType" class="form-control">
          </div>
          <div class="form-group">
            <label for="roomCapacity">Kapasitas Kamar</label>
            <input type="text" v-model="room.roomCapacity" class="form-control">
          </div>
          <div class="form-group">
            <label for="roomRates">Harga Kamar per malam</label>
            <input type="text" v-model="room.roomRates" class="form-control">
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
      editing: false,
      rooms: [],
      _id: null,
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      search: "",
      room: {
        roomType: null,
        roomCapacity: 0,
        roomRates: 0
      }
    };
  },
  watch: {
    search: _.debounce(function(val) {
      this.getRooms(1);
    }, 500)
  },
  mounted() {
    this.getRooms(this.currentPage);
    this.$root.$on("bv::modal::hide", (bvEvent, modalId) => {
      this.onReset();
    });
  },
  methods: {
    getRooms(page) {
      fetch(
        `http://localhost:5000/api/rooms?page=${page}&limit=${
          this.perPage
        }&name=${this.search}`
      )
        .then(res => res.json())
        .then(res => {
          this.rooms = res.rooms;
          this.totalRows = res.total;
        })
        .catch(err => {
          console.log("an error occured", err.response);
        });
    },
    ok() {
      if (this.editing) {
        fetch("http://localhost:5000/api/rooms/" + this._id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.room)
        })
          .then(res => res.json())
          .then(res => {
            if (res && res.room._id) {
              this.onReset();
              this.getRooms();
              alert("Sukses Menyimpan Room!");
            } else {
              alert("Gagal Menyimpan!");
            }
          })
          .catch(err => console.log("an error occured", err.response));
      } else {
        fetch("http://localhost:5000/api/rooms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.room)
        })
          .then(res => res.json())
          .then(res => {
            if (res && res._id) {
              this.onReset();
              this.getRooms();
              alert("Sukses Menyimpan Room!");
            } else {
              alert("Gagal Menyimpan!");
            }
          })
          .catch(err => console.log("an error occured", err.response));
      }
    },
    onEdit(room) {
      fetch("http://localhost:5000/api/rooms/" + room._id)
        .then(res => res.json())
        .then(res => {
          this.editing = true;
          this.room = res;
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
      this.room = {
        roomType: null,
        roomCapacity: 0,
        roomRates: 0
      };
    },
    onDelete(room) {
      this.$swal({
        title: `Are you sure want to delete ${room.name}?`,
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
          fetch("http://localhost:5000/api/rooms/" + room._id, {
            method: "DELETE"
          })
            .then(res => res.json)
            .then(res => {
              this.getRooms();
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
