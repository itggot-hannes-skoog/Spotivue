<template>
  <div class="song">
    <i class="play" @click="play(song.track.uri)">
      <font-awesome-icon icon="play-circle" size="2x"/>
    </i>
    <h2>{{song.track.name}}</h2>
    <section class="artists">
      <h4 v-for="artist in song.track.artists" :key="artist.id">{{artist.name}}</h4>
    </section>
    <h4>{{song.track.album.name}}</h4>
    <h3>{{moment.utc(song.track.duration_ms).format('mm:ss')}}</h3>
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
    }
  }
};
</script>

<style>
</style>
