<template>
   <DataTable class="p-datatable-sm" :value="mygames" selectionMode="single" >
      <Column filed="uid" header="Id" style="display: none;" renderer="false"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="players" header="Players"></Column>
      <Column field="state" header="State"></Column>
   </DataTable>
   <Button class="p-button-raised p-button-rounded" icon="pi pi-plus" @click="createGame()"/>
</template>

<script>
import db from '../plugins/firebase';
//import FirePlayGround from '../plugins/fireplayground';
//import playGroundConverter from '../plugins/fireplayground';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

   export default {
      name: 'MyGamelist',
      data() {
            return {
                mygames: []
            }
      },      
      props: ['playerUid','playerName'],      
      components: {
         DataTable,
         Column,
         Button
      },
      created(){
      },
      mounted(){
         console.log("MyGameList :" + this.playerUid);
         db.collection("plays")
            .where("creator", "==", this.playerUid)
            .where("state", "==", "created")
            .onSnapshot((querySnapshot) => {
               this.mygames = [];
               querySnapshot.forEach((doc) => {
                     console.log("Plays onSnapshot launched (MyGamelist 1)");
                     // doc.data() is never undefined for query doc snapshots
                    console.log("Gamelist : " +doc.id, " => ", doc.data());
                    this.mygames.push({"uid": doc.id, "name": doc.data().game, "players": doc.data().players.length, "state": doc.data().state});
                     if (doc.data().players.length == doc.data().nbPlayers) {
                        db.collection("plays").doc(doc.id).update({state:"prep"});
                     }
               });
            });
      },
      methods: {
         createGame() {
               db.collection("plays").add({
                  players: [this.playerUid],
                  playersName: [{id: this.playerUid, name: this.playerName}],
                  game: "belote",
                  state: "created",
                  creator: this.playerUid,
                  score: [],
                  roundIndex: 0
               })
               .then(function(docRef) {
                  console.log("Plays written with ID: ", docRef.id);
                  //this.roundID = docRef.id;
               })
               .catch(function(error) {
                  console.error("Error adding document: ", error);
               });                           
         }

      }
   }       
</script>