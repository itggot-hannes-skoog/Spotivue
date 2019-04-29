<template>
  <section id="nav">
    <router-link to="/" tag="div" class="logo">
      <img src="@/assets/logo.png" alt="logo">
    </router-link>
    <font-awesome-icon @click="navDown = true" class="nav-btn" icon="bars" size="2x"/>
    <div :class="{active: navDown}" class="container">
      <Playlists/>
      <SearchBar/>
      <UserInfo/>
      <font-awesome-icon @click="navDown = false" class="close-btn" icon="times" size="2x"/>
    </div>
  </section>
</template>

<script>
import Playlists from "./Playlists";
import UserInfo from "./UserInfo";
import SearchBar from "./SearchBar";

export default {
  components: { SearchBar, UserInfo, Playlists },
  data() {
    return {
      navDown: false
    }
  }
};
</script>

<style>
</style>
