<template>
  <div>
    <div class="row mb-4">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Medical Record</h5>
            <h6 class="card-subtitle text-muted mb-2">{{ appointmentCode }}</h6>
            <div class="card-text">
              <div class="form-group">
                <label for="complaint">Complaint</label>
                <textarea name="complaint" v-model="complaint" class="form-control"></textarea>
              </div>
              <div class="form-group">
                <label for="bloodPressure">Blood Pressure</label>
                <input
                  type="number"
                  name="bloodPressure"
                  v-model="bloodPressure"
                  class="form-control"
                >
              </div>
              <div class="form-group">
                <label for="weight">Weight</label>
                <input type="number" name="weight" v-model="weight" class="form-control">
              </div>
              <div class="form-group">
                <label for="temperature">Temperature</label>
                <input type="number" name="temperature" v-model="temperature" class="form-control">
              </div>
              <div class="form-group">
                <label for="diagnose">Diagnose</label>
                <textarea name="diagnose" v-model="diagnose" class="form-control"></textarea>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="needRecipe"
                  id="defaultCheck1"
                >
                <label class="form-check-label" for="defaultCheck1">Give a Recipe ?</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="needRecipe">
      <div class="col-md-12">
        <recipe
          :appointment-code="appointmentCode"
          :appointment-id="appointmentId"
          v-on:onSaveRecipe="getRecipe($event)"
        ></recipe>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="consultationFee"
            id="defaultCheck3"
          >
          <label class="form-check-label" for="defaultCheck1">+ Consultation Fee</label>
        </div>
        <b-button @click="save" variant="info" block class="mb-5">
          <i class="fa fa-send"></i>&nbsp;Simpan
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Recipe from "../Recipe/Recipe";

export default {
  components: {
    recipe: Recipe
  },
  props: ["appointmentId", "appointmentCode"],
  data() {
    return {
      appointment: null,
      complaint: null,
      bloodPressure: 0,
      weight: 0,
      temperature: 0,
      diagnose: null,
      patient: null,
      doctor: null,
      recipe: null,
      needRecipe: false,
      recipeBox: [this.needRecipe],
      consultationFee: false
    };
  },
  mounted() {
    this.getAppointment(this.$props.appointmentId);
  },
  methods: {
    getAppointment(id) {
      fetch("http://localhost:5000/api/queues/" + id)
        .then(res => res.json())
        .then(res => {
          console.log("sadsa", res);
          this.appointment = res;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    getRecipe(value) {
      this.recipe = value;
    },
    save() {
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
          let userData = localStorage.getItem("userdata")
            ? JSON.parse(localStorage.getItem("userdata"))
            : null;
          let doctorId = userData ? userData.doctor._id : null;
          fetch("http://localhost:5000/api/medicalrecords", {
            method: "POST",
            body: JSON.stringify({
              medicalRecord: {
                complaint: this.complaint,
                bloodPressure: this.bloodPressure,
                weight: this.weight,
                temperature: this.temperature,
                diagnose: this.diagnose,
                patient: this.appointment.patient._id,
                doctor: doctorId,
                appointment: this.appointment._id
              },
              recipe: this.recipe,
              consultationFee: this.consultationFee
            }),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(res => res.json())
            .then(res => {
              if (res && res.medicalRecord) {
                this.$swal(
                  "Success",
                  "Success to Save Medical Record! with Payment ID " +
                    res.payment.code,
                  "success"
                );
                this.$router.push({
                  name: "MedicalRecordView",
                  params: { id: res.medicalRecord._id }
                });
              } else {
                this.$swal(
                  "Failed!",
                  "Failed to Save Medical Record!",
                  "error"
                );
              }
            })
            .catch(err => {
              console.log("err", err);
            });
        }
      });
    }
  },
  watch: {
    // needRecipe: function(newVal) {
    //   this.$emit("changeRecipeBox", newVal);
    // }
  }
};
</script>

<style>
</style>
