<template>
  <main v-if="artist" class="artist">
    <InfoHeader
      :name="artist.name"
      :img="artist.images[0].url"
    />
    <main class="songs">
      <Song v-for="song in topTracks" :key="song.id" :song="song"/>
    </main>
    <section class="albums">
      <h1>Albums</h1>
      <router-link
        :to="`/album/${album.id}`"
        tag="div"
        v-for="album in albums"
        :key="album.id"
        class="album"
      >
        <h2>{{album.name.toUpperCase()}}</h2>
        <img v-if="album.images.length > 0" :src="album.images[0].url" alt="bild">
      </router-link>
    </section>
    <section class="singles">
      <h1>Singles</h1>
      <router-link
        :to="`/album/${single.id}`"
        tag="div"
        v-for="single in singles"
        :key="single.id"
        class="album"
      >
        <h2>{{single.name.toUpperCase()}}</h2>
        <img v-if="single.images.length > 0" :src="single.images[0].url" alt="bild">
      </router-link>
    </section>
  </main>
</template>

<script>
import Song from "@/components/Song";
import InfoHeader from "@/components/InfoHeader";
export default {
  components: {
    Song,
    InfoHeader
  },
  data() {
    return {
      artist: null,
      topTracks: null,
      albums: null,
      singles: null
    };
  },
  watch: {
    '$route': 'getArtist',
    artist: function() {
      this.getTopTracks()
      this.getAlbums()
    }
  },
  mounted: function() {
      this.getArtist()
  },
  methods: {
    getArtist() {
      this.spotify.getArtist(this.$route.params.id).then(data => {
        this.artist = data.body;
      });
    },
    getTopTracks() {
      this.spotify.getArtistTopTracks(this.artist.id, 'SV').then(data => {
        this.topTracks = data.body.tracks
      })
    },
    getAlbums() {
      let albums = []
      let singles = []
      this.spotify.getArtistAlbums(this.artist.id).then(data => {
        data.body.items.forEach(item => {
          if (item.album_group == 'album') {
            albums.push(item)
          } else {
            singles.push(item)
          }
        })
        this.albums = albums
        this.singles = singles
      })
    }
  }
};
</script>

<style>
</style>
