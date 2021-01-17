<template>
   <header>
      <Menubar :model="items" >
         <template #end>
            {{ getUserName() }}
            <AutoComplete v-model="selectedFriend" :suggestions="filteredFriends" @complete="searchFriends($event)" placeholder="amis..." field="username" >
               <template #item="slotProps">
                  <div class="p-d-flex">
                        <!--<Button :icon="pi pi-plus" :v-tooltip="'Suivre'" :class="p-button-rounded p-button-text" @click="addFriend(slotProps.item.username)" />-->
                        <!--<Button icon="pi pi-plus" class=" p-button-sm" @click="addFriend(slotProps.item.username)"/>-->
                        <i class="pi pi-plus" style="fontSize: 0.5rem;v-align: center;"></i>
                        <div>{{slotProps.item.username}}</div>
                  </div>
               </template>
            </AutoComplete>
         </template>
      </Menubar>
   </header>
</template>

<script>
   import firebase from 'firebase'
   import Menubar from 'primevue/menubar';
   import AutoComplete from 'primevue/autocomplete';
   import db from '../plugins/firebase';
   //import Button from 'primevue/button';

   export default {
      name: "Header-component",
      data() {
        return {
            currentUser: '',
            friends: [],
            selectedFriend: [],
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
         //Button,
         AutoComplete
      },
      mounted() {
            this.currentUser = firebase.auth().currentUser;
            db.collection("users").onSnapshot((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  console.log("username : " + doc.data().username);
                  //this.friends.push({username: doc.data().username});
                  this.friends.push(doc.data());

                  //if (doc.data().username)
               });
            });
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
         addFriend(username) {
            console.log("Add friend request : " + username);
         },
         searchFriends(event) {
            setTimeout(() => {
                if (!event.query.trim().length) {
                    this.filteredFriends = [...this.friends];
                }
                else {
                    this.filteredFriends = this.friends.filter((friend) => {
                        return friend.username.toLowerCase().startsWith(event.query.toLowerCase());
                    });
                    console.log("Filter : " + this.filteredFriends);
                }
            }, 250);



            /*console.log("Friend search : " + event.query)
            this.filteredFriends = [];//this.countryService.search(event.query);
            if (this.currentUser) {
               db.collection("users").onSnapshot((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                     console.log("username : " + doc.data().username);
                     this.filteredFriends.push(doc.data());
                     //if (doc.data().username)
                  });
               });
            }*/
         }         
      }
   }
</script>