const SpotifyWebApi = require("spotify-web-api-node");

let scopes = ["user-read-private", "user-read-email"],
    redirectUri = "http://localhost:8080/callback",
    clientId = "115a0fafb3a7416b8dce3989aaba0653",
    state = "kork";

let spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: clientId
});