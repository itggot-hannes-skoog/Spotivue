<template>
  <div v-if="currentPlayback" class="playing">
    <img
      v-if="currentPlayback.item.album.images.length > 0"
      :src="currentPlayback.item.album.images[1].url"
      alt="cover"
    >
    <div class="info">
      <h3>{{this.currentPlayback.item.name}}</h3>
      <h4 v-for="artist in currentPlayback.item.artists" :key="artist.id">{{artist.name}}</h4>
    </div>
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
