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
              >Total: Rp. {{ medicalRecord.recipe ? medicalRecord.recipe.total : 0 }}</h6>
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
                      <td>Rp. {{ detail.medicine.price }}</td>
                      <td>{{ detail.qty }}</td>
                    </tr>
                  </tbody>
                </table>
                <hr>
                <h5>Payment</h5>
                <p
                  v-if="(medicalRecord.payment ? medicalRecord.payment.total : 0) - (medicalRecord.recipe ? medicalRecord.recipe.total : 0) !== 0"
                >+ Consultation Fee (Rp. {{ medicalRecord.doctor ? medicalRecord.doctor.rates : 0 }})</p>
                <p>Grand Total: Rp. {{ medicalRecord.payment ? medicalRecord.payment.total : 0 }}</p>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      medicalRecord: {},
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
        })
        .catch(err => console.log(err));
    },

    print() {
      // Pass the element id here
      this.$htmlToPaper("recipeBody", () => {
        console.log("Printing done or got cancelled!");
      });
    }
  }
};
</script>

<style>
</style>
