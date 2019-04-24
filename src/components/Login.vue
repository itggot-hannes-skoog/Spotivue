<template>
  <a v-if="!this.$parent.$parent.loggedIn" href="http://localhost:8888/login">
    <button>Login</button>
  </a>
</template>

<script>
export default {
  methods: {}
};
</script>

<style>
</style>
