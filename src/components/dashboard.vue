<template>
  <div class="dashboard">
    <div id="satu" style="display:block;">
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        style="text-shadow: 0px 0px 2px #000;"
        fade
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <!-- Slides with img slot -->
        <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
        <b-carousel-slide>
          <img
            slot="img"
            class="img-fluid"
            src="../../image/carousel-1.jpg"
            alt="image slot"
            style="static"
          >
        </b-carousel-slide>
        <!-- <b-carousel-slide>
          <img
            slot="img"
            class="d-block img-fluid w-100"
            src="../../image/carousel-2.jpg"
            alt="image slot"
          >
        </b-carousel-slide>
        <b-carousel-slide>
          <img
            slot="img"
            class="d-block img-fluid w-100"
            src="../../image/carousel-3.jpg"
            alt="image slot"
          >
        </b-carousel-slide>-->
      </b-carousel>
    </div>
    <div>
      <h3 id="title_loc">Lokasi Kami</h3>
    </div>
  </div>
</template>

<script>
// import image from "./assets/logo.png";
import Image from "../../image/carousel-1.jpg";
import Image1 from "../../image/carousel-2.jpg";
import Image2 from "../../image/carousel-3.jpg";

export default {
  name: "dashborad",
  data() {
    return {
      slide: 0,
      sliding: null
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
};
</script>

<style>
#title_loc {
  margin-top: 30px;
  color: #2a9cc7;
}
</style>
