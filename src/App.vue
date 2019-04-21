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
import api from "@/api";

export default {
  name: "spotivue",
  components: { TopNav, BottomNav },
  data() {
    return {
      loggedIn: false,
      refresh_token: null,
      user: null
    };
  },
  beforeMount: function() {
    let access_token = this.$session.get("token")
    if (access_token) {
      this.loggedIn = true;
      this.refresh_token = access_token;
      this.spotify.setAccessToken(access_token);
      this.spotify.getMe().then(data => {
        this.user = data.body;
      });
    }
  },
  methods: {}
};
</script>

<style lang="scss">
@import "@/scss/main.scss";
</style>
