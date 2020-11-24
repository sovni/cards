<template>
   <DataTable :value="games">
      <Column field="name" header="Name"></Column>
      <Column field="players" header="Players"></Column>
      <Column field="state" header="State"></Column>
   </DataTable>
</template>

<script>
import firebase from 'firebase';
import '../plugins/firebase'
import db from '../plugins/firebase';
//import FirePlayGround from '../plugins/fireplayground';
//import playGroundConverter from '../plugins/fireplayground';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

   export default {
      name: 'Gamelist',
      data() {
            return {
                games: []
            }
      },      
      components: {
         DataTable,
         Column
      },
      created(){
      },
      mounted(){
         const currentUser = firebase.auth().currentUser;


         db.collection("plays")
            .where("state", "==", "not started")
            .onSnapshot((querySnapshot) => {
               this.games = [];
               querySnapshot.forEach((doc) => {
                     // doc.data() is never undefined for query doc snapshots
                     console.log("Gamelist : " +doc.id, " => ", doc.data());
                     var found = false;
                     for (var i = 0; i < doc.data().players.length; i++) {
                        if (doc.data().players[i] == currentUser.uid) {
                           found = true;
                           break;
                        }
                     }
                     if (!found)
                        this.games.push({"name": doc.data().game, "players": doc.data().players.length, "state": doc.data().state});
               });
            });
      },
      methods: {

      }
   }       
</script>