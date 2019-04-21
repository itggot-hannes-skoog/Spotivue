<template>
  <router-link
    v-if="this.$parent.$parent.user"
    class="user"
    tag="div"
    :to="`/user/${this.$parent.$parent.user.id}`"
  >
    <h3>{{this.$parent.$parent.user.display_name}}</h3>
    <img :src="this.$parent.$parent.user.images[0].url" alt="profile picture">
  </router-link>
</template>

<script>
export default {};
</script>

<style>
</style>
