<template>
   <div class="p-grid">
   </div>
</template>

<script>
import firebase from 'firebase';
import '../plugins/firebase'
import db from '../plugins/firebase';
import FirePlayGround from '../plugins/fireplayground';
import playGroundConverter from '../plugins/fireplayground';


   export default {
      name: 'Gamelist',
      data() {
            return {
                games: []
            }
      },      
      components: {
      },
      created(){
         const currentUser = firebase.auth().currentUser;
         this.firePlayground.players.push(currentUser.uid);

         db.collection("games").doc(this.currentGame)
            .collection("plays")
            .where("players", "array-contains", currentUser.uid)
            .where("state", "==", "not started")
            .get()
            .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                     // doc.data() is never undefined for query doc snapshots
                     console.log(doc.id, " => ", doc.data());
                     this.playGroundID = doc.id;
               });
            })
            .catch(function(error) {
               console.log("Error getting documents: ", error);
            });
      },
      mounted(){
        const currentUser = firebase.auth().currentUser;
        this.firePlayground.players.push(currentUser.uid);

        db.collection("games").doc(this.currentGame)
            .collection("plays")
            .where("state", "==", "not started")
            .get()
            .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                     // doc.data() is never undefined for query doc snapshots
                     console.log(doc.id, " => ", doc.data());
                     this.playGroundID = doc.id;
               });
            })
            .catch(function(error) {
               console.log("Error getting documents: ", error);
            });   
      },
      methods: {

      }
   }       
</script>