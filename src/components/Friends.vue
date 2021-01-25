<template>
    <Dropdown v-model="selectedFriends" :options="friends" optionLabel="name" placeholder="Amis" />
</template>

<script>
//import db from '../plugins/firebase';
//import firebase from 'firebase';
import Dropdown from 'primevue/dropdown';

   export default {
      name: 'Friends',
      data() {
            return {
                selectedFriends: null,
                friends : [
                    /*{name: 'Name1', uid: 'tttt'},
                    {name: 'Name2', uid: 'tttt'},
                    {name: 'Name3', uid: 'tttt'}*/
                ]
            }
      },      
      components: {
          Dropdown
      },
      created(){
      },
      mounted(){
      },
      methods: {
      }
   }       
</script>