<template>
   <header>
      <Menubar :model="items" >
         <template #end>
            {{ getUserName() }}
         </template>
      </Menubar>
   </header>
</template>

<script>
   import firebase from 'firebase'
   import Menubar from 'primevue/menubar';

   export default {
      name: "Header-component",
      data() {
        return {
            currentUser: '',
            items: [
               {
                   label:'Home',
                   icon:'pi pi-fw pi-home',
                   to:'/'
               },               
               {
                   label:'User',
                   icon:'pi pi-fw pi-user',
                   items:[
                      {
                         label:'Login',
                         icon:'pi pi-fw pi-user',
                         to:'/login',
                         visible: () => !this.currentUser
                      },
                      {
                         label:'Register',
                         icon:'pi pi-fw pi-user-plus',
                         to:'/register',
                         visible: () => !this.currentUser
                      },
                      {
                         label:'Logout',
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
         Menubar
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
         }
      }
   }
</script>