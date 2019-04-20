<template>
  <div class="playlists">
    <div v-if="true" class="container">
      <router-link
        :to="`/playlist/${playlist.id}`"
        tag="div"
        v-for="playlist in playlists"
        :key="playlist.id"
        class="playlist"
      >
        <img src="@/assets/hannes.png" alt="bild">
        <h2>{{playlist.name.toUpperCase()}}</h2>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playlists: [
        { id: 1, name: "playlist" },
        { id: 2, name: "playlist" },
        { id: 3, name: "playlist" },
        { id: 4, name: "playlist" }
      ]
    };
  }
};
</script>

<style>
</style>
