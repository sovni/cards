<template>
   <div class="wrapper">
      <h1>Mon Compte</h1>
     <form @submit.prevent="changePseudo">
         <div class="p-d-inline-flex p-flex-column p-jc-center">
            <div class="p-mb-2">
               <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                     <i class="pi pi-user"></i>
                  </span>
                  <InputText type="text" placeholder="Email"  v-model="username"/>
               </div>
            </div>
            <div class="p-mb-2">
                  <Button type="submit" label="Modifier" />
            </div>
         </div>
     </form>
   </div>
</template>

<script>
import firebase from 'firebase';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

//import db from '../plugins/firebase';

   export default {
      name: 'Pseudo',
      data(){
         return{
            username: ''
         }
      },
      components: {
         InputText,
         Button
      },
      mounted() {
        this.username = firebase.auth().currentUser.displayName;
      },         
      methods: {
         changePseudo(){
            firebase.auth().currentUser.updateProfile({
                displayName: this.username
            });
         }
      }
   }
</script>