<template>
  <div @contextmenu.prevent="$refs.options.open" class="song">
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

    <vue-context class="options" ref="options">
      <ul>
        <li>Add queue</li>
        <li class="multi">
          Add to playlist
          <ul class="v-context">
            <li
              @click="addToPlaylist(playlist)"
              v-for="playlist in playlists"
              :key="playlist.id"
            >{{playlist.name}}</li>
          </ul>
        </li>
        <li @click="removeFromPlaylist()" v-if="isPlaylist()">Remove from playlist</li>
      </ul>
    </vue-context>
  </div>
</template>

<script>
import moment from "moment";
import { VueContext } from "vue-context";
export default {
  name: "song",
  props: ["song", "context", "playlists"],
  components: {
    VueContext
  },
  data() {
    return {
      moment: moment
    };
  },
  methods: {
    play(uri) {
      this.spotify.play({ context_uri: this.context, offset: { uri: uri } });
      this.$root.$emit("songPlay");
    },
    addToPlaylist(playlist) {
      this.spotify.addTracksToPlaylist(playlist.id, [this.song.uri]);
    },
    isPlaylist() {
      if (this.context) return this.context.includes("playlist");
      else return false;
    },
    removeFromPlaylist(playlist) {
      this.spotify.removeTracksFromPlaylist(this.$route.params.id, [
        { uri: this.song.uri }
      ]);
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};
</script>

<style>
</style>
