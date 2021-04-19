<template>
  <div id="nav" class="">
    <nav-bar></nav-bar>
  </div>
  <router-view/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@100;200;300;400;500;600;700;800;900&display=swap');
* {
  font-family: 'Kanit', sans-serif;
}
</style>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  components: {
    NavBar,
  }
}
</script>