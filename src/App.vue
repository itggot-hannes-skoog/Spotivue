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
import { setTimeout } from "timers";

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
    if (tokens.access_token) {
      this.loggedIn = true;
      this.refresh_token = tokens.refresh_token;
      this.spotify.setAccessToken(tokens.access_token);
      this.spotify.getMe().then(data => {
        this.user = data.body;
      });
      this.initSDK(tokens.access_token);
      setTimeout(() => {
        this.refreshToken()
      }, tokens.expires_in*10)
    }
  },
  methods: {
    refreshToken() {
      console.log("jdisji")
    },
    initSDK(token) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new Spotify.Player({
          name: "Spotivue",
          getOAuthToken: cb => {
            cb(token);
          }
        });

        // Error handling
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

        // Playback status updates
        player.addListener("player_state_changed", state => {
          console.log(state);
        });

        // Ready
        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
        });

        // Not Ready
        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        // Connect to the player!
        player.connect();
      };
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/main.scss";
</style>
