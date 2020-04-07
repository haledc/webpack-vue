<template>
  <div class="nav">
    <router-link
      class="link"
      to="/home"
      style="
         {
          marginright: '10px';
        }
      "
    >
      Home
    </router-link>
    <router-link class="link" to="/about">About</router-link>
  </div>
</template>

<style scoped>
.nav .link {
  text-decoration: none;
}
</style>
