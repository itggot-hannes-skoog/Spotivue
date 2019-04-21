<template>
    <section id="top-nav">
        <Playlists/>
        <Login/>
        <UserInfo/>
    </section>
</template>

<script>
import Login from "./Login"
import Playlists from "./Playlists"
import UserInfo from "./UserInfo"

export default {

    components: {Login, UserInfo, Playlists}

}
</script>

<style>

</style>
