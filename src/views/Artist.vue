<template>
  <main v-if="artist" class="artist">
    <InfoHeader :name="artist.name" :img="artist.images[0].url"/>
    <SongList :songs="topTracks" :context="artist.uri"/>
    <section v-if="albums.length != 0" class="albums">
      <h1>Albums</h1>
      <hr>
      <div class="container">
        <Entity
          :route="`/album/${album.id}`"
          v-for="album in albums"
          :key="album.id"
          class="album big"
          :name="album.name"
          :img="album.images[0]"
        />
      </div>
    </section>
    <section v-if="singles.length != 0" class="singles">
      <h1>Singles</h1>
      <hr>
      <div class="container">
        <Entity
          :route="`/album/${single.id}`"
          v-for="single in singles"
          :key="single.id"
          class="single big"
          :name="single.name"
          :img="single.images[0]"
        />
      </div>
    </section>
    <section v-if="appears_on.length != 0" class="appears-on">
      <h1>Appears On</h1>
      <hr>
      <div class="container">
        <Entity
          :route="`/album/${item.id}`"
          v-for="item in appears_on"
          :key="item.id"
          class="item big"
          :name="item.name"
          :img="item.images[0]"
        />
      </div>
    </section>
  </main>
</template>

<script>
import Song from "@/components/Song";
import SongList from "@/components/SongList";
import InfoHeader from "@/components/InfoHeader";
import Entity from "@/components/Entity";
export default {
  components: {
    Song,
    InfoHeader,
    Entity,
    SongList
  },
  data() {
    return {
      artist: null,
      topTracks: null,
      albums: null,
      singles: null,
      playlists: null,
      appears_on: null
    };
  },
  watch: {
    $route: "getArtist",
    artist: function() {
      this.getTopTracks();
      this.getAlbums();
      this.getPlaylists();
    },
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
      let appears_on = [];
      this.spotify.getArtistAlbums(this.artist.id).then(data => {
        data.body.items.forEach(item => {
          if (item.album_group == "album") {
            albums.push(item);
          } else if (item.album_group == "single") {
            singles.push(item);
          } else {
            appears_on.push(item);
          }
        });
        this.appears_on = appears_on;
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
