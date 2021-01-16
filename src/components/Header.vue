<template>
   <header>
      <Menubar :model="items" >
         <template #end>
            {{ getUserName() }}
            <AutoComplete v-model="friends" :suggestions="filteredFriends" field="username" @complete="searchFriends($event)" placeholder="Hint: type 'v' or 'f'" />
         </template>
      </Menubar>
   </header>
</template>

<script>
   import firebase from 'firebase'
   import Menubar from 'primevue/menubar';
   import AutoComplete from 'primevue/autocomplete';
   import db from '../plugins/firebase';

   export default {
      name: "Header-component",
      data() {
        return {
            currentUser: '',
            friends: null,
            filteredFriends: null,
            items: [
               {
                   label:'Home',
                   icon:'pi pi-fw pi-home',
                   to:'/'
               },               
               {
                   label:'Utilisateur',
                   icon:'pi pi-fw pi-user',
                   items:[
                      {
                         label:'Connection',
                         icon:'pi pi-fw pi-user',
                         to:'/login',
                         visible: () => !this.currentUser
                      },
                      {
                         label:'Inscription',
                         icon:'pi pi-fw pi-user-plus',
                         to:'/register',
                         visible: () => !this.currentUser
                      },
                      {
                         label:'Mon Compte',
                         icon:'pi pi-fw pi-user',
                         to:'/pseudo',
                         visible: () => this.currentUser
                      },                                            
                      {
                         label:'Déconnection',
                         icon:'pi pi-fw pi-user-minus',
                         command: () => {this.logout();},
                         visible: () => this.currentUser
                      }                                            
                   ]
               }
            ]
        }
      },    
      components: {
         Menubar,
         AutoComplete
      },
      mounted() {
            this.currentUser = firebase.auth().currentUser;

      },
      methods: {
         logout(){
            firebase.auth().signOut().then(() => {
               this.$router.replace('login');
            });
         },
         isLogged(){
            if (!this.currentUser)
               return false;
            return true;
         },
         getUserName(){
            this.currentUser = firebase.auth().currentUser;
            if (!this.currentUser)
               return "";
            return this.currentUser.displayName.split(" ")[0];
         },
         searchFriends(event) {
            console.log("Friend search : " + event.query)
            this.filteredFriends = [];//this.countryService.search(event.query);
            if (this.currentUser) {
               db.collection("users").onSnapshot((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                     console.log("username : " + doc.data().username);
                     this.filteredFriends.push(doc.data());
                     //if (doc.data().username)
                  });
               });
            }
         }         
      }
   }
</script>