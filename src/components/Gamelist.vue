<template>
   <DataTable class="p-datatable-sm" :value="games" >
      <Column field="name" header="Name"></Column>
      <Column field="players" header="Players"></Column>
      <Column field="state" header="State"></Column>
   </DataTable>
</template>

<script>
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
      props: ['playerUid','playerName'],      
      components: {
         DataTable,
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
                     if (!found)
                        this.games.push({"name": doc.data().game, "players": doc.data().players.length, "state": doc.data().state});
               });
            });
      },
      methods: {

      }
   }       
</script>