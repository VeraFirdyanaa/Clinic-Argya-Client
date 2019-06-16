<template>
  <div id="myPage">
    <navbar style="margin-bottom: 60px;"></navbar>
    <router-view/>
  </div>
</template>

<script>
// import Navbar from "@/components/ui/navbar";
import Navbar from "@/components/FrontEnd/UI/Navbar";

export default {
  name: "DashView",
  components: {
    navbar: Navbar
  }
};
</script>

<style>
</style>
