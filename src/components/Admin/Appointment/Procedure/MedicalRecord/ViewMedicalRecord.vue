<template>
  <div class="row">
    <div class="col-md-6">
      <div class="row mb-4">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Medical Record</h5>
              <h6
                class="card-subtitle text-muted mb-2"
              >Doctor: dr. {{ medicalRecord.doctor ? medicalRecord.doctor.name : '-' }}</h6>
              <div class="card-text">
                <div class="form-group">
                  <label for="patient">
                    <strong>Patient</strong>
                  </label>
                  <p>Sdr. {{ medicalRecord.patient ? medicalRecord.patient.name : '-' }}</p>
                </div>
                <div class="form-group">
                  <label for="complaint">
                    <strong>Complaint</strong>
                  </label>
                  <p>{{ medicalRecord.complaint }}</p>
                </div>
                <div class="form-group">
                  <label for="bloodPressure">
                    <strong>Blood Pressure</strong>
                  </label>
                  <p>{{ medicalRecord.bloodPressure }}</p>
                </div>
                <div class="form-group">
                  <label for="weight">
                    <strong>Weight</strong>
                  </label>
                  <p>{{ medicalRecord.weight }}</p>
                </div>
                <div class="form-group">
                  <label for="temperature">
                    <strong>Temperature</strong>
                  </label>
                  <p>{{ medicalRecord.temperature }}</p>
                </div>
                <div class="form-group">
                  <label for="diagnose">
                    <strong>Diagnose</strong>
                  </label>
                  <p>{{ medicalRecord.diagnose }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="row mb-4">
        <div class="col-md-12">
          <div class="card" id="recipeBody">
            <div class="card-body">
              <h5 class="card-title">Recipe</h5>
              <h6
                class="card-subtitle text-muted mb-2"
              >Total: {{ medicalRecord.recipe ? medicalRecord.recipe.total : 0 | currency }}</h6>
              <div class="card-text">
                <p class="text-muted text-center" v-if="!medicalRecord.recipe">No Recipe Found!</p>
                <table class="table table-striped table-hovered" v-if="medicalRecord.recipe">
                  <thead>
                    <tr>
                      <th>Medicine</th>
                      <th>Form</th>
                      <th>Price</th>
                      <th>Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(detail, i) in medicalRecord.recipe.details" :key="i">
                      <td>{{ detail.medicine.name }}</td>
                      <td>{{ detail.medicine.form }}</td>
                      <td>{{ detail.medicine.price | currency }}</td>
                      <td>{{ detail.qty }}</td>
                    </tr>
                  </tbody>
                </table>
                <hr>
                <h5>Payment</h5>
                <p
                  v-if="(medicalRecord.payment ? medicalRecord.payment.total : 0) - (medicalRecord.recipe ? medicalRecord.recipe.total : 0) !== 0"
                >+ Consultation Fee ({{ medicalRecord.doctor ? medicalRecord.doctor.rates : 0 | currency }})</p>
                <p v-if="medicalRecord.needOpname">+ Rawat Inap (Biaya Belum termasuk)</p>
                <p>Grand Total: {{ medicalRecord.payment ? medicalRecord.payment.total : 0 | currency }}</p>
              </div>
            </div>
          </div>
          <div class="col text-center">
            <b-button class="mt-2" variant="outline-primary" @click="print">
              <i class="fa fa-print"></i>&nbsp;Print
            </b-button>
          </div>
        </div>
      </div>
      <div class="row mt-2 mb-4" v-if="medicalRecord.needOpname">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Rawat Inap</h5>
              <h6 class="card-subtitle text-muted mb-2">Detail Rawat Inap</h6>
              <div class="card-text" v-if="!medicalRecord.opname">
                <div class="form-group">
                  <label for="roomType">Pilih Tipe Kamar</label>
                  <select name="roomType" v-model="roomType" class="form-control">
                    <option :value="null" disabled>Daftar Kamar Tersedia</option>
                    <option
                      v-for="room in rooms"
                      :key="room._id"
                      :value="room._id"
                    >{{ room.roomType }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="checkIn">Tanggal Check In</label>
                  <datepicker
                    name="checkIn"
                    v-model="checkIn"
                    input-class="form-control"
                    autocomplete="off"
                  ></datepicker>
                </div>
                <div class="form-group">
                  <button class="btn btn-primary" @click="onSimpanOpname">Simpan</button>
                </div>
              </div>
              <div class="card-text" v-if="medicalRecord.opname">
                <div class="form-group">
                  <label for="Tipe Kamar">
                    <strong>Tipe Kamar</strong>
                  </label>
                  <p>{{ medicalRecord.room.roomType }}</p>
                </div>
                <div class="form-group">
                  <label for="Check In">
                    <strong>Tanggal Check In</strong>
                  </label>
                  <p>{{ medicalRecord.opname.checkIn | moment("dddd, MMMM do YYYY") }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      medicalRecord: {},
      rooms: [],
      roomType: null,
      checkIn: new Date(),
      printRecipe: {
        id: "recipeBody",
        extraCss:
          "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      }
    };
  },
  mounted() {
    this.getMedicalRecord(this.$route.params.id);
  },
  methods: {
    getMedicalRecord(id) {
      fetch("http://localhost:5000/api/medicalrecords/" + id)
        .then(res => res.json())
        .then(res => {
          console.log("ress", res);
          this.medicalRecord = res;
          this.getAvailableRooms();
        })
        .catch(err => console.log(err));
    },

    print() {
      // Pass the element id here
      this.$htmlToPaper("recipeBody", () => {
        console.log("Printing done or got cancelled!");
      });
    },
    getAvailableRooms() {
      fetch("http://localhost:5000/api/rooms/available")
        .then(res => res.json())
        .then(res => {
          this.rooms = res;
        })
        .catch(err => console.log("err", err));
    },
    onSimpanOpname() {
      fetch(
        "http://localhost:5000/api/opnames/set-medical-record/" +
          this.medicalRecord._id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            opname: {
              room: this.roomType,
              medicalRecord: this.medicalRecord._id,
              patient: this.medicalRecord.patient._id,
              checkIn: this.checkIn
            }
          })
        }
      )
        .then(res => res.json())
        .then(res => {
          console.log("res", res);
          this.getMedicalRecord(this.$route.params.id);
        })
        .catch(err => console.log("err", err));
    }
  }
};
</script>

<style>
</style>
