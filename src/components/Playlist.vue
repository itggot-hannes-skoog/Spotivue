<template>
  <div class="playlist">
    <header>
      <h1>Playlist {{$route.params.id}}</h1>
    </header>
    <main class="songs">
      <Song v-for="song in songs" :key="song.id" :song="song"/>
    </main>
  </div>
</template>

<script>
import Song from "./Song.vue";
export default {
  components: {
    Song
  },
  data() {
    return {
      songs: [
          { id: 1, name: "låt1", length: 189545 },
          { id: 2, name: "låt2", length: 239545 },
          { id: 3, name: "låt3", length: 203445 },
          { id: 4, name: "låt4", length: 309545 },
          ]
    };
  }
};
</script>

<style>
</style>
