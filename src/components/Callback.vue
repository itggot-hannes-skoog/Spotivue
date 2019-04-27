<template>
  <main id="callback"></main>
</template>

<script>
export default {
  name: "Callback",
  created: function() {
    const {
      access_token,
      refresh_token,
      expires_in,
      error
    } = this.$route.query;
    if (error) {
      console.error(error);
    } else if (access_token && refresh_token && expires_in) {
      this.$session.start();
      this.$session.set("tokens", {access_token, refresh_token, expires_in});
    }
    this.$router.push("/");
  }
};
</script>

<style>
</style>
