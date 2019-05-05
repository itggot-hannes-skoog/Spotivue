<template>
  <main v-if="artist" class="artist">
    <InfoHeader :name="artist.name" :img="artist.images[0].url"/>
    <main class="songs">
      <Song :playlists="playlists" v-for="song in topTracks" :key="song.id" :song="song"/>
    </main>
    <h1>Albums</h1>
    <hr>
    <section class="albums">
      <Entity
        :route="`/album/${album.id}`"
        v-for="album in albums"
        :key="album.id"
        class="album big text"
        :name="album.name"
        :img="album.images[0]"
      />
    </section>
    <h1>Singles</h1>
    <hr>
    <section class="singles">
      <Entity
        :route="`/album/${single.id}`"
        v-for="single in singles"
        :key="single.id"
        class="single big text"
        :name="single.name"
        :img="single.images[0]"
      />
    </section>
  </main>
</template>

<script>
import Song from "@/components/Song";
import InfoHeader from "@/components/InfoHeader";
import Entity from "@/components/Entity";
export default {
  components: {
    Song,
    InfoHeader,
    Entity
  },
  data() {
    return {
      artist: null,
      topTracks: null,
      albums: null,
      singles: null,
      playlists: null
    };
  },
  watch: {
    $route: "getArtist",
    artist: function() {
      this.getTopTracks();
      this.getAlbums();
      this.getPlaylists();
    }
  },
  mounted: function() {
    this.getArtist();
  },
  methods: {
    getArtist() {
      this.spotify.getArtist(this.$route.params.id).then(data => {
        this.artist = data.body;
      });
    },
    getTopTracks() {
      this.spotify.getArtistTopTracks(this.artist.id, "SV").then(data => {
        this.topTracks = data.body.tracks;
      });
    },
    getAlbums() {
      let albums = [];
      let singles = [];
      this.spotify.getArtistAlbums(this.artist.id).then(data => {
        data.body.items.forEach(item => {
          if (item.album_group == "album") {
            albums.push(item);
          } else {
            singles.push(item);
          }
        });
        this.albums = albums;
        this.singles = singles;
      });
    },
    getPlaylists() {
      this.spotify.getUserPlaylists().then(data => {
        this.playlists = data.body.items;
      });
    }
  }
};
</script>

<style>
</style>
