<template>
  <section id="top-nav">
    <router-link to="/" tag="div" class="logo">
      <img src="@/assets/hannes.png" alt="logo">
    </router-link>
    <Playlists/>
    <Login v-if="!$parent.isLoggedin"/>
    <UserInfo/>
  </section>
</template>

<script>
import Login from "./Login";
import Playlists from "./Playlists";
import UserInfo from "./UserInfo";

export default {
  components: { Login, UserInfo, Playlists }
};
</script>

<style>
</style>
