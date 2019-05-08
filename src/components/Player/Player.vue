<template>
  <section v-if="currentPlayback" :class="{active: active}" id="player">
    <Playing v-if="currentPlayback" :currentPlayback="currentPlayback"/>
    <PlayerControls v-if="currentPlayback" :currentPlayback="currentPlayback"/>
    <DevicePicker v-if="currentPlayback"/>
    <font-awesome-icon @click="active = false" class="close-btn" icon="times" size="2x"/>
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
      currentPlayback: null,
      active: false
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
