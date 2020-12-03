<template>
   <DataTable :value="mygames" v-model:selection="selectedPlay" selectionMode="single" dataKey="uid" @row-click="selectPlay">
      <Column filed="uid" header="Id" ></Column>
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

const { decks } = require('cards');

   export default {
      name: 'MyGamelist',
      data() {
            return {
                mygames: [],
                roundId: -1,
                selectedPlay: []
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
            .where("players", "array-contains", this.playerUid)
            .where("state", "==", "prep")
            .onSnapshot((querySnapshot) => {
               this.mygames = [];
               querySnapshot.forEach((doc) => {
                     // doc.data() is never undefined for query doc snapshots
                    console.log("Gamelist : " +doc.id, " => ", doc.data());
                    this.mygames.push({"uid": doc.id, "name": "belote", "players": doc.data().players.length, "state": doc.data().state});
                    if (doc.data().state == "starting" && doc.data().creator == this.playerUid) {
                        this.drawCards(doc.id, doc.data().players);
                        console.log("starting game");
                    }
                });
            });
      },
      methods: {
         startGame() {
               db.collection("plays").add({
                  players: [this.playerUid],
                  playersName: [{id: this.playerUid, name: this.displayName}],
                  game: "belote",
                  state: "created",
                  creator: this.playerUid,
                  creationDate: firebase.firestore.FieldValue.serverTimestamp()
               })
               .then(function(docRef) {
                  console.log("Plays written with ID: ", docRef.id);
               })
               .catch(function(error) {
                  console.error("Error adding document: ", error);
               });                           
         },
        drawCards(playId, players) {
            var deck;
            this.roundId = -1;
            deck = new decks.PiquetDeck();
            deck.shuffleAll();
            console.log("Draw cards " + playId);
            db.collection("plays").doc(playId).set({state:"distrib-1"}, { merge: true });

            db.collection("rounds").add({
               play: playId,
               index: 0,
               dealer: this.playerUid,
               state: "distrib-1",
               choice: [],
               deck: [],
               scores: []
            })
            .then((docRef) => {
               this.roundId = docRef.id;
               console.log("Round this written with ID: ", docRef.id);

               for (var i = 0; i < players.length; i++) {
                  db.collection("hands").doc(this.roundId+players[i]).set({
                     play: playId,
                     round: this.roundId,
                     player: players[i],
                     handOn: this.getHand(deck, 3),
                     handNext: [],
                     handOff: []
                  });
               }
               console.log("Second draw turn");
               for (i = 0; i < players.length; i++) {
                  this.drawHand(deck, 2, players[i]);
               }          
               console.log("Draw atout");
               db.collection("rounds").doc(this.roundId).update({
                  choice: this.getHand(deck, 1)
               });
               console.log("Store remaining deck");
               db.collection("rounds").doc(this.roundId).update({
                  deck: this.getHand(deck, 11)
               });          
            })
            .catch((error) => {
               console.error("Error adding Round: ", error);
               this.roundId = -1;
            }); 
            console.log("Round Id : " + this.roundId);
         },
         drawHand(deck, nb, playerId) {
            var hand = deck.draw(nb);
            var handArray = [];
            for (var j = 0; j < hand.length; j++) {
               console.log("add card - player : " + playerId);
               db.collection("hands").doc(this.roundId+playerId).update({
                  handOn: firebase.firestore.FieldValue.arrayUnion({suit: hand[j].suit.name, rank: hand[j].rank.shortName})
               });

               //handArray.push(hand[j].suit.name +":" + hand[j].rank.shortName);
            }    
            return handArray;           
         },
         getHand(deck, nb) {
            var hand = deck.draw(nb);
            var handArray = [];
            for (var j = 0; j < hand.length; j++) {
               handArray.push({suit: hand[j].suit.name, rank: hand[j].rank.shortName});
            }    
            return handArray;           
         },
         selectPlay(){
            if (this.selectedPlay.uid)
               this.emitter.emit("select-play", this.selectedPlay.uid);

            console.log("selected " + this.selectedPlay.uid)
         }
      }
   }       
</script>