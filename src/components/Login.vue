<template>

   <div class="wrapper">
      <h1>Login Component</h1>
     <form @submit.prevent="login">
         <div class="p-d-inline-flex p-flex-column p-jc-center">
            <div class="p-mb-2">
               <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                     <i class="pi pi-user"></i>
                  </span>
                  <InputText type="text" placeholder="Email"  v-model="useremail"/>
               </div>
            </div>
            <div class="p-mb-2">
               <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                     <i class="pi pi-lock"></i>
                  </span>
                  <InputText placeholder="Password" type="password" v-model="userpassword"/>

               </div>
            </div>
            <div class="p-mb-2">
                  <Button>Login</Button>
            </div>
         </div>

     </form>
                  <InputText type="text" placeholder="Test"  v-model="usertest"/>

                        <Button label="Test" v-on:click="debugButton()" />
   </div>
</template>

<script>
import firebase from 'firebase';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

//import db from '../plugins/firebase';

   export default {
      name: 'Login',
      data(){
         return{
            useremail: '',
            userpassword: '',
            usertest: '',
            successMessage: '',
            errorMessage: '',
            counter: 1
         }
      },
      components: {
         InputText,
         Button
      },         
      methods: {
         login(){
            console.log("Login done : " + this.useremail);
            firebase.auth().signInWithEmailAndPassword(this.useremail, this.userpassword)
               .then(user => {
                  console.log(user);
               })
               .catch(err => {
                  this.errorMessage = err.message
               });
         },
         debugButton(){
            console.log("Test pressed : "+this.useremail);
         }
      }
   }
</script>