<template>
  <section id="player">
    <Playing/>
    <PlayerControls/>
    <div class="devices">
      <font-awesome-icon @click="getDevices()" icon="mobile-alt" size="2x"/>
      <nav>
          <div class="device" v-for="device in devices" :key="device.id">{{device.name}} </div>
      </nav>
    </div>
  </section>
</template>

<script>
import PlayerControls from "./PlayerControls";
import Playing from "./Playing";
export default {
  components: {
    PlayerControls,
    Playing
  },
  data() {
    return {
      devices: null
    };
  },
  mounted: function() {
      this.getDevices;
  },
  methods: {
    getDevices() {
      this.spotify.getMyDevices().then(data => {
        this.devices = data.body.devices;
      });
    }
  }
};
</script>

<style>
</style>
