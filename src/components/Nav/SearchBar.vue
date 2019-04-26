<template>
  <div class="search-bar">
      <input v-on:keyup.enter="search()" placeholder="Search..." v-model="search_str" type="text">
  </div>
</template>

<script>
export default {
  data() {
    return {
      search_str: ""
    };
  },
  methods: {
    search() {
      let str = this.search_str
      this.$router.push({ name: 'Search', params: {str}})
    }
  }
};
</script>

<style>
</style>
