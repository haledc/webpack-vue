<template>
  <div class="nav">
    <router-link class="link" to="/home" style="{ marginRight: '10px'}">
      Home
    </router-link>
    <router-link class="link" to="/about">About</router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
.nav
  .link
    text-decoration: none
</style>
