<template>
   <div class="p-grid">
      <div class="p-col-fixed"  style="width:200px;height:150px">
         <div v-if="atout == 'spades'" class="p-text-center" >ATOUT : <span>&spades;</span></div>
         <div v-if="atout == 'diamonds'" class="p-text-center" >ATOUT : <span>&diams;</span></div>
         <div v-if="atout == 'clubs'" class="p-text-center" >ATOUT : <span>&clubs;</span></div>
         <div v-if="atout == 'hearts'" class="p-text-center" >ATOUT : <span>&hearts;</span></div>
      </div>
      <div class="p-col" />
      <div class="p-col-fixed"  style="width:250px;height:150px">
      <Hand :handId="hands[2]" :playerId="players[2]" :indexUser="2" :roundId="roundId" :cwidth="cardWidth" :playId="playId" />
      </div>
      <div class="p-col" />
      <div class="p-col-fixed"  style="width:200px;height:150px">
         <div class="p-text-center">NOUS : {{scores[0]}} - EUX : {{scores[1]}}</div>
      </div>

      <div class="p-col-fixed"  style="width:150px;height:250px">
      <MyHand :handId="hands[3]" :playerId="players[3]" :indexUser="1"  :roundId="roundId" :cwidth="cardWidth" :playId="playId" />
      </div>
      <div class="p-col" />
      <div class="p-col-fixed"  style="width:350px;height:250px">
         <!--<div class="p-d-flex p-jc-center">-->
         <Deck :myround="roundId" :trickId="trickId" :playerId="players[0]" :nbPlayer="players.length" :playerIndex="playersIndex[0]" :playId="playId"/>
         <!--</div>-->
      </div>
      <div class="p-col" />
      <div class="p-col-fixed"  style="width:150px;height:250px">
      <MyHand :handId="hands[1]" :playerId="players[1]" :indexUser="3" :roundId="roundId"  :cwidth="cardWidth" :playId="playId" />
      </div>

      <div class="p-col-fixed"  style="width:100px;height:400px"/>
      <div class="p-col" />
      <div class="p-col-fixed"  style="width:450px;height:400px">
      <MyHand :handId="hands[0]" :playerId="players[0]" :indexUser="0" :roundId="roundId" :cwidth="myCardWidth" :playId="playId" />
      </div>                  
      <div class="p-col" />
      <div class="p-col-fixed"  style="width:100px;height:400px"/>
   </div>   
</template>

<script>
import firebase from 'firebase';
import Hand from './Hand'
import MyHand from './MyHand'
import Deck from './Deck'
import '../plugins/firebase'
import db from '../plugins/firebase';

   export default {
      name: 'Playground',
      data() {
            return {
                hands: [[],[],[],[]],
                players: ["","","",""],
                playersIndex: [0,0,0,0],
                playId: -1,
                roundId: -1,
                trickId: -1,
                currentGame: "belote",
                cardWidth: 78,
                myCardWidth: 140,
                myIndex: -1,
                scores: [0,0],
                playDocRef: null,
                playDocSubs: null,
                roundDocRef: null,
                roundDocSubs: null,
                handDocRef: null,
                handDocSubs: null,
                atout: ''
            }
      }, 
      props: ['playerUid','playerName'],
      components: {
         Hand,
         MyHand,
         Deck
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
            this.playId = uid;
            this.playDocRef = db.collection("plays").doc(this.playId);
            this.playDocSubs = this.playDocRef.onSnapshot((doc) => {
               //this.roundId = doc.data().round;
               var handArray = [];
               var playerArray = [];
               var playerId = firebase.auth().currentUser.uid;
               var i = 0;
               var active = 0;
               var round = -1;
               console.log("player id : " + playerId);
               console.log("players " + doc.data().players);
               if (doc.data().players[0] == playerId || doc.data().players[2] == playerId) {
                  this.scores[0] = doc.data().score[0];
                  this.scores[1] = doc.data().score[1];
               }
               else {
                  this.scores[1] = doc.data().score[0];
                  this.scores[0] = doc.data().score[1];                  
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
                           querySnapshot.forEach((rdoc) => {
                              i = rdoc.data().playerIndex;
                              console.log("doc : " + rdoc.data().handOn)
                              handArray[i] = rdoc.id;// data().handOn;
                              playerArray[i] = rdoc.data().player;
                              if (rdoc.data().player == firebase.auth().currentUser.uid) {
                                 active=i;
                                 round = rdoc.data().round;
                              }
                              i++;
                           });
                        console.log("round : " + round);
                        this.myIndex == active;
                        for (var j=0;j<this.hands.length;j++) {
                           this.hands[j] = handArray[(active+j)%this.hands.length];
                           this.players[j] = playerArray[(active+j)%this.hands.length];
                           this.playersIndex[j] = (active+j)%this.hands.length;
                        }

                  });
                  this.roundDocSubs = this.roundDocRef.onSnapshot((rdoc) => {
                     if (rdoc.data().tricks.length > 0)
                        this.trickId = rdoc.data().currentTrick;
                        this.atout = rdoc.data().atout;
                  });
               }
            });
         });
 
      },
      methods: {
      }
   }       
</script>