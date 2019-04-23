<template>
  <section v-if="currentPlayback" id="player">
    <div class="playback-slider">
      <vue-slider
        :value="currentPlayback.progress_ms"
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
        :icon="currentPlayback.is_playing ? 'pause-circle' : 'play-circle'"
        size="3x"
      />
      <font-awesome-icon @click="nextSong()" icon="step-forward" size="2x"/>
      <input type="checkbox" :checked="currentPlayback.shuffle_state" @click="shuffle()">
    </nav>
  </section>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import { setTimeout } from "timers";
export default {
  components: {
    VueSlider
  },
  data() {
    return {
      position: 0,
      currentPlayback: null
    };
  },
  mounted: function() {
    this.getCurrentPlayback();
  },
  methods: {
    getCurrentPlayback() {
      this.spotify.getMyCurrentPlaybackState().then(data => {
        this.currentPlayback = data.body;
      });
    },
    playPause() {
      if (this.currentPlayback.is_playing) {
        this.spotify.pause()
      } else {
        this.spotify.play()
      }
      this.getCurrentPlayback();
    },
    nextSong() {
      this.spotify.skipToNext();
    },
    prevSong() {
      this.spotify.skipToPrevious();
    },
    shuffle() {
      this.spotify.setShuffle(!this.currentPlayback.shuffle_state);
      this.getCurrentPlayback();
    }
  }
};
</script>

<style>
</style>
