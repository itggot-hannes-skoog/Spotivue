<template>
  <section id="top-nav">
    <router-link to="/" tag="div" class="logo">
      <img src="@/assets/logo.png" alt="logo">
    </router-link>
    <Playlists/>
    <SearchBar/>
    <UserInfo/>
  </section>
</template>

<script>
import Playlists from "./Playlists";
import UserInfo from "./UserInfo";
import SearchBar from "./SearchBar";

export default {
  components: { SearchBar, UserInfo, Playlists }
};
</script>

<style>
</style>
