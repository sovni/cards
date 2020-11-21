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
         },
         getUserName(){
            const currentUser = firebase.auth().currentUser;
            if (!currentUser)
               return "";
            return currentUser.displayName;
         }
      }
   }
</script>