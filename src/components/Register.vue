
<template>
   <div class="wrapper">
      <h1>Inscription</h1>
        <form @submit.prevent="registerUser">
         <InputText type="text" class="p-mb-2" placeholder="Prénom" v-model="userData.firstname" /><br>
         <InputText type="text" class="p-mb-2" placeholder="Nom" v-model="userData.lastname" /><br>
         <InputText type="text" class="p-mb-2" placeholder="Pseudo" v-model="userData.username" /><br>
         <InputText type="email" class="p-mb-2" placeholder="Email" v-model="userData.email" /><br>
         <InputText type="password" class="p-mb-2" placeholder="Mot de passe" v-model="userData.password" /><br>
         <Button type="submit" label="Créer le compte" />
        </form>
   </div>
</template>

<script>
import firebase from 'firebase'
import db from '../plugins/firebase'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

   export default {
      name: 'Register',
      data(){
         return{
            userData: {
               firstname: '',
               lastname: '',
               username: '',
               email: '',
               password: ''
            },
            successMessage: '',
            errorMessage: ''
         }
      },
      components: {
         InputText,
         Button
      },
      methods:{
         registerUser(){
            console.log("Register :" + this.userData.email);
            firebase.auth().createUserWithEmailAndPassword(this.userData.email, this.userData.password)
               .then(() => {
                  firebase.auth().currentUser.updateProfile({
                     displayName: this.userData.username
                  }).then(() => {
                     db.collection('users').add({
                        firstname: this.userData.firstname,
                        lastname: this.userData.lastname,
                        username: this.userData.username,
                        email: this.userData.email,
                     }).then(() => {
                        this.$router.replace('home');
                     }).catch(err => {
                        this.errorMessage = err.message;
                     });
                  }).catch(err => {
                     this.errorMessage = err.message;
                  });
               }).catch(err => {
                  this.errorMessage = err.message
               });
         }
      }
   }
</script>