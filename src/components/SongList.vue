<template>
  <div class="song-list">
    <header>
      <span>NAME<hr></span>
      <span>ARTIST<hr></span>
      <span>ALBUM<hr></span>
      <span>
        <font-awesome-icon icon="clock" size="1x"/><hr>
      </span>
    </header>
    <section class="songs">
      <Song v-for="song in songs" :key="song.id" :context="context" :song="song"/>
    </section>
  </div>
</template>

<script>
import Song from "@/components/Song";
export default {
  name: "SongList",
  props: ["songs", "context"],
  components: { Song }
};
</script>

<style>
</style>