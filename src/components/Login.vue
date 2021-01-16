<template>
   <div class="wrapper">
      <h1>Connection</h1>
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
                  <InputText placeholder="Mot de passe" type="password" v-model="userpassword"/>
               </div>
            </div>
            <div class="p-mb-2">
                  <Button type="submit" label="Connection" />
            </div>
         </div>
     </form>
     <Button label="Connection avec un compte Google" @click="glogin"/>

   </div>
</template>

<script>
import firebase from 'firebase';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import db from '../plugins/firebase';

   export default {
      name: 'Login',
      data(){
         return{
            useremail: '',
            username: '',
            userpassword: '',
            usertoken: '',
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
                  this.username = user.user.displayName.split(" ")[0];
                  console.log("Login name :" + this.username);
                  this.$router.replace({ name: "Dashboard" });

               })
               .catch(err => {
                  this.errorMessage = err.message
               });
         },
         glogin(){
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then((result) => {
               // This gives you a Google Access Token. You can use it to access the Google API.
               //this.usertoken = result.credential.accessToken;
               // The signed-in user info.
               console.log(result);
               this.username = result.user.displayName.split(" ")[0];
               this.useremail = result.user.email;
               console.log("Login done : " + this.useremail);
               // ...
               this.$router.replace({ name: "Dashboard" });
               db.collection("users").where("email", "==", this.username).get().then((doc) => {            
                  console.log("user found :" + doc.data().username);
               })
               .catch((error) => {
                     console.log("user not found  : " + error);
                     db.collection('users').add({
                        firstname: this.username,
                        lastname: '',
                        username: this.username,
                        email: this.useremail,
                     });
               });
            }).catch(function(error) {
               // Handle Errors here.
               //var errorCode = error.code;
               //this.errorMessage = error.message;
               // The email of the user's account used.
               //var email = error.email;
               // The firebase.auth.AuthCredential type that was used.
               //var credential = error.credential;
               // ...
               console.log("Login failed : " + error);
            });
         },
         debugButton(){
            console.log("Test pressed : "+this.useremail);
         }
      }
   }
</script>