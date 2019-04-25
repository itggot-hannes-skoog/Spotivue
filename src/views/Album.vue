<template>
  <main v-if="album" class="album">
    <InfoHeader
      :name="album.name"
      :img="album.images[0].url"
      :artists="album.artists"
      :tracks="album.tracks.total"
    />
    <main class="songs">
      <Song v-for="song in album.tracks.items" :key="song.id" :context="album.uri" :song="song"/>
    </main>
  </main>
</template>

<script>
import Song from "@/components/Song";
import InfoHeader from "@/components/InfoHeader";
export default {
  components: {
    Song,
    InfoHeader
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
