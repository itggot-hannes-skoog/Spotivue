<template>
  <div v-if="user" class="user">
    <InfoHeader
      :name="user.display_name"
      :img="user.images[0].url"
      :followers="user.followers.total"
    />
    <section class="playlists">
      <router-link
        :to="`/playlist/${playlist.id}`"
        tag="div"
        v-for="playlist in playlists"
        :key="playlist.id"
        class="playlist"
      >
        <h2>{{playlist.name.toUpperCase()}}</h2>
        <img v-if="playlist.images.length > 0" :src="playlist.images[0].url" alt="bild">
      </router-link>
    </section>
  </div>
</template>

<script>
import InfoHeader from "@/components/InfoHeader";
export default {
  components: {
    InfoHeader
  },
  data() {
    return {
      user: null,
      playlists: null
    };
  },
  watch: {
    $route: "getUser"
  },
  mounted: function() {
    this.getUser();
    this.getPlaylists();
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
