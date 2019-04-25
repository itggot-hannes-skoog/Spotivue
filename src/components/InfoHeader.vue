<template>
  <header class="info-header">
    <img v-if="img" :src="img" alt="image">
    <section class="info">
      <h1 class="name" v-if="name">{{name}}</h1>
      <h3 class="owner">{{owner}}</h3>
      <section v-if="artists" class="artists">
        <router-link
          :to="`/artist/${artist.id}`"
          tag="h3"
          class="artist"
          v-for="(artist, i) in artists"
          :key="artist.id"
        >
          {{artist.name}}
          <template v-if="i !== (artists.length-1)">,&nbsp;</template>
        </router-link>
      </section>
      <h3 class="tracks" v-if="tracks">{{tracks}} tracks</h3>
      <h3 class="followers" v-if="followers">{{followers}} followers</h3>
    </section>
  </header>
</template>

<script>
export default {
  props: ["name", "owner", "tracks", "followers", "img", "artists"],
  name: "InfoHeader"
};
</script>

<style>
</style>
