<template>
  <section v-if="currentPlayback" :class="{active: active}" id="player">
    <Playing v-if="currentPlayback" :currentPlayback="currentPlayback"/>
    <PlayerControls v-if="currentPlayback" :currentPlayback="currentPlayback"/>
    <DevicePicker v-if="currentPlayback"/>
    <font-awesome-icon @click="active = false" class="close-btn" icon="times" size="2x"/>
    <font-awesome-icon
      @click="showOptions = !showOptions"
      class="menu-btn"
      icon="ellipsis-v"
      size="2x"
    />
    <div class="options" v-if="showOptions">
      <ul @click="showOptions = false, active = false">
        <router-link tag="li" :to="`/artist/${currentPlayback.item.artists[0].id}`">Go to Artist</router-link>
        <router-link tag="li" :to="`/album/${currentPlayback.item.album.id}`">Go to Album</router-link>
        <li>Add to queue</li>
        <li>Add to playlist</li>
      </ul>
    </div>
    <Volume v-if="currentPlayback" :currentPlayback="currentPlayback"/>
  </section>
</template>

<script>
import PlayerControls from "./PlayerControls";
import Playing from "./Playing";
import DevicePicker from "./DevicePicker";
import Volume from "./Volume";
import { VueContext } from "vue-context";
import { setTimeout } from "timers";
export default {
  components: {
    PlayerControls,
    Playing,
    DevicePicker,
    Volume,
    VueContext
  },
  data() {
    return {
      currentPlayback: null,
      active: false,
      showOptions: false
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
