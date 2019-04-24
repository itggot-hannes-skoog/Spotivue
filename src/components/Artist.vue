<template>
  <main v-if="artist" class="artist">
    <header>
      <h1>{{artist.name}}</h1>
      <img v-if="artist.images.length > 0" :src="artist.images[0].url" alt="picture">
    </header>
    <!-- <main class="songs">
      <Song v-for="song in album.tracks.items" :key="song.id" :context="album.uri" :song="song"/>
    </main> -->
  </main>
</template>

<script>
import Song from "./Song.vue";
export default {
  components: {
    Song
  },
  data() {
    return {
      artist: null
    };
  },
  watch: {
    '$route': 'getArtist'
  },
  mounted: function() {
      this.getArtist()
  },
  methods: {
    getArtist() {
      this.spotify.getArtist(this.$route.params.id).then(data => {
        this.artist = data.body;
      });
    }
  }
};
</script>

<style>
</style>
