<template>
  <div class="row">
    <div class="col-md-12">
      <h2 class="page-header">Treatment Procedure</h2>
      <hr>
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <!-- http://localhost:8080/#/dashboard/procedures/(id)ARG6-0008/(_mongoID)5d060ecabf5a8b10f03403b2 -->
          <medical-record
            :appointment-code="$route.params.id"
            :appointment-id="$route.params._mongoID"
            v-on:changeRecipeBox="listenRecipeBox($event)"
          ></medical-record>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MedicalRecord from "@/components/Admin/Appointment/Procedure/MedicalRecord/MedicalRecord";
import Recipe from "@/components/Admin/Appointment/Procedure/Recipe/Recipe";

export default {
  components: {
    "medical-record": MedicalRecord,
    recipe: Recipe
  },
  data() {
    return {
      needMedicine: false
    };
  },
  methods: {
    listenRecipeBox(e) {
      this.needMedicine = e;
    }
  }
};
</script>

<style>
</style>
