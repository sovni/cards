<template>
   <div class="p-d-inline-flex p-flex-column p-flex-lg-row p-m-2">
      <div class="p-d-inline-flex p-flex-row p-flex-lg-column p-m-2">
         <CurrentGame class="p-my-2" :playerUid="playerUid" :playerName="playerName"/>
         <Gamelist  class="p-my-3" :playerUid="playerUid" :playerName="playerName"/>
      </div>

      <Playground class="p-m-2"  :playerUid="playerUid" :playerName="playerName"/>
      <div class="p-d-inline-flex p-flex-row p-flex-lg-column p-m-0">
         <GameChat class="p-m-2" :playerId="playerUid"/>
         <Friends class="p-m-2" :playerId="playerUid"/>
      </div>
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
import Friends from './Friends'


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
         GameChat,
         Friends
      },
      created() {
         var currentUser = firebase.auth().currentUser;
         this.playerUid = currentUser.uid;
         this.playerName = currentUser.displayName.split(" ")[0];
         // Create a reference to this user's specific status node.
         // This is where we will store data about being online/offline.
         var userStatusDatabaseRef = firebase.database().ref('/status/' + this.playerUid);

         // We'll create two constants which we will write to 
         // the Realtime database when this device is offline
         // or online.
         var isOfflineForDatabase = {
            state: 'offline',
            playId: '',
            uid: this.playerUid,
            last_changed: firebase.database.ServerValue.TIMESTAMP,
         };

         var isOnlineForDatabase = {
            state: 'online',
            playId: '',
            uid: this.playerUid,
            last_changed: firebase.database.ServerValue.TIMESTAMP,
         };

         // Create a reference to the special '.info/connected' path in 
         // Realtime Database. This path returns `true` when connected
         // and `false` when disconnected.
         firebase.database().ref('.info/connected').on('value', function(snapshot) {
            // If we're not currently connected, don't do anything.
            if (snapshot.val() == false) {
               return;
            }

            // If we are currently connected, then use the 'onDisconnect()' 
            // method to add a set which will only trigger once this 
            // client has disconnected by closing the app, 
            // losing internet, or any other means.
            userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
               // The promise returned from .onDisconnect().set() will
               // resolve as soon as the server acknowledges the onDisconnect() 
               // request, NOT once we've actually disconnected:
               // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

               // We can now safely set ourselves as 'online' knowing that the
               // server will mark us as offline once we lose connection.
               userStatusDatabaseRef.set(isOnlineForDatabase);
            });
         });
      },
      methods: {
      }      
   }       
</script>