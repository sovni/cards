<template>
   <div class="wrapper">
      <h1>Login Component</h1>
      <h1>{{ this.$store.state.authStore.test }}</h1>
   </div>
</template>

<script>
   export default {
      name: 'Login'
   }
</script>