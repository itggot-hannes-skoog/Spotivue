<template>
  <div v-if="playlists" class="playlists">
    <vue-custom-scrollbar class="scroll-area" :settings="{suppressScrollY: true}">
      <router-link
        :to="`/playlist/${playlist.id}`"
        tag="div"
        v-for="playlist in playlists"
        :key="playlist.id"
        class="playlist"
      >
        <img v-if="playlist.images.length > 0" :src="playlist.images[0].url" alt="bild">
        <h2>{{playlist.name.toUpperCase()}}</h2>
      </router-link>
    </vue-custom-scrollbar>
  </div>
</template>

<script>
import vueCustomScrollbar from "vue-custom-scrollbar";
export default {
  components: {
    vueCustomScrollbar
  },
  data() {
    return {
      playlists: null
    };
  },
  beforeMount: function() {
    if (this.$parent.$parent.loggedIn) {
      this.spotify.getUserPlaylists().then(data => {
        this.playlists = data.body.items;
      });
    }
  }
};
</script>

<style>
</style>