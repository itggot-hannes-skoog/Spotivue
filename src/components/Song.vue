<template>
  <div @contextmenu.prevent="$refs.options.open" class="song">
    <i class="play" @click="play()">
      <font-awesome-icon icon="play-circle" size="2x"/>
    </i>
    <div class="ellipsis">
      <h2>{{fixedSong.name}}</h2>
    </div>
    <section class="artists">
      <router-link
        :to="`/artist/${artist.id}`"
        tag="h4"
        v-for="(artist, i) in fixedSong.artists"
        :key="artist.id"
      >
        {{artist.name}}
        <template v-if="i !== (fixedSong.artists.length-1)">•&nbsp;</template>
      </router-link>
    </section>
    <div v-if="fixedSong.album" class="ellipsis">
      <router-link
        class="album"
        tag="h4"
        :to="`/album/${fixedSong.album.id}`"
      >{{fixedSong.album.name}}</router-link>
    </div>
    <h3>{{moment.utc(fixedSong.duration_ms).format('mm:ss')}}</h3>

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
      moment: moment,
      fixedSong: null
    };
  },
  watch: {
    song: function() {
      this.ifTrack()
    }
  },
  beforeMount: function() {
    this.ifTrack();
  },
  methods: {
    play() {
      this.spotify.play({ context_uri: this.context, offset: { uri: this.fixedSong.uri } });
      this.$root.$emit("songPlay");
    },
    ifTrack() {
      if (this.song.track) {
        this.fixedSong = this.song.track;
      } else {
        this.fixedSong = this.song;
      }
    },
    addToPlaylist(playlist) {
      this.spotify.addTracksToPlaylist(playlist.id, [this.song.uri]);
    },
    isPlaylist() {
      if (this.context) return this.context.includes("playlist");
      else return false;
    },
    removeFromPlaylist() {
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
