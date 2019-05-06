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
    let tokens = this.$session.get("tokens");
    if (tokens) {
      this.loggedIn = true;
      this.refresh_token = tokens.refresh_token;
      this.spotify.setAccessToken(tokens.access_token);
      this.spotify.getMe().then(data => {
        this.user = data.body;
      });
      this.initSDK(tokens.access_token);
    }
  },
  methods: {
    initSDK(token) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new Spotify.Player({
          name: "Spotivue",
          getOAuthToken: cb => {
            cb(token);
          }
        });

        player.addListener("initialization_error", ({ message }) => {
          console.error(message);
        });
        player.addListener("authentication_error", ({ message }) => {
          console.error(message);
        });
        player.addListener("account_error", ({ message }) => {
          console.error(message);
        });
        player.addListener("playback_error", ({ message }) => {
          console.error(message);
        });

        player.addListener("player_state_changed", state => {
          console.log(state);
        });

        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
        });

        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        player.connect();
      };
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/main.scss";
</style>
