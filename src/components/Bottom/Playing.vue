<template>
  <div v-if="currentPlayback" class="playing">
    <h3>{{this.currentPlayback.item.name}}</h3>
    <h4 v-for="artist in currentPlayback.item.artists" :key="artist.id">{{artist.name}}</h4>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    }
  }
};
</script>

<style>
</style>
