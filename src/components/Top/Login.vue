<template>
  <button @click="auth">Login</button>
</template>

<script>
const SpotifyWebApi = require("spotify-web-api-node");
import { access } from "fs";
import { setTimeout } from "timers";
export default {
  methods: {
    async auth() {
      let scopes = ["user-read-private", "user-read-email"],
        redirectUri = "http://localhost:8080/callback",
        clientId = "115a0fafb3a7416b8dce3989aaba0653",
        state = "kork";

      let spotifyApi = new SpotifyWebApi({
        redirectUri: redirectUri,
        clientId: clientId
      });

      let authorizeURL = await spotifyApi.createAuthorizeURL(scopes, state);

      let code = await this.getCode(authorizeURL);

      // DU MÅSTE GÖRA SERVERSODFJSDUH FISDFGIJS

      spotifyApi.authorizationCodeGrant(code).then(
        function(data) {
          console.log("The token expires in " + data.body["expires_in"]);
          console.log("The access token is " + data.body["access_token"]);
          console.log("The refresh token is " + data.body["refresh_token"]);

          // Set the access token on the API object to use it in later calls
          spotifyApi.setAccessToken(data.body["access_token"]);
          spotifyApi.setRefreshToken(data.body["refresh_token"]);
        },
        function(err) {
          console.log("Something went wrong!", err);
        }
      );
    },
    async getCode(authorizeURL) {
      let open = window.open(authorizeURL, "", "height=630 width=500");
      let found = false;
      let timer = await setInterval(() => {
        let urlParams = new URL(open.location).searchParams;
        let code = urlParams.get("code");
        if (code) {
          clearInterval(timer);
          open.close();
          return code;
        }
      }, 2000);
    },
    async test() {
      let scopes = ["user-read-private", "user-read-email"],
        redirectUri = "http://localhost:8080/callback",
        clientId = "115a0fafb3a7416b8dce3989aaba0653",
        state = "kork",
        authorizationUri = "https://accounts.spotify.com/authorize",
        accessTokenUri = "https://accounts.spotify.com/api/token";

      var auth = new ClientOAuth2({
        clientId: clientId,
        accessTokenUri: accessTokenUri,
        authorizationUri: authorizationUri,
        redirectUri: redirectUri,
        state: state,
        scopes: scopes
      });
      console.log(auth);
    }
  }
};
</script>

<style>
</style>
