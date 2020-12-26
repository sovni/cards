<template>
   <Card style="width:800px;height:800px;">
      <template v-slot:title v-if="playId == -1">
         Sélectionnez ou créez une partie
      </template>
      <template v-slot:content >
         <div class="p-grid">
            <div v-if="playId != -1 && currentGame == 'belote'" class="p-col-fixed p-card atout"  style="width:200px;height:150px">
               <!--<div v-if="atout != ''" class="p-col-12 p-text-center p-text-bold">ATOUT</div>-->
               <div v-if="atout != ''" class="p-col-12 p-text-center p-text-bold">ATOUT</div>
               <div v-if="bidPlayer != ''" class="p-col-12 p-text-center p-text-bold">{{bidPlayer}}</div>
               <div v-if="atout == 'spades'" class="p-text-center" ><span style="font-size: 250%; color: black;">&spades;</span></div>
               <div v-if="atout == 'diamonds'" class="p-text-center" ><span style="font-size: 250%; color: red;">&diams;</span></div>
               <div v-if="atout == 'clubs'" class="p-text-center" ><span style="font-size: 250%; color: black;">&clubs;</span></div>
               <div v-if="atout == 'hearts'" class="p-text-center" ><span style="font-size: 250%; color: red;">&hearts;</span></div>
            </div>
            <div v-if="playId != -1 && currentGame == 'tarot'" class="p-col-fixed p-card atout"  style="width:200px;height:150px">
               <!--<div v-if="atout != ''" class="p-col-12 p-text-center p-text-bold">ATOUT</div>-->
               <div v-if="atout != ''" class="p-col-12 p-text-center p-text-bold">Roi Appelé</div>
               <div v-if="bidPlayer != ''" class="p-col-12 p-text-center p-text-bold">{{bidPlayer}}</div>
               <div v-if="atout == 'spades'" class="p-text-center" ><span style="font-size: 250%; color: black;">&spades;</span></div>
               <div v-if="atout == 'diamonds'" class="p-text-center" ><span style="font-size: 250%; color: red;">&diams;</span></div>
               <div v-if="atout == 'clubs'" class="p-text-center" ><span style="font-size: 250%; color: black;">&clubs;</span></div>
               <div v-if="atout == 'hearts'" class="p-text-center" ><span style="font-size: 250%; color: red;">&hearts;</span></div>
            </div>
            <div class="p-col" />
            <div class="p-col-fixed"  style="width:250px;height:150px">
            <Hand :handId="hands[2]" :handOn="handsOn[2]" :playerIndex="handPlayersIndex[2]" :playerId="players[2]" :indexUser="2" :roundId="roundId" :cwidth="cardWidth" :activePlayer="activePlayer" :playId="playId"  :atout="atout" :state="roundState" :game="currentGame"/>
            </div>
            <div class="p-col" />
            <div v-if="playId != -1" class="p-col-fixed p-card atout"  style="width:200px;height:150px">
               <div class="p-col-12 p-text-center p-text-bold">SCORE</div>
               <div v-if="scores[0] != null && (scores[0] != 0 || scores[1] != 0)" class="p-text-center">
                  <Chart type="horizontalBar" :data="scoresData" :options="scoresOptions"/>
               </div>
            </div>
            <div class="p-col-fixed"  style="width:200px;text-align: center;">
               {{ playersName[3] }}
            </div>
            <div class="p-col" />
            <div class="p-col-fixed"  style="width:250px;text-align: center;">
               {{playersName[2]}}
            </div>
            <div class="p-col" />
            <div class="p-col-fixed"  style="width:200px;text-align: center;">
               {{playersName[1]}}
            </div>


            <div class="p-col-fixed"  style="width:150px;height:250px">
            <!--<MyHand :handId="hands[3]" :handOn="handsOn[3]"  :playerIndex="handPlayersIndex[3]" :playerId="players[3]" :indexUser="1"  :roundId="roundId" :cwidth="cardWidth" :activePlayer="activePlayer" :playId="playId" :atout="atout" :state="roundState" :game="currentGame"/>-->
            <Hand :handId="hands[3]" :handOn="handsOn[3]"  :playerIndex="handPlayersIndex[3]" :playerId="players[3]" :indexUser="1"  :roundId="roundId" :cwidth="cardWidth" :activePlayer="activePlayer" :playId="playId"  :atout="atout" :state="roundState" :game="currentGame"/>
            </div>
            <div class="p-col" />
            <div class="p-col-fixed"  style="width:350px;height:250px">
               <!--<div class="p-d-flex p-jc-center">-->
               <Deck :myround="roundId" :trickId="trickId" :playerId="players[0]" :nbPlayer="players.length" :playerIndex="playersIndex[0]" :playId="playId" :state="roundState" :choice="choice" :game="currentGame"/>
               <!--</div>-->
            </div>
            <div class="p-col" />
            <div class="p-col-fixed"  style="width:150px;height:250px">
            <!--<MyHand :handId="hands[1]" :handOn="handsOn[1]"  :playerIndex="handPlayersIndex[1]" :playerId="players[1]" :indexUser="3" :roundId="roundId"  :activePlayer="activePlayer" :cwidth="cardWidth" :playId="playId" :atout="atout" :state="roundState" :game="currentGame"/>-->
            <Hand :handId="hands[1]" :handOn="handsOn[1]"  :playerIndex="handPlayersIndex[1]" :playerId="players[1]" :indexUser="3" :roundId="roundId"  :activePlayer="activePlayer" :cwidth="cardWidth" :playId="playId"  :atout="atout" :state="roundState" :game="currentGame"/>
            </div>
            <div class="p-d-flex p-flex-column" style="width:100px;height:320px">
            <div class="p-col-fixed"  style="width:100px;height:220px"/>
            <div v-if="lastScore.length == 0" class="p-col-fixed"  style="width:100px;height:100px"/>
            <div v-if="lastScore.length > 0" class="p-col-fixed p-card atout"  style="width:200px;height:100px">
               <div class="p-col-12 p-text-center p-text-bold">DERNIERE PARTIE</div>
               <div class="p-col-12 p-text-center p-text-bold">{{ lastScore[0]}} / {{lastScore[1]}}</div>
            </div>
            </div>

            <div class="p-col" />
            <div class="p-col-fixed"  style="width:450px;height:320px">
            <MyHand :handId="hands[0]" :handOn="handsOn[0]" :playerIndex="handPlayersIndex[0]" :playerId="players[0]"  :indexUser="0" :roundId="roundId" :activePlayer="activePlayer" :cwidth="myCardWidth" :playId="playId" :atout="atout" :state="roundState" :game="currentGame"/>
            </div>                  
            <div class="p-col" />
            <div class="p-col-fixed"  style="width:100px;height:320px"/>
         </div>   
      </template>   
   </Card>
