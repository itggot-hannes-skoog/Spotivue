<template>
  <main class="home">
    <Login v-if="!this.$parent.loggedIn"/>
    <div v-if="newReleases && featuredPlaylists" class="content">
      <h1>New Releases</h1>
      <hr>
      <section class="new-releases">
        <Entity
          :route="`/album/${album.id}`"
          v-for="album in newReleases.items"
          :key="album.id"
          class="album big"
          :name="album.name"
          :img="album.images[0]"
        />
      </section>
      <h1>Featured Playlists</h1>
      <hr>
      <section class="featured-playlists">
        <Entity
          :route="`/playlist/${playlist.id}`"
          v-for="playlist in featuredPlaylists.items"
          :key="playlist.id"
          class="playlist big"
          :name="playlist.name"
          :img="playlist.images[0]"
        />
      </section>
    </div>
  </main>
</template>

<script>
import Login from "@/components/Login";
import Entity from "@/components/Entity";
export default {
  components: { Login, Entity },
  data() {
    return {
      newReleases: null,
      featuredPlaylists: null
    };
  },
  beforeMount: function() {
    this.getNewReleases();
    this.getFeaturedPlaylists()
  },
  methods: {
    getNewReleases() {
      this.spotify.getNewReleases("SV").then(data => {
        this.newReleases = data.body.albums;
      });
    },
    getFeaturedPlaylists() {
      this.spotify.getFeaturedPlaylists("SV").then(data => {
        this.featuredPlaylists = data.body.playlists;
      });
    }
  }
};
</script>

<style>
</style>
