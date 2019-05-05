<template>
  <div v-if="playlists" class="playlists">
    <vue-custom-scrollbar class="scroll-area" :settings="{suppressScrollY: true}">
      <Entity
        v-for="playlist in playlists"
        :key="playlist.id"
        class="playlist"
        @click.native="$parent.navDown = false"
        :name="playlist.name"
        :route="`/playlist/${playlist.id}`"
        :img="playlist.images[0]"
      />
    </vue-custom-scrollbar>
  </div>
</template>

<script>
import vueCustomScrollbar from "vue-custom-scrollbar";
import Entity from "@/components/Entity";
export default {
  components: {
    vueCustomScrollbar,
    Entity
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