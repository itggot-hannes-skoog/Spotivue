<template>
  <div class="devices">
    <font-awesome-icon @click="getDevices()" icon="mobile-alt" size="2x"/>
    <nav v-if="showDevices">
      <h2>Devices</h2>
      <div
        @click="selectDevice(device.id)"
        class="device"
        v-for="device in devices"
        :key="device.id"
      >{{device.name}}</div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      devices: null,
      showDevices: false
    };
  },
  mounted: function() {
  },
  methods: {
    getDevices() {
      if (this.showDevices) {
        this.showDevices = false;
      } else {
        this.spotify.getMyDevices().then(data => {
          this.devices = data.body.devices;
        });
        this.showDevices = true;
      }
    },
    selectDevice(id) {
      let ids = [];
      ids.push(id);
      this.spotify.transferMyPlayback({ deviceIds: ids, play: true });
      this.$parent.getCurrentPlayback();
    }
  }
};
</script>

<style>
</style>
