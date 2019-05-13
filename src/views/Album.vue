<template>
  <main v-if="album" class="album">
    <InfoHeader
      :name="album.name"
      :img="album.images[0].url"
      :artists="album.artists"
      :tracks="album.tracks.total"
    />
    <SongList :context="album.uri" :songs="album.tracks.items"/>
  </main>
</template>

<script>
import SongList from "@/components/SongList";
import InfoHeader from "@/components/InfoHeader";
export default {
  components: {
    InfoHeader,
    SongList
  },
  data() {
    return {
      album: null,
      playlists: null
    };
  },
  watch: {
    '$route': 'getAlbum'
  },
  mounted: function() {
      this.getAlbum()
      this.getPlaylists()
  },
  methods: {
    getAlbum() {
      this.spotify.getAlbum(this.$route.params.id).then(data => {
        this.album = data.body;
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
