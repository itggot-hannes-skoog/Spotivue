<template>
  <main v-if="result" class="search">
    <SongList :songs="result.tracks.items"/>
    <h1>Artists</h1>
    <hr>
    <section class="artists">
      <Entity
        :route="`/artist/${artist.id}`"
        v-for="artist in result.artists.items"
        :key="artist.id"
        :img="artist.images[0]"
        :name="artist.name"
        class="artist big"
      />
    </section>
    <h1>Albums</h1>
    <hr>
    <section class="albums">
      <Entity
        :route="`/album/${album.id}`"
        v-for="album in result.albums.items"
        :key="album.id"
        :img="album.images[0]"
        :name="album.name"
        class="album big"
      />
    </section>
  </main>
</template>

<script>
import Song from "@/components/Song";
import SongList from "@/components/SongList";
import Entity from "@/components/Entity";
export default {
  components: { Song, Entity, SongList },
  data() {
    return {
      result: null
    };
  },
  mounted: function() {
    this.search();
  },
  methods: {
    search() {
      this.spotify
        .search(this.$route.params.str, ["track", "artist", "album"], {
          limit: 5
        })
        .then(data => {
          this.result = data.body;
        });
    }
  },
  watch: {
    $route: "search"
  }
};
</script>

<style>
</style>
