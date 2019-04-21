<template>
    <div v-if="this.$parent.$parent.user" class="user">
        <h3> {{this.$parent.$parent.user.display_name}} </h3>
        <img :src="this.$parent.$parent.user.images[0].url" alt="profile picture">
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
