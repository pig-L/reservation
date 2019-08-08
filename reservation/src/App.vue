<template>
  <div id="app">
    <router-view/>
    <common-nav></common-nav>
  </div>
</template>

<script>
import CommonNav from './components/CommonNav.vue'
export default {
  name: 'App',
  components: {
    CommonNav
  }
}
</script>

<style lang="scss">
  @import './style/flexible.css';
  @import './style/base.scss';
  @import './style/dailog.scss';
  html,body{
    width: 100%;
    height:100%;
  }
  #app {
    width:100%;
    height:100%;
    position:relative;
  }
</style>
