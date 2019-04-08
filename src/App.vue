<template>
  <div id="app">
    <TopNav/>
    <main>
      <router-view></router-view>
    </main>
    <Player/>
  </div>
</template>

<script>
import TopNav from "@/components/TopNav";
import Player from "@/components/Player";

export default {
  name: "spotivue",
  components: { TopNav, Player },
  data() {
    return {
      loggedIn: false,
      auth: null
    }
  },
  methods: {
  }
};
</script>

<style lang="scss">
@import "@/scss/main.scss";
</style>
