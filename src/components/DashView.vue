<template>
  <div id="myPage">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
// import Navbar from "@/components/ui/navbar";
import Navbar from "@/components/Rizal/UI/Navbar";

export default {
  name: "DashView",
  components: {
    navbar: Navbar
  }
};
</script>

<style>
</style>
