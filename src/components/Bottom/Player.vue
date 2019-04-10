<template>
  <section id="player">
    <h1>Player</h1>
    <div class="playback-slider">
      <vue-slider
        v-model="position"
        :max="1000"
        :dot-size="15"
        :process-style="{'background': '#44BBA4'}"
        :bg-style="{'background': '#3F88C5'}"
      />
    </div>
  </section>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
export default {
  components: {
    VueSlider
  },
  data() {
    return {
      position: 0
    };
  }
};
</script>

<style>
</style>
