<template>
   <div class="p-grid">
      <div class="p-col-4 p-offset-4">
      <Hand id="hand3" :handId="hands[2]" :playerId="players[2]" :indexUser="2" :activeUser="true" :choose="false"/>
      </div>
      <div class="p-col-4" />
      <div class="p-col-4">
      <Hand id="hand2" :handId="hands[1]" :playerId="players[1]" :indexUser="1" :activeUser="false"  :choose="false"/>
      </div>
      <div class="p-col-4" >
         <div class="p-d-flex p-jc-center">
         <Deck id="deck" :myround="roundID" />
         </div>
      </div>
      <div class="p-col-4">
      <Hand id="hand4" :handId="hands[3]" :playerId="players[3]" :indexUser="3" :activeUser="true"  :choose="false"/>
      </div>
      <div class="p-col-4 p-offset-4">
      <Hand id="hand1" :handId="hands[0]" :playerId="players[0]" :indexUser="0" :activeUser="true"  :choose="false"/>
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
                players: ["","","",""],
                playGroundID: -1,
                roundID: -1,
                currentGame: "belote",
                myIndex: -1
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
                  if (doc.data().players.length == 4 && doc.data().state == "created") {
                     // draw cards
                  }
               });*/
            var handArray = [];
            var playerArray = [];
            var i = 0;
            var active = 0;
            var round = -1;
            db.collection("hands")
               .where("play", "==", this.playGroundID)
               .onSnapshot((querySnapshot) => {
                     querySnapshot.forEach((doc) => {
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
                  this.roundID = round;
                  this.myIndex == active;
                  for (var j=0;j<this.hands.length;j++) {
                     this.hands[j] = handArray[(active+j)%this.hands.length];
                     this.players[j] = playerArray[(active+j)%this.hands.length];

                  }
               });
         });
  
      },
      methods: {
      }
   }       
</script>