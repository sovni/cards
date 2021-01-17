<template>
   <div class="p-grid" style="width:800px">
      <div class="p-col-12 p-m-0 p-p-0">
   <Card style="width:800px;height:800px;" class="tapis">
      <template v-slot:title v-if="playId == -1">
         Sélectionnez ou créez une partie
      </template>
      <template v-slot:content >
         <div class="p-grid" v-if="currentGame == 'belote'">
            <div v-if="playId != -1" class="p-col-3 p-card atout" style="height:150px">
               <!--<div v-if="atout != ''" class="p-col-12 p-text-center p-text-bold">ATOUT</div>-->
               <div v-if="atout != ''" class="p-col-12 p-text-center p-text-bold">ATOUT</div>
               <div v-if="bidPlayer != ''" class="p-col-12 p-text-center p-text-bold">{{bidPlayer}}</div>
               <div v-if="atout == 'spades'" class="p-text-center" ><span style="font-size: 250%; color: black;">&spades;</span></div>
               <div v-if="atout == 'diamonds'" class="p-text-center" ><span style="font-size: 250%; color: red;">&diams;</span></div>
               <div v-if="atout == 'clubs'" class="p-text-center" ><span style="font-size: 250%; color: black;">&clubs;</span></div>
               <div v-if="atout == 'hearts'" class="p-text-center" ><span style="font-size: 250%; color: red;">&hearts;</span></div>
            </div>
            <div class="p-col-1" />
            <div class="p-col-4"  style="height:150px">
            <Hand :handId="hands[2]" :handOn="handsOn[2]" :playerIndex="handPlayersIndex[2]" :playerId="players[2]" :indexUser="2" :roundId="roundId" :cwidth="cardWidth" :activePlayer="activePlayer" :playId="playId"  :atout="atout" :state="roundState" :playState="playState" :dealer="dealer" :game="currentGame"/>
            </div>
            <div class="p-col-1" />
            <div v-if="playId != -1" class="p-col-3 p-card atout"  style="height:150px">
               <div class="p-col-12 p-text-center p-text-bold">SCORE</div>
               <div v-if="scores[0] != null && (scores[0] != 0 || scores[1] != 0)" class="p-text-center">
                  <Chart type="horizontalBar" :data="scoresData" :options="scoresOptions"/>
               </div>
            </div>

            <div class="p-col-3"  style="text-align: center;">
            </div>
            <div class="p-col" />
            <div class="p-col-4 p-text-bold"  style="text-align: center;">
              <Badge v-if="playersName[2] != '' && playersStatus[2] == 'online'" severity="success" value=""></Badge>
              <Badge v-if="playersName[2] != '' && playersStatus[2] == 'onlinebut'" severity="warning" value=""></Badge>
              <Badge v-if="playersName[2] != '' && playersStatus[2] == 'offline'" severity="danger" value=""></Badge>
              {{playersName[2]}}
            </div>
            <div class="p-col" />
            <div class="p-col-3"  style="width:200px;text-align: center;">
            </div>


            <div class="p-col-3"  style="height:250px">
            <!--<MyHand :handId="hands[3]" :handOn="handsOn[3]"  :playerIndex="handPlayersIndex[3]" :playerId="players[3]" :indexUser="3"  :roundId="roundId" :cwidth="cardWidth" :activePlayer="activePlayer" :playId="playId" :atout="atout" :state="roundState" :game="currentGame"/>-->
            <Hand :handId="hands[3]" :handOn="handsOn[3]"  :playerIndex="handPlayersIndex[3]" :playerId="players[3]" :indexUser="3"  :roundId="roundId" :cwidth="cardWidth" :activePlayer="activePlayer" :playId="playId"  :atout="atout" :state="roundState" :playState="playState" :dealer="dealer" :game="currentGame"/>
            </div>
            <div class="p-col-6"  style="height:250px">
               <!--<div class="p-d-flex p-jc-center">-->
               <Deck :myround="roundId" :trickId="trickId" :playerId="players[0]" :nbPlayer="4" :playerIndex="playersIndex[0]" :playId="playId" :state="roundState" :choice="choice" :game="currentGame"/>
               <!--</div>-->
            </div>
            <div class="p-col-3"  style="height:250px">
            <!--<MyHand :handId="hands[1]" :handOn="handsOn[1]"  :playerIndex="handPlayersIndex[1]" :playerId="players[1]" :indexUser="1" :roundId="roundId"  :activePlayer="activePlayer" :cwidth="cardWidth" :playId="playId" :atout="atout" :state="roundState" :game="currentGame"/>-->
            <Hand :handId="hands[1]" :handOn="handsOn[1]"  :playerIndex="handPlayersIndex[1]" :playerId="players[1]" :indexUser="1" :roundId="roundId"  :activePlayer="activePlayer" :cwidth="cardWidth" :playId="playId"  :atout="atout" :state="roundState" :playState="playState" :dealer="dealer" :game="currentGame"/>
            </div>

            <div class="p-grid p-col-12 nested-grid">
               <div class="p-col-2">
                  <div class="p-col-12 p-text-bold"  style="text-align: left;">
                     <Badge v-if="playersName[3] != '' && playersStatus[3] == 'online'" severity="success" value=""></Badge>
                     <Badge v-if="playersName[3] != '' && playersStatus[3] == 'onlinebut'" severity="warning" value=""></Badge>
                     <Badge v-if="playersName[3] != '' && playersStatus[3] == 'offline'" severity="danger" value=""></Badge>
                     {{ playersName[3] }}
                  </div>
                  <div class="p-col-12 p-m-0 p-p-0" style="height:320px">
                     <div class="p-col-12"  style="height:165px"/>
                     <div v-if="lastScore.length == 0" class="p-col-12"  style="height:100px"/>
                     <div v-if="lastScore.length > 0" class="p-col-12 p-card atout"  style="height:100px">
                        <div class="p-col-12 p-text-center p-text-bold">DERNIERE PARTIE</div>
                        <div class="p-col-12 p-text-center p-text-bold">{{ lastScore[0]}} / {{lastScore[1]}}</div>
                     </div>
                  </div>
               </div>
               <div class="p-col-8">
                  <div class="p-col-12"  style="height:320px">
                  <MyHand :handId="hands[0]" :handOn="handsOn[0]" :playerIndex="handPlayersIndex[0]" :playerId="players[0]"  :indexUser="0" :roundId="roundId" :activePlayer="activePlayer" :cwidth="myCardWidth" :playId="playId" :atout="atout" :state="roundState" :playState="playState" :dealer="dealer" :game="currentGame"/>
                  </div>
               </div>
               <div class="p-col-2">
                  <div class="p-col-12 p-text-bold"  style="text-align: right;">
                     <Badge v-if="playersName[1] != '' && playersStatus[1] == 'online'" severity="success" value=""></Badge>
                     <Badge v-if="playersName[1] != '' && playersStatus[1] == 'onlinebut'" severity="warning" value=""></Badge>
                     <Badge v-if="playersName[1] != '' && playersStatus[1] == 'offline'" severity="danger" value=""></Badge>
                     {{ playersName[1] }}
                  </div>
                  <div class="p-col-12 p-m-0 p-p-0" style="height:320px">
                     <div class="p-col-12"  style="height:60px"/>
                     <div v-if="lastTrick.length == 0" class="p-col-12"  style="height:100px"/>
                     <div v-if="lastTrick.length > 0" class="p-col-12 p-m-0 p-p-0 p-card atout" >
                        <div class="p-col-12 p-text-center p-text-bold">DERNIER PLI</div>
                        <div class="p-col-12 p-m-0 p-p-0  p-grid " v-for="pcard of lastTrick" :key="pcard.rank">
                           <div v-if="pcard.rank == 'K'" class="p-col-6 p-text-center p-text-bold">Roi</div>
                           <div v-else-if="pcard.rank == 'Q'" class="p-col-6 p-text-center p-text-bold">Dame</div>
                           <div v-else-if="pcard.rank == 'J'" class="p-col-6 p-text-center p-text-bold">Valet</div>
                           <div v-else-if="pcard.rank == 'A'" class="p-col-6 p-text-center p-text-bold">As</div>
                           <div v-else class="p-col-6 p-text-center p-text-bold">{{ pcard.rank }}</div>
                           <div v-if="pcard.suit == 'spades'" class="p-col-6 p-text-center" ><span style="color: black;">&spades;</span></div>
                           <div v-if="pcard.suit == 'diamonds'" class="p-col-6 p-text-center" ><span style="color: red;">&diams;</span></div>
                           <div v-if="pcard.suit == 'clubs'" class="p-col-6 p-text-center" ><span style="color: black;">&clubs;</span></div>
                           <div v-if="pcard.suit == 'hearts'" class="p-col-6 p-text-center" ><span style="color: red;">&hearts;</span></div>
                           <!--<div class="p-col-6 p-text-center p-text-bold">{{ pcard.rank }}</div>
                           <div class="p-col-6 p-text-center p-text-bold">{{ pcard.suit }}</div>-->
                        </div>
                     </div>
                  </div>
               </div>           
            </div> 
         </div>   

         <div class="p-grid" v-if="currentGame == 'tarot'">
            <div class="p-col-3"  style="height:150px">
               <Hand :handId="hands[3]" :handOn="handsOn[3]" :playerIndex="handPlayersIndex[3]" :playerId="players[3]" :indexUser="3" :roundId="roundId" :cwidth="cardWidth" :activePlayer="activePlayer" :playId="playId"  :atout="atout" :state="roundState" :playState="playState" :dealer="dealer" :game="currentGame" :bidContract="bidContract"/>
            </div>
            <div class="p-col" />
            <div v-if="playId != -1" class="p-col-4 p-card atout p-grid" style="height:150px">
               <div v-if="bidPlayer != '' && bidPlayer != undefined" class="p-col-6 p-text-center p-text-bold">Contrat: </div>
               <div class="p-col-6 p-text-center p-text-bold" v-if="bidContract == 'petite'">Petite</div>
               <div class="p-col-6 p-text-center p-text-bold" v-if="bidContract == 'garde'">Garde</div>
               <div class="p-col-6 p-text-center p-text-bold" v-if="bidContract == 'gardesans'">Garde Sans</div>
               <div class="p-col-6 p-text-center p-text-bold" v-if="bidContract == 'gardecontre'">Garde Contre</div>
               <div v-if="bidPlayer != '' && bidPlayer != undefined" class="p-col-6 p-text-center p-text-bold">Joueur:</div>
               <div v-if="bidPlayer != '' && bidPlayer != undefined" class="p-col-6 p-text-center p-text-bold">{{ bidPlayer }}</div>
               <div v-if="atout != '' && atout != undefined" class="p-col-6 p-text-center p-text-bold king">Roi Appelé:</div>
               <div v-if="atout == 'swords'" class="p-col-6 p-text-center" ><span style="font-size: 250%; color: black;">&spades;</span></div>
               <div v-if="atout == 'coins'" class="p-col-6 p-text-center" ><span style="font-size: 250%; color: red;">&diams;</span></div>
               <div v-if="atout == 'wands'" class="p-col-6 p-text-center" ><span style="font-size: 250%; color: black;">&clubs;</span></div>
               <div v-if="atout == 'cups'" class="p-col-6 p-text-center" ><span style="font-size: 250%; color: red;">&hearts;</span></div>
            </div>

            <div class="p-col" />
            <div class="p-col-3" style="height:150px">
               <Hand :handId="hands[2]" :handOn="handsOn[2]" :playerIndex="handPlayersIndex[2]" :playerId="players[2]" :indexUser="2" :roundId="roundId" :cwidth="cardWidth" :activePlayer="activePlayer" :playId="playId"  :atout="atout" :state="roundState" :playState="playState" :dealer="dealer" :game="currentGame" :bidContract="bidContract"/>
            </div>

            <div class="p-col-2"  style="text-align: center;" />
            <div class="p-col-3 p-text-bold"  style="text-align: center;">
               <Badge v-if="playersName[3] != '' && playersStatus[3] == 'online'" severity="success" value=""></Badge>
               <Badge v-if="playersName[3] != '' && playersStatus[3] == 'onlinebut'" severity="warning" value=""></Badge>
               <Badge v-if="playersName[3] != '' && playersStatus[3] == 'offline'" severity="danger" value=""></Badge>
               {{playersName[3]}}
            </div>
            <div class="p-col-2" />
            <div class="p-col-3 p-text-bold"  style="text-align: center;">
               <Badge v-if="playersName[2] != '' && playersStatus[2] == 'online'" severity="success" value=""></Badge>
               <Badge v-if="playersName[2] != '' && playersStatus[2] == 'onlinebut'" severity="warning" value=""></Badge>
               <Badge v-if="playersName[2] != '' && playersStatus[2] == 'offline'" severity="danger" value=""></Badge>
               {{playersName[2]}}
            </div>
            <div class="p-col-2"  style="text-align: center;" />

            <div class="p-col-3"  style="height:250px">
               <!--<MyHand :handId="hands[4]" :handOn="handsOn[4]"  :playerIndex="handPlayersIndex[4]" :playerId="players[4]" :indexUser="4"  :roundId="roundId" :cwidth="cardWidth" :activePlayer="activePlayer" :playId="playId" :atout="atout" :state="roundState" :game="currentGame"/>-->
               <Hand :handId="hands[4]" :handOn="handsOn[4]"  :playerIndex="handPlayersIndex[4]" :playerId="players[4]" :indexUser="4"  :roundId="roundId" :cwidth="cardWidth" :activePlayer="activePlayer" :playId="playId"  :atout="atout" :state="roundState" :playState="playState" :dealer="dealer" :game="currentGame" :bidContract="bidContract"/>
            </div>
            <div class="p-col-6"  style="height:250px">
               <!--<div class="p-d-flex p-jc-center">-->
               <Deck :myround="roundId" :trickId="trickId" :playerId="players[0]" :nbPlayer="players.length" :playerIndex="playersIndex[0]" :playId="playId" :state="roundState" :choice="choice" :game="currentGame"/>
               <!--</div>-->
            </div>
            <div class="p-col-3"  style="height:250px">
               <!--<MyHand :handId="hands[1]" :handOn="handsOn[1]"  :playerIndex="handPlayersIndex[1]" :playerId="players[1]" :indexUser="1" :roundId="roundId"  :activePlayer="activePlayer" :cwidth="cardWidth" :playId="playId" :atout="atout" :state="roundState" :game="currentGame"/>-->
               <Hand :handId="hands[1]" :handOn="handsOn[1]"  :playerIndex="handPlayersIndex[1]" :playerId="players[1]" :indexUser="1" :roundId="roundId"  :activePlayer="activePlayer" :cwidth="cardWidth" :playId="playId"  :atout="atout" :state="roundState" :playState="playState" :dealer="dealer" :game="currentGame" :bidContract="bidContract"/>
            </div>


            <div class="p-grid p-col-12 nested-grid">
               <div class="p-col-2">
                  <div class="p-col-12 p-text-bold"  style="text-align: left;">
                     <Badge v-if="playersName[4] != '' && playersStatus[4] == 'online'" severity="success" value=""></Badge>
                     <Badge v-if="playersName[4] != '' && playersStatus[4] == 'onlinebut'" severity="warning" value=""></Badge>
                     <Badge v-if="playersName[4] != '' && playersStatus[4] == 'offline'" severity="danger" value=""></Badge>
                     {{ playersName[4] }}
                  </div>
               </div>
               <div class="p-col-8">
                  <div class="p-col-12"  style="height:320px">
                     <MyHand :handId="hands[0]" :handOn="handsOn[0]" :playerIndex="handPlayersIndex[0]" :playerId="players[0]"  :indexUser="0" :roundId="roundId" :activePlayer="activePlayer" :cwidth="myCardWidth" :playId="playId" :atout="atout" :state="roundState" :playState="playState" :dealer="dealer" :game="currentGame" :bidContract="bidContract"/>
                  </div>
               </div>
               <div class="p-col-2">
                  <div class="p-col-12 p-text-bold"  style="text-align: right;">
                     <Badge v-if="playersName[1] != '' && playersStatus[1] == 'online'" severity="success" value=""></Badge>
                     <Badge v-if="playersName[1] != '' && playersStatus[1] == 'onlinebut'" severity="warning" value=""></Badge>
                     <Badge v-if="playersName[1] != '' && playersStatus[1] == 'offline'" severity="danger" value=""></Badge>
                     {{ playersName[1] }}
                  </div>
               </div>           
            </div> 
         </div>   
      </template>   
   </Card>
      </div>
      <div class="p-col-6">
         <Card v-if="playId != -1 && currentGame == 'tarot'"  class="tapis">
            <template v-slot:title>
               Dernière Partie
            </template>
            <template v-slot:content >
               <div v-if="lastBid != ''" class="p-col-12 p-card p-grid atout" >
                  <div class="p-col-6 p-text-center p-text-bold">Contrat</div>
                  <div class="p-col-6 p-text-center p-text-bold" v-if="lastBid == 'petite'">Petite</div>
                  <div class="p-col-6 p-text-center p-text-bold" v-if="lastBid == 'garde'">Garde</div>
                  <div class="p-col-6 p-text-center p-text-bold" v-if="lastBid == 'gardesans'">Garde Sans</div>
                  <div class="p-col-6 p-text-center p-text-bold" v-if="lastBid == 'gardecontre'">Garde Contre</div>
                  <div class="p-col-6 p-text-center p-text-bold">Résultat</div>
                  <div class="p-col-6 p-text-center p-text-bold">{{ (isLastWin()) ? 'GAGNE' : 'PERDU' }}</div>
                  <div class="p-col-6 p-text-center p-text-bold">Nombre de bouts</div>
                  <div class="p-col-6 p-text-center p-text-bold">{{ lastNbBouts }}</div>
                  <div class="p-col-6 p-text-center p-text-bold">Points</div>
                  <div class="p-col-6 p-text-center p-text-bold">{{ displayResult() }}</div>
               </div>
               <div class="p-col-12"/>
               <div class="p-col-12 p-card p-grid  atout" v-for="pscore of lastScore" :key="pscore.name">
                  <div class="p-col-6 p-text-center p-text-bold">{{ pscore.name }}</div>
                  <div class="p-col-6 p-text-center p-text-bold">{{ pscore.score }}</div>
               </div>
            </template>   
         </Card>
      </div>
      <div class="p-col-6">
         <Card v-if="playId != -1 && currentGame == 'tarot'"  class="tapis">
            <template v-slot:title>
               Score
            </template>
            <template v-slot:content >
               <!--<div v-if="tarotScores[0] != null && (tarotScores[0] != 0 || tarotScores[1] != 0)" class="p-text-center">-->
               <div v-if="tarotScores[0] != null" class="p-text-center">
                  <Chart type="horizontalBar" :data="scoresTarotData" :options="scoresTarotOptions"/>
               </div>
            </template>   
         </Card>
      </div>
