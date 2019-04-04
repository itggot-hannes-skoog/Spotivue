<template>
  <div id="app">
    <h1>Spotivue</h1>
    <button @click="auth()">test</button>
  </div>
</template>

<script>
export default {
  name: "spotivue",
  components: {},
  methods: {
    async auth() {
      let baseUrl = "https://accounts.spotify.com/authorize";
      let req = {
        client_id: "115a0fafb3a7416b8dce3989aaba0653",
        response_type: "code",
        redirect_uri: "localhost:8080"
      };
      let res = await this.$http.get(baseUrl, { params: req });
      console.log(res);
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/main.scss";
</style>
