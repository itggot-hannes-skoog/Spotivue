<template>
  <div class="user">
    <section class="info">
      <h1>{{this.user.display_name}}</h1>
      <img :src="this.user.images[0].url" alt="profile picture">
    </section>
    <section class="playlists">
        <router-link
        :to="`/playlist/${playlist.id}`"
        tag="div"
        v-for="playlist in playlists"
        :key="playlist.id"
        class="playlist"
      >
        <h2>{{playlist.name.toUpperCase()}}</h2>
        <img :src="playlist.images[0].url" alt="bild">
      </router-link>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      playlists : null
    };
  },
  watch: {
    $route: "getUser"
  },
  mounted: function() {
    this.getUser();
    this.getPlaylists()
  },
  methods: {
    getUser() {
      this.spotify.getUser(this.$route.params.id).then(data => {
        this.user = data.body;
      });
    },
    getPlaylists() {
      this.spotify.getUserPlaylists(this.$route.params.id).then(data => {
        this.playlists = data.body.items;
      });
    }
  }
};
</script>

<style>
</style>
