<template>
    <router-link
        :to="route"
        tag="div"
        class="entity"
      >
        <img v-if="img" :src="img.url" alt="bild">
        <h2>{{name}}</h2>
      </router-link>
</template>

<script>
export default {
    props: ["name", "route", "img"]
}
</script>

<style>

</style>
