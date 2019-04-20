<template>
  <div class="song">
    <i class="play" @click="play(song.id)">
      <font-awesome-icon icon="play-circle" size="2x"/>
    </i>
    <h2>{{song.name}}</h2>
    <h3>{{moment.utc(song.length).format('mm:ss')}}</h3>
  </div>
</template>

<script>
import moment from "moment";
import api from "@/api"
export default {
  name: "song",
  props: ["song"],
  data() {
    return {
      moment: moment
    };
  },
  methods: {
      play(id) {
          api.player.play(id)
      }
  }
};
</script>

<style>
</style>
