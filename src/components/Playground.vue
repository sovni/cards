<template>
   <div class="p-grid">
      <div class="p-col-4 p-offset-4">
      <Hand id="hand3" :handId="hand3" :playerId="player3" :activeUser="true" :indexUser="3"/>
      </div>
      <div class="p-col-4" />
      <div class="p-col-4">
      <Hand id="hand2" :handId="hand2" :playerId="player2" :activeUser="false" :indexUser="2"/>
      </div>
      <div class="p-col-4" >
         <Deck id="deck" :myround="roundID" />
      </div>
      <div class="p-col-4">
      <Hand id="hand4" :handId="hand4" :playerId="player4" :activeUser="true" :indexUser="4"/>
      </div>
      <div class="p-col-4 p-offset-4">
      <Hand id="hand1" :handId="hand1" :playerId="player1" :activeUser="true" :indexUser="1"/>
      </div>                  
      <div class="p-col-4" />
   </div>
</template>

<script>
import firebase from 'firebase';
import Hand from './Hand'
import Deck from './Deck'
import '../plugins/firebase'
import db from '../plugins/firebase';


//const { decks } = require('cards');
//const deck = new decks.PiquetDeck();

var unsubscribeRound;
//var unsubscribePlay;

   export default {
      name: 'Playground',
      data() {
            return {
                hand1: [],
                hand2: [],
                hand3: [],
                hand4: [],
                hands: [[],[],[],[]],
                playGroundID: -1,
                roundID: -1,
                currentGame: "belote"
            }
      }, 
      props: ['playerUid','playerName'],
      components: {
         Hand,
         Deck
      },
      created(){
      },
      mounted(){
         this.emitter.on("select-play", (uid) => {
            console.log("receive event play : " + uid);
            //if (this.playGroundID != -1)
            //   unsubscribePlay();
           if (this.roundID != -1)
               unsubscribeRound();               
            this.playGroundID = uid;

            /*unsubscribePlay = db.collection("plays").docRef(this.playGroundID)
               .onSnapshot((doc) => {
                  if (doc.data().players.length == 4 && doc.data().state == "not started") {
                     // draw cards
                  }
               });*/
            var handArray = [];
            var i = 0;
            var active = 0;
            var round = -1;
            db.collection("hands")
               .where("play", "==", this.playGroundID)
               .onSnapshot((querySnapshot) => {
                     querySnapshot.forEach((doc) => {
                        console.log("doc : " + doc.data().handOn)
                        handArray[i] = doc.id;// data().handOn;
                        if (doc.data().player == firebase.auth().currentUser.uid) {
                           active=i;
                           round = doc.data().round;
                        }
                        i++;
                     });
                  console.log("round : " + round);
                  this.roundID = round;
                  this.hand1 = handArray[active];
                  this.hand2 = handArray[(active+1)%4];
                  this.hand3 = handArray[(active+2)%4];
                  this.hand4 = handArray[(active+3)%4];
                  console.log("hand : " + this.hand1);

               });
         });
         this.emitter.on("start-game", () => {
            this.startGame();
         });
         this.emitter.on("draw-cards", () => {
            this.drawCards();
         });
         this.emitter.on("add-cards", (nb) => {
            this.addCard(nb);
         });               
      },
      methods: {
      }
   }       
</script>