<template>
   <header>
         <Menubar :model="items" />

      <div class="logo">
         <router-link to="/" class="Logo">Client</router-link>
      </div>

      <div class="main-navigation">

         <router-link to="/login">Login</router-link>
         <router-link to="/register">Register</router-link>
         <a @click.prevent.stop="logout">Logout</a>
      </div>
   </header>
</template>

<script>
   import firebase from 'firebase'
   import Menubar from 'primevue/menubar';

   export default {
      name: "Header-component",
      data() {
        return {
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
                         to:'/login'
                      },
                      {
                         label:'Register',
                         icon:'pi pi-fw pi-user-plus',
                         to:'/register'
                      },
                      {
                         label:'Logout',
                         icon:'pi pi-fw pi-user-minus',
                         command: () => {this.logout();}
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
         }
      }
   }
</script>