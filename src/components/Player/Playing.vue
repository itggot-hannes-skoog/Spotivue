<template>
  <div class="playing">
    <router-link :to="`/${redirect.type}/${redirect.id}`">
      <img
        v-if="currentPlayback.item.album.images.length > 0"
        :src="currentPlayback.item.album.images[1].url"
        alt="cover"
      >
    </router-link>
    <div class="info" @click="$parent.active = !$parent.active">
      <div class="name">
        <h3>{{currentPlayback.item.name}}</h3>
      </div>
      <section class="artists">
        <router-link
          :to="`/artist/${artist.id}`"
          tag="h4"
          v-for="(artist, i) in currentPlayback.item.artists"
          :key="artist.id"
        >
          {{artist.name}}
          <template v-if="i !== (currentPlayback.item.artists.length-1)">•&nbsp;</template>
        </router-link>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentPlayback"],
  data() {
    return {
      redirect: null
    };
  },
  beforeMount: function() {
    this.getContext();
  },
  methods: {
    getContext() {
      let uri = this.currentPlayback.context.uri;
      uri = uri.split(":");
      let redirect = {
        id: null,
        type: null
      };
      switch (true) {
        case uri.includes("playlist"):
          redirect.id = uri[4];
          redirect.type = uri[3];
          break;
        case uri.includes("artist"):
          redirect.id = uri[2];
          redirect.type = uri[1];
          break;
        case uri.includes("album"):
          redirect.id = uri[2];
          redirect.type = uri[1];
          break;
        default:
          redirect.id = this.currentPlayback.item.album.id;
          redirect.type = "album";
          break;
      }
      this.redirect = redirect;
    }
  }
};
</script>

<style>
</style>
