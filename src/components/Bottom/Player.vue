<template>
  <section id="player">
    <div class="playback-slider">
      <vue-slider
        v-model="position"
        :max="1000"
        :dot-size="15"
        :process-style="{'background': '#44BBA4'}"
        :bg-style="{'background': '#3F88C5'}"
      />
    </div>
    <nav class="player-controls">
      <font-awesome-icon @click="prevSong()" icon="step-backward" size="2x"/>
      <font-awesome-icon @click="playPause()" :icon="playing ? 'pause-circle' : 'play-circle'" size="3x"/>
      <font-awesome-icon @click="nextSong()" icon="step-forward" size="2x"/>
    </nav>
  </section>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import api from "@/api"
export default {
  components: {
    VueSlider
  },
  data() {
    return {
      position: 0,
      playing: false
    };
  },
  methods: {
    playPause() {
      if (this.playing) {
        api.player.pause()
      } else {
        api.player.play()
      }
      this.playing = !this.playing
    },
    nextSong() {
      api.player.next()
    },
    prevSong() {
      api.player.previous()
    }
  }
};
</script>

<style>
</style>
