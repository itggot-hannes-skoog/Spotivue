<template>
  <div id="app">
    <Nav/>
    <main>
      <router-view></router-view>
    </main>
    <Player/>
  </div>
</template>

<script>
import Nav from "@/components/Nav/Nav";
import Player from "@/components/Player/Player";

export default {
  name: "spotivue",
  components: { Nav, Player },
  data() {
    return {
      loggedIn: false,
      refresh_token: null,
      user: null
    };
  },
  created: function() {
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
