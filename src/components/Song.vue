<template>
  <div class="song">
    <i class="play" @click="play(song.uri)">
      <font-awesome-icon icon="play-circle" size="2x"/>
    </i>
    <h2>{{song.name}}</h2>
    <section class="artists">
      <router-link
        :to="`/artist/${artist.id}`"
        tag="h4"
        v-for="(artist, i) in song.artists"
        :key="artist.id"
      >
        {{artist.name}}
        <template v-if="i !== (song.artists.length-1)">•&nbsp;</template>
      </router-link>
    </section>
    <router-link
      class="album"
      tag="h4"
      :to="`/album/${song.album.id}`"
      v-if="song.album"
    >{{song.album.name}}</router-link>
    <h3>{{moment.utc(song.duration_ms).format('mm:ss')}}</h3>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "song",
  props: ["song", "context"],
  data() {
    return {
      moment: moment
    };
  },
  methods: {
    play(uri) {
      this.spotify.play({ context_uri: this.context, offset: { uri: uri } });
      this.$root.$emit("songPlay");
    }
  }
};
</script>

<style>
</style>
