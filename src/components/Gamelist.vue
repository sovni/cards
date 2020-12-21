<template>
   <Card style="width:400px;height:380px;">
      <template v-slot:title>
         Parties
      </template>
      <template v-slot:content>
         <DataTable class="p-datatable-sm" :value="games" >
            <Column field="name" header="Nom"></Column>
            <Column field="players" header="Joueurs" >
                  <template #body="slotProps">
                     <div class="p-text-left" v-tooltip="slotProps.data.names" >{{slotProps.data.players}}</div>
                  </template>
            </Column>
            <Column field="state" header="Statut"></Column>
            <Column header="Action">
                  <template #body="slotProps">
                     <Button icon="pi pi-sign-in" v-tooltip="'Rejoindre'" class="p-button-rounded p-button-success p-button-sm" @click="joinGame(slotProps.data)" />
                  </template>
            </Column>
         </DataTable>
      </template>   
   </Card>
</template>

<script>
import db from '../plugins/firebase';
//import FirePlayGround from '../plugins/fireplayground';
//import playGroundConverter from '../plugins/fireplayground';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import firebase from 'firebase';
import Tooltip from 'primevue/tooltip';
import Card from 'primevue/card';

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
         Column,
         Card
      },
      directives: {
         'tooltip': Tooltip
      },
      created(){
      },
      mounted(){

         db.collection("plays")
            .where("state", "==", "created")
            .onSnapshot((querySnapshot) => {
               console.log("Plays onSnapshot launched (Gamelist 1)");
               this.games = [];
               querySnapshot.forEach((doc) => {
                     // doc.data() is never undefined for query doc snapshots
                     console.log("Gamelist : " +doc.id, " => ", doc.data());
                     var found = false;
                     var strPlayers = "";
                     for (var i = 0; i < doc.data().players.length; i++) {
                        if (i == 0)
                           strPlayers = doc.data().playersName[i].name;
                        else
                           strPlayers += " / " + doc.data().playersName[i].name;
                        if (doc.data().players[i] == this.playerUid) {
                           found = true;
                           //break;
                        }
                     }
                     if (!found) {
                        var id = this.games.length + 1;
                        this.gamesuid[id] = doc.id;
                        this.games.push({"uid": id, "name": doc.data().game, "players": doc.data().players.length+"/"+doc.data().nbPlayers, "state": doc.data().state, "names": strPlayers});
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
               playersName: firebase.firestore.FieldValue.arrayUnion({id: currentUser.uid, name: currentUser.displayName.split(" ")[0]})
            })

        }

      }
   }       
</script>