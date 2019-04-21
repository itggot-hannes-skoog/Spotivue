<template>
  <main id="callback">
    <h1>Callback</h1>
  </main>
</template>

<script>
export default {
  name: "Callback",
  beforeMount: function() {
    if (this.$route.query.access_token) {
      this.$session.start();
      this.$session.set("token", this.$route.query.access_token);
    }
  },
  mounted: function() {
    window.location.replace("http://localhost:8080");
  }
};
</script>

<style>
</style>
