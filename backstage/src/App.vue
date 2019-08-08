<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import './style/flexible.css';
html,body{
  width:100%;
  height:100%;
  overflow: hidden;
}
#app {
  width:100%;
  height:100%;
}
</style>
