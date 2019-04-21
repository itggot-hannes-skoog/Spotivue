<template>
  <div class="playlist">
    <header>
      <h1>{{this.playlist.name}}</h1>
    </header>
    <main class="songs">
      <Song v-for="song in playlist.tracks.items" :key="song.track.id" :context="playlist.uri" :song="song"/>
    </main>
  </div>
</template>

<script>
import Song from "./Song.vue";
export default {
  components: {
    Song
  },
  data() {
    return {
      playlist: null
    };
  },
  watch: {
    '$route': 'getPlaylists'
  },
  mounted: function() {
      this.getPlaylists()
  },
  methods: {
    getPlaylists() {
      this.spotify.getPlaylist(this.$route.params.id).then(data => {
        this.playlist = data.body;
      });
    }
  }
};
</script>

<style>
</style>
