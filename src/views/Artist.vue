<template>
  <main v-if="artist" class="artist">
    <InfoHeader
      :name="artist.name"
      :img="artist.images[0].url"
    />
    <!-- <main class="songs">
      <Song v-for="song in album.tracks.items" :key="song.id" :context="album.uri" :song="song"/>
    </main> -->
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
