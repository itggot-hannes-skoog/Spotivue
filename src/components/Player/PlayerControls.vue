<template>
  <section v-if="currentPlayback" id="player-controls">
    <div class="playback-slider">
      <vue-slider
        :value="progress"
        :max="currentPlayback.item.duration_ms"
        :dot-size="15"
        :process-style="{'background': '#44BBA4'}"
        :bg-style="{'background': '#3F88C5'}"
        :tooltip-formatter="time"
        v-on:drag-end="onDragEnd"
        ref="slider"
      />
    </div>
    <nav class="player-controls">
      <i class="repeat">
        <font-awesome-icon :class="repeat_state" @click="repeat()" icon="sync-alt" size="lg"/>
        <span v-if="repeat_state == 'track'">1</span>
      </i>
      <font-awesome-icon @click="prevSong()" icon="step-backward" size="2x"/>
      <font-awesome-icon v-if="!playing" @click="playSong()" icon="play-circle" size="3x"/>
      <font-awesome-icon v-if="playing" @click="pauseSong()" icon="pause-circle" size="3x"/>
      <font-awesome-icon @click="nextSong()" icon="step-forward" size="2x"/>
      <font-awesome-icon
        :class="this.shuffle_state ? 'active' : 'disabled'"
        @click="shuffle()"
        icon="random"
        size="lg"
      />
    </nav>
  </section>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import { setTimeout } from "timers";
import moment from "moment";
export default {
  props: ["currentPlayback"],
  components: {
    VueSlider
  },
  data() {
    return {
      progress: 0,
      playing: null,
      progressInterval: null,
      shuffle_state: null,
      repeat_state: null,
      time: v => moment.utc(v).format("mm:ss")
    };
  },
  watch: {
    currentPlayback() {
      this.playing = this.currentPlayback.is_playing;
      this.progress = this.currentPlayback.progress_ms;
      this.shuffle_state = this.currentPlayback.shuffle_state;
      this.repeat_state = this.currentPlayback.repeat_state;
    },
    playing() {
      this.updateProgress();
    }
  },
  created() {
    this.updateProgress();
  },
  methods: {
    updateProgress() {
      clearInterval(this.progressInterval);
      if (this.playing) {
        this.progressInterval = setInterval(() => {
          if (this.progress + 1000 <= this.currentPlayback.item.duration_ms) {
            this.progress += 1000;
          } else {
            this.$parent.getCurrentPlayback();
          }
        }, 1000);
      }
    },

    onDragEnd() {
      this.spotify.seek(this.$refs.slider.getValue());
      this.progress = this.$refs.slider.getValue();
    },

    playSong() {
      this.spotify.play();
      this.playing = true;
    },
    pauseSong() {
      this.spotify.pause();
      this.playing = false;
    },
    nextSong() {
      this.spotify.skipToNext();
      this.progress = 0
      this.$parent.getCurrentPlayback();
    },
    prevSong() {
      this.spotify.skipToPrevious();
      this.progress = 0
      this.$parent.getCurrentPlayback();
    },
    shuffle() {
      this.shuffle_state = !this.shuffle_state;
      this.spotify.setShuffle({ state: this.shuffle_state });
    },
    repeat() {
      const states = ["off", "context", "track"];
      this.repeat_state = states[(states.indexOf(this.repeat_state) + 1) % 3];
      this.spotify.setRepeat({ state: this.repeat_state });
    }
  }
};
</script>

<style>
</style>
