<template>
  <main v-if="album" class="album">
    <header>
      <h1>{{album.name}}</h1>
            <img v-if="album.images.length > 0" :src="album.images[0].url" alt="picture">
    </header>
    <main class="songs">
      <Song v-for="song in album.tracks.items" :key="song.id" :context="album.uri" :song="song"/>
    </main>
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
      album: null
    };
  },
  watch: {
    '$route': 'getAlbum'
  },
  mounted: function() {
      this.getAlbum()
  },
  methods: {
    getAlbum() {
      this.spotify.getAlbum(this.$route.params.id).then(data => {
        this.album = data.body;
      });
    }
  }
};
</script>

<style>
</style>
