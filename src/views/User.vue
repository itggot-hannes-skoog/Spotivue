<template>
  <main v-if="user" class="user">
    <InfoHeader
      :name="user.display_name"
      :img="user.images[0].url"
      :followers="user.followers.total"
    />
    <section class="playlists">
      <Entity
        :route="`/playlist/${playlist.id}`"
        v-for="playlist in playlists"
        :key="playlist.id"
        :img="playlist.images[0]"
        :name="playlist.name"
        class="playlist big"
        />
    </section>
  </main>
</template>

<script>
import InfoHeader from "@/components/InfoHeader";
import Entity from "@/components/Entity";
export default {
  components: {
    InfoHeader,
    Entity
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
