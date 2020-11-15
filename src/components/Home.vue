<template>
   <div class="wrapper">
      <h1>Home Component</h1>
      <button label="Test" @click="debugButton">Test</button>
      <Button label="Test" @click="debugButton">Test2</Button>

   </div>
</template>

<script>
import Button from 'primevue/button';

   export default {
      name: 'Home',
      components: {
         Button
      },
      methods: {
         debugButton() {
            console.log("test");
         }
      }        
   }
</script>