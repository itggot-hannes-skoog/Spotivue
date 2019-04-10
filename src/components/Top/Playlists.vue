<template>
  <div class="playlists">
    <div v-if="true" class="container">
      <div v-for="item in data" :key="item" class="playlist">
        <img src="@/assets/hannes.png" alt="bild">
        <h2>Playlist</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [1, 2, 3, 4, 5, 6, 7, 8]
    };
  }
};
</script>

<style>
</style>
