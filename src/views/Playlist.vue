<template>
  <main v-if="playlist" class="playlist">
    <InfoHeader
      :name="playlist.name"
      :img="playlist.images[0].url"
      :owner="playlist.owner"
      :followers="playlist.followers.total"
      :tracks="playlist.tracks.total"
    />
    <main class="songs">
      <Song
        :playlists="playlists"
        v-for="song in playlist.tracks.items"
        :key="song.track.id"
        :context="playlist.uri"
        :song="song.track"
      />
    </main>
  </main>
</template>

<script>
import Song from "@/components/Song.vue";
import InfoHeader from "@/components/InfoHeader";
export default {
  components: {
    Song,
    InfoHeader
  },
  data() {
    return {
      playlist: null,
      playlists: null
    };
  },
  watch: {
    $route: "getPlaylist"
  },
  mounted: function() {
    this.getPlaylist();
    this.getPlaylists();
  },
  methods: {
    getPlaylist() {
      this.spotify.getPlaylist(this.$route.params.id).then(data => {
        this.playlist = data.body;
      });
    },
    getPlaylists() {
      this.spotify.getUserPlaylists().then(data => {
        this.playlists = data.body.items;
      });
    }
  }
};
</script>

<style>
</style>
