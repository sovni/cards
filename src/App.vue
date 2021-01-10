<template>
  <div id="app">
    <Header style="max-width:1000px;margin: auto;"/>
    <router-view></router-view>
  </div>
<Toast group="bottom-center" position="bottom-center"  />
<Toast group="top-right" position="top-right"  />
</template>

<script>
import Header from './components/Header'
import Toast from 'primevue/toast';

export default {
  name: 'App',
  components: {
    Header,
    Toast
  }  
}
</script>

<style>
body {
  background-color : #dbdbdb;;
}
</style>