</div>
</template>
<style>
.atout {
     background:#efefef !important;

 /*border-width:2px;
 border-style:solid;
 border-color:black;*/
 }

 /*.tapis {
    background-image: url("../assets/tapis.jpg") !important;
   background-size: 800px 800px !important;
}*/
.king {
  vertical-align: middle;
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
import Badge from 'primevue/badge';

   export default {
      name: 'Playground',
      data() {
            return {
               hands: [-1,-1,-1,-1,-1],
               handsOn: [[],[],[],[],[]],
               handPlayersIndex: [-1,-1,-1,-1,-1],
               players: ["","","","",""],
               playersName: ["","","","",""],
               playersStatus: ["","","","",""],
               playersIndex: [0,0,0,0,0],
               playId: -1,
               roundId: -1,
               trickId: -1,
               currentGame: "belote",
               cardWidth: 78,
               myCardWidth: 140,
               scores: [0,0],
               tarotScores: [0,0,0,0,0],
               playDocRef: null,
               playDocSubs: null,
               roundDocRef: null,
               roundDocSubs: null,
               handDocRef: null,
               handDocSubs: null,
               atout: '',
               bidPlayer: '',
               bidContract: '',
               activePlayer: -1,
               roundState: '',
               playState: '',
               dealer: -1,
               lastScore: [],
               lastTrick: [],
               lastBid: '',
               lastResult: 0,
               lastNbBouts: -1,
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
               scoresTarotOptions: {
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
                              min: -1000,
                              max: 1000
                           }
                        }

                     ]
                  }
               }
            }
      }, 
      props: ['playerUid','playerName'],
      components: {
         Hand,
         MyHand,
         Deck,
         Chart,
         Card,
         Badge
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
            this.hands = [-1,-1,-1,-1,-1];
            this.handsOn = [[],[],[],[],[]];
            this.handPlayersIndex = [-1,-1,-1,-1,-1];
            this.players = ["","","","",""];
            this.playersName = ["","","","",""];
            this.playersStatus = ["","","","",""];
            this.playersIndex = [0,0,0,0,0];
            this.lastScore = [];
            this.lastTrick = [];
            this.lastBid = "";
            this.lastNbBouts = -1;
            this.lastResult = 0;
            this.atout = "";
            this.bidPlayer = "";
            this.bidContract = "";
            this.playState = '';
            //this.playId = uid;
            this.playDocRef = db.collection("plays").doc(uid);
            var userStatusDatabaseRef = firebase.database().ref('/status/' + this.playerUid);
            userStatusDatabaseRef.update({playId : uid});

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
               this.playState = doc.data().state;
               this.dealer = doc.data().dealer;
               for (var k=0;k<doc.data().players.length;k++) {
                  if (doc.data().players[k] == playerId) {
                     this.handPlayersIndex[0] = k;
                     break;
                  }
               }
               console.log("Play id change 1 : " + this.playId);
               this.playId = uid;
               console.log("Play id change 2 : " + this.playId);

               if (this.currentGame == "belote") {
                  this.cardWidth = 78;
                  this.myCardWidth = 140;
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
               else if (this.currentGame == "tarot") {
                  this.cardWidth = 70;
                  this.myCardWidth = 120;
                  var chartLabels = [];

                  for (i=0;i<doc.data().playersName.length;i++) {
                     //if (doc.data().playersName[i].name.length > 3)
                     //   chartLabels.push(doc.data().playersName[i].name.substring(0,3) + "...");
                     //else
                        chartLabels.push(doc.data().playersName[i].name);
                     this.tarotScores[i] = doc.data().score[i];
                     this.lastScore[i] = {name: doc.data().playersName[i].name, score:doc.data().lastScore[i]}
                     //this.lastScore[i].name = doc.data().playersName[i].name;
                     //this.lastScore[i].score = doc.data().score[i];
                  }
                  this.scoresTarotData = {labels: chartLabels, datasets: [{label: 'Scores',backgroundColor: ['#EC407A','#AB47BC','#42A5F5','#7E57C2','#66BB6A'], data: this.tarotScores}]};
                  if (typeof doc.data().lastBid != "undefined") {
                     this.lastBid = doc.data().lastBid;
                     this.lastNbBouts = doc.data().lastNbBouts;
                     this.lastResult = doc.data().lastResult;
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
                  console.log("round id : " + this.roundId)
                  if (this.roundId != undefined) {
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
                           for (var j=0;j<doc.data().nbPlayers;j++) {
                              var hand = handArray[(active+j)%doc.data().nbPlayers];
                              this.handPlayersIndex[j] = playerIndexArray[(active+j)%doc.data().nbPlayers];
                              this.handsOn[j] = handOnArray[(active+j)%doc.data().nbPlayers];
                              if (this.hands[j] != hand) {
                                 this.hands[j] = hand;
                                 this.players[j] = playerArray[(active+j)%doc.data().nbPlayers];
                                 for (var k=0;k<doc.data().playersName.length;k++) {
                                    if (doc.data().playersName[k].id == this.players[j])  {
                                       this.playersName[j] = doc.data().playersName[k].name;
                                       break;
                                    }
                                 }
                                 this.playersIndex[j] = (active+j)%doc.data().nbPlayers;
                              }
                           }
                           for (k=0;k<this.players.length;k++) {
                              console.log("Player Status launch check: " + this.players[k]);
                              var playerStatusRef = firebase.database().ref('status/' + this.players[k]);
                              playerStatusRef.on('value', (snapshot) => {
                                 const data = snapshot.val();
                                 if (data != null) {
                                    console.log("Player Status : " + data.uid + " :" + data.state);
                                    for (var m=0;m<this.players.length;m++) {
                                       if (this.players[m] == data.uid) {
                                          console.log("Player Status set (" + m + ") : " + data.uid + " :" + data.state);
                                          if (data.state == "online" && data.playId != this.playId)
                                             this.playersStatus[m] = "onlinebut";
                                          else
                                             this.playersStatus[m] = data.state;
                                          break;
                                       }
                                    }
                                 }
                              });                  
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
                        this.bidContract = rdoc.data().bidContract;
                        if (this.bidContract == undefined || this.bidContract == null)
                           this.bidContract = "";
                        if (typeof rdoc.data().lastTrick != "undefined" && rdoc.data().lastTrick.length > 0)
                           this.lastTrick = rdoc.data().lastTrick;
                        else
                           this.lastTrick = [];
                     });
                  }
               }


            });
         });
 
      },
      methods: {
         isLastWin() {
            var result = 0;

            if (this.lastNbBouts == 0 && this.lastResult >= 56)
               result = 1;
            else if (this.lastNbBouts == 1 && this.lastResult >= 51)
               result = 1;
            else if (this.lastNbBouts == 2 && this.lastResult >= 41)
               result = 1;
            else if (this.lastNbBouts == 3 && this.lastResult >= 36)
               result = 1;

            return result;
         },
         displayResult() {
            var result;

            result = this.lastResult;
            if (this.lastNbBouts == 0) {
               if (this.lastResult >= 56)
                  result += " (> 56)";
               else
                  result += " (< 56)";
            }
            else if (this.lastNbBouts == 1) {
               if (this.lastResult >= 51)
                  result += " (> 51)";
               else
                  result += " (< 51)";
            }
            else if (this.lastNbBouts == 2) {
               if (this.lastResult >= 41)
                  result += " (> 41)";
               else
                  result += " (< 41)";
            }
            else if (this.lastNbBouts == 3) {
               if (this.lastResult >= 36)
                  result += " (> 36)";
               else
                  result += " (< 36)";
            }            
            return result;
         }
      }
   }       
</script>