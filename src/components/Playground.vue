<template>
   <!--<div class="p-grid">
      <div class="p-col-4 p-offset-4">
      <Hand :handId="hands[2]" :playerId="players[2]" :indexUser="2" :playId="playGroundID" />
      </div>
      <div class="p-col-4" />
      <div class="p-col-4">
      <Hand :handId="hands[3]" :playerId="players[3]" :indexUser="1" :playId="playGroundID" />
      </div>
      <div class="p-col-4" >
         <div class="p-d-flex p-jc-center">
         <Deck :myround="roundId" :trickId="trickId"/>
         </div>
      </div>
      <div class="p-col-4">
      <Hand :handId="hands[1]" :playerId="players[1]" :indexUser="3" :playId="playGroundID" />
      </div>
      <div class="p-col-4 p-offset-4">
      <Hand :handId="hands[0]" :playerId="players[0]" :indexUser="0" :playId="playGroundID" />
      </div>                  
      <div class="p-col-4" />
   </div> -->
   <div class="p-grid">
      <div class="p-col-fixed"  style="width:200px;height:150px"/>
      <div class="p-col" />
      <div class="p-col-fixed"  style="width:250px;height:150px">
      <MyHand :handId="hands[2]" :playerId="players[2]" :indexUser="2" :roundId="roundId" :cwidth="cardWidth" :playId="playGroundID" />
      </div>
      <div class="p-col" />
      <div class="p-col-fixed"  style="width:200px;height:150px"/>

      <div class="p-col-fixed"  style="width:150px;height:250px">
      <MyHand :handId="hands[3]" :playerId="players[3]" :indexUser="1" :roundId="roundId" :cwidth="cardWidth" :playId="playGroundID" />
      </div>
      <div class="p-col" />
      <div class="p-col-fixed"  style="width:350px;height:250px">
         <!--<div class="p-d-flex p-jc-center">-->
         <Deck :myround="roundId" :trickId="trickId" :playId="playGroundID"/>
         <!--</div>-->
      </div>
      <div class="p-col" />
      <div class="p-col-fixed"  style="width:150px;height:250px">
      <MyHand :handId="hands[1]" :playerId="players[1]" :indexUser="3" :roundId="roundId" :cwidth="cardWidth" :playId="playGroundID" />
      </div>

      <div class="p-col-fixed"  style="width:100px;height:400px"/>
      <div class="p-col" />
      <div class="p-col-fixed"  style="width:450px;height:400px">
      <MyHand :handId="hands[0]" :playerId="players[0]" :indexUser="0" :roundId="roundId" :cwidth="myCardWidth" :playId="playGroundID" />
      </div>                  
      <div class="p-col" />
      <div class="p-col-fixed"  style="width:100px;height:400px"/>
   </div>   
</template>

<script>
import firebase from 'firebase';
//import Hand from './Hand'
import MyHand from './MyHand'
import Deck from './Deck'
import '../plugins/firebase'
import db from '../plugins/firebase';


//const { decks } = require('cards');
//const deck = new decks.PiquetDeck();

//var unsubscribeRound;
//var unsubscribePlay;

   export default {
      name: 'Playground',
      data() {
            return {
                hands: [[],[],[],[]],
                players: ["","","",""],
                playGroundID: -1,
                roundId: -1,
                trickId: -1,
                currentGame: "belote",
                cardWidth: 78,
                myCardWidth: 140,
                myIndex: -1
            }
      }, 
      props: ['playerUid','playerName'],
      components: {
         //Hand,
         MyHand,
         Deck
      },
      created(){
      },
      mounted(){
         this.emitter.on("select-play", (uid) => {
            console.log("receive event play : " + uid);
      
            this.playGroundID = uid;
            db.collection("plays").doc(this.playGroundID)
               //.get().then((doc) => {
               .onSnapshot((doc) => {

               this.roundId = doc.data().round;

               var handArray = [];
               var playerArray = [];
               var i = 0;
               var active = 0;
               var round = -1;
               db.collection("plays").doc(this.playGroundID)
                  .collection("rounds").doc(this.roundId).
                  collection("hands")
                  //.where("round", "==", this.roundId)
                  .onSnapshot((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                           i = doc.data().playerIndex;
                           console.log("doc : " + doc.data().handOn)
                           handArray[i] = doc.id;// data().handOn;
                           playerArray[i] = doc.data().player;
                           if (doc.data().player == firebase.auth().currentUser.uid) {
                              active=i;
                              round = doc.data().round;
                           }
                           i++;
                        });
                     console.log("round : " + round);
                     this.myIndex == active;
                     for (var j=0;j<this.hands.length;j++) {
                        this.hands[j] = handArray[(active+j)%this.hands.length];
                        this.players[j] = playerArray[(active+j)%this.hands.length];
                     }
               });
               db.collection("plays").doc(this.playGroundID).collection("rounds").doc(this.roundId)
                  .onSnapshot((rdoc) => {
                     if (rdoc.data().tricks.length > 0)
                        this.trickId = rdoc.data().currentTrick;
               });  
            });
         });
 
      },
      methods: {
      }
   }       
</script>