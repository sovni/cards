<template>
   <DataTable :value="mygames" selectionMode="single" >
      <Column filed="uid" header="Id" style="display: none;" renderer="false"></Column>
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
      name: 'MyGamelist',
      data() {
            return {
                mygames: []
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
            .where("players", "array-contains", currentUser.uid)
            .onSnapshot((querySnapshot) => {
               this.mygames = [];
               querySnapshot.forEach((doc) => {
                     // doc.data() is never undefined for query doc snapshots
                    console.log("Gamelist : " +doc.id, " => ", doc.data());
                    this.mygames.push({"uid": doc.id, "name": "belote", "players": doc.data().players.length, "state": doc.data().state});
               });
            });
      },
      methods: {

      }
   }       
</script>