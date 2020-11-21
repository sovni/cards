<template>
  <div id="app">
    <Header style="max-width:1000px;margin: auto;"/>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Header
  }  
}
</script>

<style>
body {
  background-color : #dbdbdb;;
}
</style>