</template>
<style>
.atout {
     background:#efefef !important;

 /*border-width:2px;
 border-style:solid;
 border-color:black;*/
 }
</style>

<script>
import firebase from 'firebase';
import Hand from './Hand'
import MyHand from './MyHand'
import Deck from './Deck'
import '../plugins/firebase'
import db from '../plugins/firebase';
import Chart from 'primevue/chart';
import Card from 'primevue/card';

   export default {
      name: 'Playground',
      data() {
            return {
               hands: [[],[],[],[]],
               handsOn: [[],[],[],[]],
               handPlayersIndex: [-1,-1,-1,-1],
               players: ["","","",""],
               playersName: ["","","",""],
               playersIndex: [0,0,0,0],
               playId: -1,
               roundId: -1,
               trickId: -1,
               currentGame: "belote",
               cardWidth: 78,
               myCardWidth: 140,
               scores: [0,0],
               playDocRef: null,
               playDocSubs: null,
               roundDocRef: null,
               roundDocSubs: null,
               handDocRef: null,
               handDocSubs: null,
               atout: '',
               bidPlayer: '',
               activePlayer: -1,
               roundState: '',
               lastScore: [],
               choice: [],
               scoresOptions: {
                  legend: false,
                  responsive: true,
                  hoverMode: 'index',
                  scales: {
                     xAxes: [
                        {
                           type: 'linear',
                           display: true,
                           position: 'left',
                           id: 'x-axis-1',
                           ticks: {
                              min: 0,
                              max: 1000
                           }
                        }

                     ]
                  }
               },
               basicData: {

                  labels: ['Nous', 'Eux'], 
                  datasets: [
                     {
                        label: 'Scores',
                        backgroundColor: '#42A5F5',
                        data: [35,45]
                     }        
                  ]
               }  
            }
      }, 
      props: ['playerUid','playerName'],
      components: {
         Hand,
         MyHand,
         Deck,
         Chart,
         Card
      },
      created(){
      },
      mounted(){
         this.emitter.on("select-play", (uid) => {
            console.log("receive event play : " + uid);
      
            if (this.playDocSubs != null) {
               this.playDocSubs();
               this.playDocSubs = null;
            }
            this.atout = "";
            this.bidPlayer = "";
            this.playId = uid;
            this.playDocRef = db.collection("plays").doc(this.playId);
            this.playDocSubs = this.playDocRef.onSnapshot((doc) => {
               console.log("Plays onSnapshot launched (Playground 1)");
               //this.roundId = doc.data().round;
               var handArray = [];
               var handOnArray = [];
               var playerIndexArray = [];
               var playerArray = [];
               var playerId = firebase.auth().currentUser.uid;
               var i = 0;
               var active = 0;
               var round = -1;
               console.log("player id : " + playerId);
               console.log("players " + doc.data().players);
               this.currentGame = doc.data().game;
               if (this.currentGame == "belote") {
                  if (doc.data().players[0] == playerId || doc.data().players[2] == playerId) {
                     this.scores[0] = doc.data().score[0];
                     this.scores[1] = doc.data().score[1];
                  }
                  else {
                     this.scores[1] = doc.data().score[0];
                     this.scores[0] = doc.data().score[1];                  
                  }
                  this.scoresData = {labels: ['Nous', 'Eux'], datasets: [{label: 'Scores',backgroundColor: ['#42A5F5','#FFA726'], data: [this.scores[0],this.scores[1]]}]};

                  if (typeof doc.data().lastScore != "undefined" && doc.data().lastScore.length > 0)
                     if (doc.data().players[0] == playerId || doc.data().players[2] == playerId)
                        this.lastScore = doc.data().lastScore;
                     else {
                        this.lastScore[1] = doc.data().lastScore[0];
                        this.lastScore[0] = doc.data().lastScore[1];
                     }
                  else {
                     this.lastScore = [];
                  }
               }             

               if (doc.data().round != this.roundId) {
                  if (this.roundDocSubs != null) {
                     this.roundDocSubs();
                     this.roundDocSubs = null;
                  }
                  if (this.handDocSubs != null) {
                     this.handDocSubs();
                     this.handDocSubs = null;
                  }
                  this.roundId = doc.data().round;
                  this.roundDocRef = this.playDocRef.collection("rounds").doc(this.roundId);
                  this.handDocSubs = this.roundDocRef.collection("hands")
                     .onSnapshot((querySnapshot) => {
                           console.log("Hands onSnapshot launched (Playground 2)");
                           querySnapshot.forEach((rdoc) => {
                              i = rdoc.data().playerIndex;
                              console.log("doc : " + rdoc.data().handOn)
                              handArray[i] = rdoc.id;// data().handOn;
                              handOnArray[i] = rdoc.data().handOn;
                              playerIndexArray[i] = rdoc.data().playerIndex;
                              playerArray[i] = rdoc.data().player;
                              if (rdoc.data().player == firebase.auth().currentUser.uid) {
                                 active=i;
                                 round = rdoc.data().round;
                              }
                              i++;
                           });
                        console.log("round : " + round);
                        for (var j=0;j<this.hands.length;j++) {
                           var hand = handArray[(active+j)%this.hands.length];
                           this.handPlayersIndex[j] = playerIndexArray[(active+j)%this.hands.length];
                           this.handsOn[j] = handOnArray[(active+j)%this.hands.length];
                           if (this.hands[j] != hand) {
                              this.hands[j] = hand;
                              this.players[j] = playerArray[(active+j)%this.hands.length];
                              for (var k=0;k<doc.data().playersName.length;k++) {
                                 if (doc.data().playersName[k].id == this.players[j])  {
                                    this.playersName[j] = doc.data().playersName[k].name;
                                    break;
                                 }
                              }
                              this.playersIndex[j] = (active+j)%this.hands.length;
                           }
                        }
                  });
                  this.roundDocSubs = this.roundDocRef.onSnapshot((rdoc) => {
                     console.log("Rounds onSnapshot launched (Playground 2)");
                     if (rdoc.data().tricks.length > 0)
                        this.trickId = rdoc.data().currentTrick;
                        this.activePlayer = rdoc.data().active;
                        this.atout = rdoc.data().atout;
                        this.choice = rdoc.data().choice;
                        this.roundState = rdoc.data().state;
                        this.bidPlayer = rdoc.data().bidPlayer;
                  });
               }
            });
         });
 
      },
      methods: {
      }
   }       
</script>