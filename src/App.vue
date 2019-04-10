<template>
  <div id="app">
    <TopNav/>
    <main>
      <router-view></router-view>
    </main>
    <BottomNav/>
  </div>
</template>

<script>
import TopNav from "@/components/Top/TopNav";
import BottomNav from "@/components/Bottom/BottomNav";

export default {
  name: "spotivue",
  components: { TopNav, BottomNav },
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
