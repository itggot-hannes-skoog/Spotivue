<template>
  <main v-if="playlist" class="playlist">
    <InfoHeader
      :name="playlist.name"
      :img="playlist.images[0].url"
      :owner="playlist.owner"
      :followers="playlist.followers.total"
      :tracks="playlist.tracks.total"
    />
    <SongList :context="playlist.uri" :songs="playlist.tracks.items"/>
  </main>
</template>

<script>
import Song from "@/components/Song.vue";
import SongList from "@/components/SongList.vue";
import InfoHeader from "@/components/InfoHeader";
export default {
  components: {
    Song,
    InfoHeader,
    SongList
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
