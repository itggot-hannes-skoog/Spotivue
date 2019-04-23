<template>
  <section id="player">
    <div class="playback-slider">
      <vue-slider
        v-model="currentPlayback.progress_ms"
        :max="currentPlayback.item.duration_ms"
        :dot-size="15"
        :process-style="{'background': '#44BBA4'}"
        :bg-style="{'background': '#3F88C5'}"
      />
    </div>
    <nav class="player-controls">
      <font-awesome-icon @click="prevSong()" icon="step-backward" size="2x"/>
      <font-awesome-icon
        @click="playPause()"
        :icon="playing ? 'pause-circle' : 'play-circle'"
        size="3x"
      />
      <font-awesome-icon @click="nextSong()" icon="step-forward" size="2x"/>
    </nav>
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
      position: 0,
      playing: false,
      currentPlayback: null
    };
  },
  mounted: function() {
    this.getCurrentPlayback()
  },
  methods: {
    playPause() {
      if (this.playing) {
        this.spotify.pause();
      } else {
        this.spotify.play();
      }
      this.playing = !this.playing;
      this.getCurrentPlayback();
    },
    nextSong() {
      this.spotify.skipToNext();
      this.getCurrentPlayback();
    },
    prevSong() {
      this.spotify.skipToPrevious();
      this.getCurrentPlayback();
    },
    getCurrentPlayback() {
      this.spotify.getMyCurrentPlaybackState().then(data => {
        this.currentPlayback = data.body;
      });
    }
  }
};
</script>

<style>
</style>
