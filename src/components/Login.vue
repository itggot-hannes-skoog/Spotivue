<template>
  <button @click="auth">Login</button>
</template>

<script>
var SpotifyWebApi = require("spotify-web-api-node");
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

      console.log(authorizeURL);

      window.open(authorizeURL, "_self");

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
    test() {
      
    }
  }
};
</script>

<style>
</style>
