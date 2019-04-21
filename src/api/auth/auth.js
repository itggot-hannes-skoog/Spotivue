import spotifyApi from "spotify-web-api-node"

export default {

    auth(token) {
        spotifyApi.setAccessToken(token);
    }

}