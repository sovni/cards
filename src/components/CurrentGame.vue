<template>
   <Card style="width:400px;height:392px;">
      <template v-slot:title>
         Mes Parties
      </template>
      <template v-slot:content>
         <DataTable class="p-datatable-sm" :value="mygames" v-model:selection="selectedPlay" selectionMode="single" dataKey="uid" @row-select="selectPlay">
            <!--<Column field="uid" header="Id" ></Column> -->
            <Column field="name" header="Nom"></Column>
            <Column field="players" header="Joueurs">
                  <template #body="slotProps">
                     <div class="p-text-left" v-tooltip="slotProps.data.names" >{{slotProps.data.players}}</div>
                  </template>
            </Column>
            <Column field="state" header="Statut"></Column>
            <Column field="score" header="Score">
            </Column>
            <Column header="Action">
                  <template #body="slotProps">
                     <Button v-if="slotProps.data.state == 'created'" icon="pi pi-sign-out" v-tooltip="'Partir'" class="p-button-rounded p-button-text p-button-danger p-button-sm" @click="leaveGame(slotProps.data)" />
                     <Button v-if="slotProps.data.state == 'final'" icon="pi pi-check" v-tooltip="'Terminer'" class="p-button-rounded p-button-text" @click="endGame(slotProps.data)" />
                  </template>
            </Column>      
         </DataTable>
         <Button class="p-button-rounded p-button-text p-button-sm p-mt-2" v-tooltip="'Créer un nouveau jeu'"  icon="pi pi-plus" @click="toggle"/>
     </template>   
   </Card>
   <Dialog header="Header" v-model:visible="visible">
      <template #header>
         <h3>Résultats</h3>
      </template>
      <ol id="example-1">
         <li v-for="result in results" :key="result['player']">
            {{ result["player"] }} : {{ result["score"] }} 
         </li>
      </ol>
   </Dialog>
   <OverlayPanel ref="gameop" :showCloseIcon="true" :dismissable="true" style="width:350px">
      <div class="p-d-flex p-flex-column">
         <div class="p-mb-2">Jeu : {{ selectedGame.name }}</div>
         <div class="p-mb-4">
            <Dropdown v-model="selectedGame" :options="gameList" optionLabel="name" placeholder="Sélectionner un jeu" />
         </div>
         <div class="p-mb-4">Nombre de Joueurs: {{ selectedGame.code == "tarot" ? "5" : "4" }}</div>
         <div class="p-mb-2">Nombre de Points max: {{ gamePoints }}</div>
         <div class="p-mb-4">
            <Slider v-model="gamePoints" :step="100" :min="100" :max="2000" />
         </div>
         <div class="p-mb-2">Nombre de Tours max: {{ gameRounds }}</div>
         <div class="p-mb-2">
            <Slider v-model="gameRounds" :step="1" :min="5" :max="100" />
         </div>
         <div class="p-mt-4">
            <Button class="p-button-raised p-button-rounded p-button-sm" label="Créer le jeu" icon="pi pi-plus" @click="createGame"/>
         </div>
      </div>
   </OverlayPanel>
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
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import OverlayPanel from 'primevue/overlaypanel';
import Slider from 'primevue/slider';


