<template>
  <div class="volume">
    <vue-slider
      class="volume-bar__slider"
      v-model="volume"
      v-on:drag-end="onDragEnd"
      ref="slider"
      tooltip="none"
      :dot-size="12"
      :max="100"
      :process-style="{'background': '#44BBA4'}"
      :bg-style="{'background': '#3F88C5'}"
    ></vue-slider>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
export default {
  props: ["currentPlayback"],
  components: {
    VueSlider
  },
  data() {
    return {
      volume: 0
    };
  },
  watch: {
    currentPlayback() {
      this.volume = this.currentPlayback.device.volume_percent;
    }
  },
  methods: {
    onDragEnd() {
      this.spotify.setVolume(this.$refs.slider.getValue());
      this.volume = this.$refs.slider.getValue();
    }
  }
};
</script>

<style>
</style>
