<template>
  <section id="player">
    <Playing v-if="currentPlayback" :currentPlayback="currentPlayback"/>
    <PlayerControls v-if="currentPlayback" :currentPlayback="currentPlayback"/>
    <DevicePicker v-if="currentPlayback"/>
    <Volume v-if="currentPlayback" :currentPlayback="currentPlayback"/>
  </section>
</template>

<script>
import PlayerControls from "./PlayerControls";
import Playing from "./Playing";
import DevicePicker from "./DevicePicker";
import Volume from "./Volume";
import { setTimeout } from "timers";
export default {
  components: {
    PlayerControls,
    Playing,
    DevicePicker,
    Volume
  },
  data() {
    return {
      currentPlayback: null
    };
  },
  mounted() {
    this.getCurrentPlayback();
    this.$root.$on("songPlay", async () => {
      setTimeout(() => {
        this.getCurrentPlayback();
      }, 1000);
    });
  },
  methods: {
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
