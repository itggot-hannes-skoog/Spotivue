<template>
  <main v-if="result" class="search">
      <main class="songs">
      <h1>Songs</h1>
          <Song v-for="song in result.tracks.items" :key="song.id" :song="song"/>
      </main>
      <section class="artists">
      <h1>Artists</h1>
          <router-link
        :to="`/artist/${artist.id}`"
        tag="div"
        v-for="artist in result.artists.items"
        :key="artist.id"
        class="artist"
      >
        <img v-if="artist.images.length > 0" :src="artist.images[0].url" alt="bild">
        <h2>{{artist.name}}</h2>
      </router-link>
      </section>
      <section class="albums">
      <h1>Albums</h1>
          <router-link
        :to="`/album/${album.id}`"
        tag="div"
        v-for="album in result.albums.items"
        :key="album.id"
        class="album"
      >
        <img v-if="album.images.length > 0" :src="album.images[0].url" alt="bild">
        <h2>{{album.name}}</h2>
      </router-link>
      </section>
  </main>
</template>

<script>
import Song from "@/components/Song"
export default {
    components: {Song},
  data() {
    return {
        result: null
    };
  },
  mounted: function() {
      this.search()
  },
  methods: {
    search() {
        this.spotify.search(this.$route.params.str, ['track', 'artist', 'album'], { limit : 5}).then(data => {
            this.result = data.body
        })
    }
  },
  watch: {
    '$route': 'search'
  }
};
</script>

<style>
</style>
