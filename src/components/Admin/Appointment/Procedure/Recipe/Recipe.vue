<template>
  <div class="row mb-4">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Recipe</h5>
          <h6 class="card-subtitle text-muted mb-2">{{ appointmentCode }}</h6>
          <div class="card-text">
            <div class="form-group">
              <label for="medicine">Medicine</label>
              <vue-bootstrap-typeahead
                :data="medicines"
                v-model="medicine"
                size="lg"
                :serializer="s => s.name"
                placeholder="Type an Medicine..."
                @hit="selectedMedicine = $event"
              ></vue-bootstrap-typeahead>
              <!-- <input type="text" name="medicine" v-model="medicine" class="form-control"> -->
            </div>
            <div class="form-group">
              <label for="qty">Qty (pcs)</label>
              <input type="number" name="qty" v-model="qty" class="form-control">
            </div>
            <div class="form-grou">
              <b-button
                block
                variant="primary"
                @click="addToDetail"
                :disabled="isSetRecipe"
              >Add To Recipe</b-button>
            </div>
            <hr>
            <table class="table table-hovered table-striped">
              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Form</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(detail, i) in details" :key="i">
                  <th>{{ detail.medicine ? detail.medicine.name : '-' }}</th>
                  <th>{{ detail.medicine ? detail.medicine.form : '-' }}</th>
                  <th>{{ detail.medicine ? detail.medicine.price : 0 | currency }}</th>
                  <th>{{ detail.qty }}</th>
                  <th>
                    <b-button @click="removeFromDetail(i)" variant="danger" size="sm">
                      <i class="fa fa-trash"></i>
                    </b-button>
                  </th>
                </tr>
              </tbody>
            </table>
            <h4>Total: Rp. {{ total }}</h4>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="isSetRecipe"
                :value="recipeData"
                id="defaultCheck2"
              >
              <label class="form-check-label" for="defaultCheck2">Save Recipe</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  props: ["appointmentCode"],
  data() {
    return {
      details: [],
      medicines: [],
      total: 0,
      medicine: "",
      qty: 0,
      selectedMedicine: null,
      isSetRecipe: false,
      recipeData: [this.isSetRecipe]
    };
  },
  methods: {
    async getMedicines(value) {
      try {
        const res = await fetch(
          "http://localhost:5000/api/medicines?value=" + value
        );
        const data = await res.json();
        this.medicines = data.medicines ? data.medicines : [];
      } catch (err) {
        console.log("err", err);
      }
    },
    addToDetail() {
      if (this.selectedMedicine) {
        console.log("medicine", this.selectedMedicine);
        let index = this.details.findIndex(
          dt => dt.medicine._id === this.selectedMedicine._id
        );
        if (index > -1) {
          this.details[index].qty += this.qty;
        } else {
          this.details.push({
            medicine: this.selectedMedicine,
            qty: this.qty
          });
        }
        this.total = this.getTotal();
        this.medicine = "";
        this.qty = 0;
        this.selectedMedicine = null;
        this.medicines = [];
      }
    },
    removeFromDetail(index) {
      this.details.splice(index, 1);
      this.total = this.getTotal();
    },
    getTotal() {
      let total = 0;
      this.details.map(item => {
        total += item.medicine.price * Number(item.qty);
      });

      return total;
    }
  },
  watch: {
    medicine: _.debounce(function(med) {
      this.getMedicines(med);
    }, 500),
    isSetRecipe: function(newVal) {
      if (newVal) {
        this.$emit("onSaveRecipe", {
          details: this.details,
          total: this.getTotal()
        });
      } else {
        this.$emit("onSaveRecipe", {});
      }
    }
  }
};
</script>

<style>
</style>
