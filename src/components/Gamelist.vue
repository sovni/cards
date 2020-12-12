<template>
   <DataTable class="p-datatable-sm" :value="games" >
      <Column field="uid" header="Id" headerStyle="width:10px;"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="players" header="Players"></Column>
      <Column field="state" header="State"></Column>
      <Column >
            <template #body="slotProps">
                <Button icon="pi pi-sign-in" class="p-button-rounded p-button-success p-button-sm" @click="joinGame(slotProps.data)" />
            </template>
        </Column>
   </DataTable>
</template>

<script>
import db from '../plugins/firebase';
//import FirePlayGround from '../plugins/fireplayground';
//import playGroundConverter from '../plugins/fireplayground';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import firebase from 'firebase';

   export default {
      name: 'Gamelist',
      data() {
            return {
                games: [],
                gamesuid:[]
            }
      },
      props: ['playerUid','playerName'],      
      components: {
         DataTable,
         Button,
         Column
      },
      created(){
      },
      mounted(){

         db.collection("plays")
            .where("state", "==", "created")
            .onSnapshot((querySnapshot) => {
               this.games = [];
               querySnapshot.forEach((doc) => {
                     // doc.data() is never undefined for query doc snapshots
                     console.log("Gamelist : " +doc.id, " => ", doc.data());
                     var found = false;
                     for (var i = 0; i < doc.data().players.length; i++) {
                        if (doc.data().players[i] == this.playerUid) {
                           found = true;
                           break;
                        }
                     }
                     if (!found) {
                        var id = this.games.length + 1;
                        this.gamesuid[id] = doc.id
                        this.games.push({"uid": doc.id, "name": doc.data().game, "players": doc.data().players.length, "state": doc.data().state});
                     }
               });
            });
      },
      methods: {
         joinGame(play) {
            console.log("Join Game : " + this.gamesuid[play.uid]);
            var currentUser = firebase.auth().currentUser;
            db.collection("plays").doc(this.gamesuid[play.uid]).update({
               players: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
               playersName: firebase.firestore.FieldValue.arrayUnion({id: currentUser.uid, name: currentUser.displayName})
            })

        }

      }
   }       
</script>