const { decks } = require('cards');

   export default {
      name: 'CurrentGame',
      data() {
            return {
               mygames: [],
               roundId: -1,
               selectedPlay: [],
               visible: false,
               results: [],
               selectedGame: '',
               gameList:[
                  {name: 'Belote', code: 'belote'},
                  {name: 'Tarot', code: 'tarot'}
               ],
               gamePoints: 1000,
               gameRounds: 10
            }
      },      
      props: ['playerUid','playerName'],      
      components: {
         DataTable,
         Button,
         Column,
         Dialog,
         Card,
         OverlayPanel,
         Dropdown,
         Slider
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
            .where("state", "!=", "ended")
            .onSnapshot((querySnapshot) => {
               console.log("Plays onSnapshot launched (CurrentGame 1)");
               this.mygames = [];
               querySnapshot.forEach((doc) => {
                  console.log("Plays onSnapshot launched (CurrentGame 1) :"+ doc.id);
                  var strPlayers = "";
                  for (var i = 0; i < doc.data().players.length; i++) {
                     if (i == 0)
                        strPlayers = doc.data().playersName[i].name;
                     else
                        strPlayers += " / " + doc.data().playersName[i].name;
                  }

                  if (doc.data().state != "created") {
                     var score = "";
                     if (doc.data().game == "belote") {
                        for (i=0;i<doc.data().score.length;i++) {
                           if (i==0)
                              score = doc.data().score[i];
                           else  
                              score += "/" + doc.data().score[i];
                        }
                     }
                     if (doc.data().state == "final" && this.selectedPlay.uid == doc.id) {
                        var results = [];
                        if (doc.data().game == "belote") {
                           results[0] = [];
                           results[1] = [];
                           results[0]["player"] = "Equipe " + doc.data().playersName[0].name + "/" + doc.data().playersName[2].name;
                           results[0]["score"] = doc.data().score[0];
                           results[1]["player"] = "Equipe " + doc.data().playersName[1].name + "/" + doc.data().playersName[3].name;
                           results[1]["score"] = doc.data().score[1];
                        }
                        else if (doc.data().game == "belote") {
                           for (i=0;i<doc.data().score.length;i++) {
                              results[i] = [];
                              results[i]["player"] = doc.data().playersName[i].name;
                              results[i]["score"] = doc.data().score[i];
                           }
                        }
                        results.sort(function (a, b) {
                           return b["score"] - a["score"];
                        });
                        this.results = results;
                        this.visible = true;
                     }
                     this.mygames.unshift({"uid": doc.id, "name": doc.data().game, "players": doc.data().players.length+"/"+doc.data().nbPlayers, "state": doc.data().state, "score": score, "names": strPlayers});
                  }
                  else {
                     this.mygames.push({"uid": doc.id, "name": doc.data().game, "players": doc.data().players.length+"/"+doc.data().nbPlayers, "state": doc.data().state, "names": strPlayers});
                     if (doc.data().players.length == doc.data().nbPlayers) {
                        db.collection("plays").doc(doc.id).update({state:"start-round"});
                     }                     
                  }
                  if (doc.data().players.length == 0)
                     db.collection("plays").doc(doc.id).delete();
               });
               //if (this.mygames.length > 0)
               //   this.emitter.emit("select-play", this.this.mygames[0].uid);

            });
         db.collection("plays")
            .where("creator", "==", this.playerUid)
            .where("state", "in", ["start-round","end-round"])
            .onSnapshot({includeMetadataChanges: true}, (querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  console.log("Plays onSnapshot launched (CurrentGame 2) : " + doc.metadata.hasPendingWrites + ":" + doc.id);
                  if (!doc.metadata.hasPendingWrites) {
                     if (doc.data().state == "start-round") {
                        console.log("CurrentGame start-round state : " +doc.id, " => ", doc.data());
                        this.drawCards(doc.id, doc.data().players,doc.data().roundIndex%doc.data().players.length,doc.data().game);
                        console.log("distribute cards round 1");
                        db.collection("plays").doc(doc.id).update({state:"playing"});
                     }          
                     else if (doc.data().state == "end-round") {
                        var points = doc.data().score;
                        var roundIndex = doc.data().roundIndex +1;
                        var playedRounds = doc.data().playedRounds;
                        if (playedRounds == undefined)
                           playedRounds = 0;

                        db.collection("plays").doc(doc.id).collection("rounds").doc(doc.data().round).get().then((rdoc) => {
                           var playEnd = false;
                           if (rdoc.data().score.length != 0) {
                              playedRounds = playedRounds + 1;
                              for (var i=0;i<rdoc.data().score.length;i++) {
                                    points[i] += rdoc.data().score[i];
                                    if (points[i] >= doc.data().maxScore) {
                                       playEnd = true;
                                    }
                              }
                              if (playedRounds >= doc.data().maxRounds) {
                                 playEnd = true;
                              }
                           }
                           if (playEnd)
                              db.collection("plays").doc(doc.id).update({state:"final", playedRounds: playedRounds, score:points});
                           else
                              db.collection("plays").doc(doc.id).update({state:"start-round", roundIndex: roundIndex, playedRounds: playedRounds, score:points});
                        });

                        //this.calculateScore(doc.id);


                        //console.log("CurrentGame end-round state : " +doc.id, " => ", doc.data());
                        //db.collection("plays").doc(doc.id).update({state:"start-round", roundIndex: roundIndex, playedRounds: playedRounds});
                        //console.log("starting next round");          
                     }
                     
                     if (doc.data().players.length == 0)
                        db.collection("plays").doc(doc.id).delete();
                  }
               });
            });
      },
      methods: {
         toggle(event) {
            this.$refs.gameop.toggle(event);
         },
         createGame(event) {
            this.$refs.gameop.toggle(event);
            console.log("create game : " + this.selectedGame.code + " Points :" + this.gamePoints + " Rounds :" + this.gameRounds);
            if (this.selectedGame.code == "belote")
               this.createBeloteGame();
            else if (this.selectedGame.code == "tarot")
               this.createTarotGame();
         },
         createBeloteGame() {
               db.collection("plays").add({
                  players: [this.playerUid],
                  playersName: [{id: this.playerUid, name: this.playerName}],
                  game: "belote",
                  state: "created",
                  creator: this.playerUid,
                  score: [0,0],
                  maxScore: this.gamePoints,
                  playedRounds: 0,
                  maxRounds: this.gameRounds,
                  nbPlayers: 4,
                  roundIndex: 0,
                  createdAt: firebase.firestore.FieldValue.serverTimestamp()                  
               })
               .then(function(docRef) {
                  console.log("Plays Belote written with ID: ", docRef.id);
                  //this.roundID = docRef.id;
               })
               .catch(function(error) {
                  console.error("Error adding document: ", error);
               });                           
         },
         createTarotGame() {
               db.collection("plays").add({
                  players: [this.playerUid],
                  playersName: [{id: this.playerUid, name: this.playerName}],
                  game: "tarot",
                  state: "created",
                  creator: this.playerUid,
                  score: [0,0,0,0,0],
                  maxScore: this.gamePoints,
                  playedRounds: 0,
                  maxRounds: this.gameRounds,
                  nbPlayers: 5,
                  roundIndex: 0,
                  createdAt: firebase.firestore.FieldValue.serverTimestamp()                  
               })
               .then(function(docRef) {
                  console.log("Plays Tarot written with ID: ", docRef.id);
                  //this.roundID = docRef.id;
               })
               .catch(function(error) {
                  console.error("Error adding document: ", error);
               });                           
         },
         leaveGame(play) {
            console.log("Leave Game : " + play.uid);
            var currentUser = firebase.auth().currentUser;
            db.collection("plays").doc(play.uid).update({
               players: firebase.firestore.FieldValue.arrayRemove(currentUser.uid),
               playersName: firebase.firestore.FieldValue.arrayRemove({id: currentUser.uid, name: currentUser.displayName.split(" ")[0]})
            })
         },
         endGame(play) {
            console.log("End Game : " + play.uid);
            db.collection("plays").doc(play.uid).update({state: 'ended'});
         },
         /*calculateScore(playId) {
            var points = [];
            //points[0] = 0;
            //points[1] = 0;
            console.log("!!!!! CalculateScore : " + playId);
            db.collection("plays").doc(playId).collection("rounds")
            .get()
            .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                     console.log("!!!!! CalculateScore round : " + doc.id);
                     for (var i=0;i<doc.data().score.length;i++) {
                        if (typeof points[i] === 'undefined') 
                           points[i] = doc.data().score[i];
                        else
                           points[i] += doc.data().score[i];
                     }
               });
               db.collection("plays").doc(playId).update({score:points});
            })
            .catch(function(error) {
               console.log("Error getting documents: ", error);
            });


         },*/
         drawCards(playId, players, dealer, game) {
            var deck;
            this.roundId = -1;
            if (game == "belote")
               deck = new decks.PiquetDeck();
            else if (game == "tarot")
               deck = new decks.TarotDeck("modern");
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
               dog: [],
               deck: [],
               tricks:[],
               scores: [],
               score: []
            })
            .then((docRef) => {
               var i, j, tmpHands;
               this.roundId = docRef.id;
               console.log("Round this written with ID: ", docRef.id);
               //db.collection("plays").doc(playId).update({round: this.roundId});

               if (game == "belote") {
                  tmpHands=[];
                  for (i = 0; i < players.length; i++) {
                     tmpHands[i] = [];
                     this.addHand(deck, 3, tmpHands[i]);
                  }
                  for (i = 0; i < players.length; i++) {
                     this.addHand(deck, 2, tmpHands[i]);
                  }
                  for (i = 0; i < players.length; i++) {
                     db.collection("plays").doc(playId)
                     .collection("rounds").doc(this.roundId)
                     .collection("hands").doc(this.roundId+players[(i+dealer)%players.length]).set({
                        play: playId,
                        round: this.roundId,
                        player: players[(i+dealer)%players.length],
                        playerIndex: (i+dealer)%players.length,
                        handOn: tmpHands[i],
                        handNext: [],
                        handOff: []
                     });
                  }
                  /*for (i = 0; i < players.length; i++) {
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
                  }*/          
                  console.log("Draw atout and store remaining hands");
                  db.collection("plays").doc(playId).collection("rounds").doc(this.roundId).update({
                     choice: this.getHand(deck, 1),
                     deck: this.getHand(deck, 11), state: "choice-1"
                  });
                  /*console.log("Store remaining deck");
                  db.collection("plays").doc(playId).collection("rounds").doc(this.roundId).update({
                     deck: this.getHand(deck, 11), state: "choice-1"
                  });*/
               }
               else if (game == "tarot") {
                  tmpHands=[];
                  for (j=0;j<5;j++) {
                     for (i = 0; i < players.length; i++) {
                        if (j == 0)
                           tmpHands[i] = [];
                        this.addHand(deck, 3, tmpHands[i]);
                     }
                  }
                  for (i = 0; i < players.length; i++) {
                     db.collection("plays").doc(playId)
                     .collection("rounds").doc(this.roundId)
                     .collection("hands").doc(this.roundId+players[(i+dealer)%players.length]).set({
                        play: playId,
                        round: this.roundId,
                        player: players[(i+dealer)%players.length],
                        playerIndex: (i+dealer)%players.length,
                        handOn: tmpHands[i],
                        handNext: [],
                        handOff: []
                     });
                  }                 
                  //if (players.length == 5) {
                     /*for (i = 0; i < players.length; i++) {
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
                     }*/
                     /*for (j=0;j<4;j++) {
                        for (i = 0; i < players.length; i++) {
                           this.drawHand(playId, deck, 3, players[(i+dealer)%players.length]);
                        }
                     }*/
                     console.log("Store remaining deck");
                     db.collection("plays").doc(playId).collection("rounds").doc(this.roundId).update({
                        deck: this.getHand(deck, 3), state: "choice-1"
                     });                 
                  //}
               }          
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
         addHand(deck, nb, handArray) {
            var hand = deck.draw(nb);
            for (var j = 0; j < hand.length; j++) {
               handArray.push({suit: hand[j].suit.name, rank: hand[j].rank.shortName});
            }    
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