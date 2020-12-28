<template>
   <div class="p-d-inline-flex p-flex-column p-flex-lg-row p-m-2">
      <div class="p-d-inline-flex p-flex-row p-flex-lg-column p-m-2">
         <CurrentGame class="p-my-2" :playerUid="playerUid" :playerName="playerName"/>
         <Gamelist  class="p-my-3" :playerUid="playerUid" :playerName="playerName"/>
      </div>

      <Playground class="p-m-2"  :playerUid="playerUid" :playerName="playerName"/>
      <GameChat class="p-m-2"  :playerId="playerUid"/>

   </div>

</template>

<script>
import firebase from 'firebase';
import '../plugins/firebase'
//import Card from 'primevue/card';
import Playground from './Playground'
import Gamelist from './Gamelist'
import CurrentGame from './CurrentGame'
import GameChat from './GameChat'


   export default {
      name: 'Dashboard',
      data() {
            return {
               playerUid: -1,
               playerName: ""
            }
      },            
      components: {
         //Card,
         Playground,
         Gamelist,
         CurrentGame,
         GameChat
      },
      created() {
         var currentUser = firebase.auth().currentUser;
         this.playerUid = currentUser.uid;
         this.playerName = currentUser.displayName.split(" ")[0];
      },
      methods: {
      }      
   }       
</script>