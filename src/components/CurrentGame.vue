<template>
   <DataTable class="p-datatable-sm" :value="mygames" v-model:selection="selectedPlay" selectionMode="single" dataKey="uid" @row-select="selectPlay">
      <!--<Column field="uid" header="Id" ></Column> -->
      <Column field="name" header="Name"></Column>
      <Column field="players" header="Players">
             <template #body="slotProps">
                <div class="p-text-left" v-tooltip="slotProps.data.names" >{{slotProps.data.players}}</div>
            </template>
      </Column>
      <Column field="state" header="State"></Column>
      <Column field="score" header="Score">
      </Column>
   </DataTable>
   <Button class="p-button-raised p-button-rounded p-button-sm" icon="pi pi-plus" @click="createGame()"/>
</template>

<script>
import firebase from 'firebase';
import '../plugins/firebase'
import db from '../plugins/firebase';
//import FirePlayGround from '../plugins/fireplayground';
//import playGroundConverter from '../plugins/fireplayground';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tooltip from 'primevue/tooltip';

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
         Button,
         Column
      },
      directives: {
         'tooltip': Tooltip
      },
      created(){
      },
      mounted(){
         db.collection("plays")
            //.where("creator", "==", this.playerUid)
            .where("players", "array-contains", this.playerUid)
            //.where("state", "!=", "created")
            .onSnapshot((querySnapshot) => {
               this.mygames = [];
               querySnapshot.forEach((doc) => {
                  var strPlayers = "";
                  for (var i = 0; i < doc.data().players.length; i++) {
                     if (i == 0)
                        strPlayers = doc.data().playersName[i].name;
                     else
                        strPlayers += " / " + doc.data().playersName[i].name;
                  }

                  if (doc.data().state != "created") {
                     var score = "";
                     for (i=0;i<doc.data().score.length;i++) {
                        if (i==0)
                           score = doc.data().score[i];
                        else  
                           score += "/" + doc.data().score[i];
                     }
                     this.mygames.unshift({"uid": doc.id, "name": "belote", "players": doc.data().players.length+"/"+doc.data().nbPlayers, "state": doc.data().state, "score": score, "names": strPlayers});
                  }
                  else {
                     this.mygames.push({"uid": doc.id, "name": "belote", "players": doc.data().players.length+"/"+doc.data().nbPlayers, "state": doc.data().state, "names": strPlayers});
                     if (doc.data().players.length == 4) {
                        db.collection("plays").doc(doc.id).update({state:"prep"});
                     }                     
                  }
               });
               //if (this.mygames.length > 0)
               //   this.emitter.emit("select-play", this.this.mygames[0].uid);

            });
         db.collection("plays")
            .where("creator", "==", this.playerUid)
            //.where("state", "==", "prep")
            .onSnapshot({includeMetadataChanges: true}, (querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  if (!doc.metadata.hasPendingWrites) {
                     if (doc.data().state == "prep") {
                        console.log("CurrentGame prep state : " +doc.id, " => ", doc.data());
                        db.collection("plays").doc(doc.id).update({state:"start-play"});
                        console.log("starting game");
                     }
                     else if (doc.data().state == "start-play") {
                        console.log("CurrentGame start-play state : " +doc.id, " => ", doc.data());
                        db.collection("plays").doc(doc.id).update({state:"start-round"});
                        console.log("starting round");
                     }
                     else if (doc.data().state == "start-round") {
                        console.log("CurrentGame start-round state : " +doc.id, " => ", doc.data());
                        this.drawCards(doc.id, doc.data().players,doc.data().roundIndex%doc.data().players.length);
                        console.log("distribute cards round 1");
                        db.collection("plays").doc(doc.id).update({state:"playing"});
                     }          
                     else if (doc.data().state == "end-round") {
                        this.calculateScore(doc.id);
                        var roundIndex = doc.data().roundIndex +1;
                        console.log("CurrentGame end-round state : " +doc.id, " => ", doc.data());
                        db.collection("plays").doc(doc.id).update({state:"start-round", roundIndex: roundIndex});
                        console.log("starting next round");          
                     }        
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
                  nbPlayers: 4,
                  roundIndex: 0
               })
               .then(function(docRef) {
                  console.log("Plays written with ID: ", docRef.id);
                  //this.roundID = docRef.id;
               })
               .catch(function(error) {
                  console.error("Error adding document: ", error);
               });                           
         },
         calculateScore(playId) {
            var points = [];
            points[0] = 0;
            points[1] = 0;
            console.log("!!!!! CalculateScore : " + playId);
            db.collection("plays").doc(playId).collection("rounds")
            .get()
            .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                     console.log("!!!!! CalculateScore round : " + doc.id);
                     for (var i=0;i<doc.data().score.length;i++) {
                        points[i] += doc.data().score[i];
                     }
                     console.log("!!!!! CalculateScore round : " + points[0] + "/" + points[1]);
               });
               db.collection("plays").doc(playId).update({score:[points[0], points[1]]});
            })
            .catch(function(error) {
               console.log("Error getting documents: ", error);
            });


         },
        drawCards(playId, players, dealer) {
            var deck;
            this.roundId = -1;
            deck = new decks.PiquetDeck();
            deck.shuffleAll();
            console.log("Draw cards " + playId);
            db.collection("plays").doc(playId).update({state:"distrib-1"});

            db.collection("plays").doc(playId).collection("rounds").add({
               play: playId,
               nbPlayers: players.length,
               active: (dealer+1)%players.length,
               dealer: dealer,
               state: "distrib-1",
               choice: [],
               deck: [],
               tricks:[],
               scores: [],
               score: []
            })
            .then((docRef) => {
               this.roundId = docRef.id;
               console.log("Round this written with ID: ", docRef.id);
               //db.collection("plays").doc(playId).update({round: this.roundId});

               for (var i = 0; i < players.length; i++) {
                  db.collection("plays").doc(playId)
                    .collection("rounds").doc(this.roundId)
                    .collection("hands").doc(this.roundId+players[(i+dealer)%players.length]).set({
                     play: playId,
                     round: this.roundId,
                     player: players[(i+dealer)%players.length],
                     playerIndex: (i+dealer)%players.length,
                     handOn: this.getHand(deck, 3),
                     handNext: [],
                     handOff: []
                  });
               }
               console.log("Second draw turn");
               for (i = 0; i < players.length; i++) {
                  this.drawHand(playId, deck, 2, players[(i+dealer)%players.length]);
               }          
               console.log("Draw atout");
               db.collection("plays").doc(playId).collection("rounds").doc(this.roundId).update({
                  choice: this.getHand(deck, 1)
               });
               console.log("Store remaining deck");
               db.collection("plays").doc(playId).collection("rounds").doc(this.roundId).update({
                  deck: this.getHand(deck, 11), state: "choice-1"
               });          
               db.collection("plays").doc(playId).update({round: this.roundId});
            })
            .catch((error) => {
               console.error("Error adding Round: ", error);
               this.roundId = -1;
            }); 
            console.log("Round Id : " + this.roundId);
         },
         drawHand(playId, deck, nb, playerId) {
            var hand = deck.draw(nb);
            var handArray = [];
            for (var j = 0; j < hand.length; j++) {
               console.log("add card - player : " + playerId);
               db.collection("plays").doc(playId)
                    .collection("rounds").doc(this.roundId)
                    .collection("hands").doc(this.roundId+playerId).update({
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
            if (this.selectedPlay.uid) {
               db.collection("plays").doc(this.selectedPlay.uid)
                  .get().then((doc) => {
                     if (doc.data().state != 'created')
                        this.emitter.emit("select-play", this.selectedPlay.uid);
                  });
            }

            console.log("selected " + this.selectedPlay.uid)
         }
      }
   }       
</script>