<template>
   <DataTable :value="mygames" selectionMode="single" >
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
            .where("players", "array-contains", this.playerUid)
            .where("state", "==", "created")
            .onSnapshot((querySnapshot) => {
               this.mygames = [];
               querySnapshot.forEach((doc) => {
                     // doc.data() is never undefined for query doc snapshots
                    console.log("Gamelist : " +doc.id, " => ", doc.data());
                    this.mygames.push({"uid": doc.id, "name": "belote", "players": doc.data().players.length, "state": doc.data().state});
                     if (doc.data().players.length == 4) {
                        db.collection("plays").doc(doc.id).set({state:"prep"}, { merge: true });
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
                  creator: this.playerUid
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