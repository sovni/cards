<template>
   <div class="p-grid">
      <div class="p-col-4 p-offset-4">
      <Deck id="deck1" :myhand="hand3" :activeUser="false" :indexUser="3"/>
      </div>
      <div class="p-col-4" />
      <div class="p-col-4">
      <Deck id="deck2" :myhand="hand2" :activeUser="false" :indexUser="2"/>
      </div>
      <div class="p-col-4" />
      <div class="p-col-4">
      <Deck id="deck3" :myhand="hand4" :activeUser="false" :indexUser="4"/>
      </div>
      <div class="p-col-4 p-offset-4">
      <Deck id="deck4" :myhand="hand1" :activeUser="true" :indexUser="1"/>
      </div>                  
      <div class="p-col-4" />
   </div>
</template>

<script>
import firebase from 'firebase';
import Deck from './Deck'
import '../plugins/firebase'
import db from '../plugins/firebase';
import FirePlayGround from '../plugins/fireplayground';
import { playGroundConverter } from '../plugins/fireplayground';


const { decks } = require('cards');
const deck = new decks.PiquetDeck();

   export default {
      name: 'Playground',
      data() {
            return {
                hand1: [],
                hand2: [],
                hand3: [],
                hand4: [],
                firePlayground: new FirePlayGround([], [], [], 'not started', []),
                playGroundID: -1,
                currentGame: "belote"
            }
      },      
      components: {
         Deck
      },
      created(){
         const currentUser = firebase.auth().currentUser;
         //this.firePlayground.players.push({"id":currentUser.uid, "name": currentUser.displayName});
         //this.firePlayground.players[currentUser.uid] = currentUser.displayName;
         this.firePlayground.players.push(currentUser.uid);
         this.firePlayground.playersName.push(currentUser.displayName);


         db.collection("games").doc(this.currentGame)
            .collection("plays")
            .where("players.id", "array-contains", currentUser.uid)
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
         startGame() {
            if (this.playGroundID == -1) {
               db.collection("games").doc(this.currentGame).collection("plays")
               .withConverter(playGroundConverter)
               .add(this.firePlayground)
               .then((docRef) => {
                  console.log("Document successfully written with ID: ", docRef.id);
                  this.playGroundID = docRef.id;
               })
               .catch(function(error) {
                  console.error("Error writing document: ", error);
               });
            }
            else {
               console.log("Existing Play : " + this.playGroundID);
            }
            /*db.collection("games")
               .doc(this.currentGame)
               .collection("plays")
               .doc(this.playGroundID)
               .withConverter(playGroundConverter).get().then((doc) => {
                  if (doc.exists){
                     // Convert to City object
                     var playGround = doc.data();
                     // Use a City instance method
                     console.log("State: " + playGround.state);
                  } else {
                     console.log("No such document!")
                  }}).catch(function(error) {
                     console.log("Error getting document:", error)
                  });*/
            //console.log("Status:" + playGround.state);

            // Shuffle the deck
            deck.shuffleAll();

            this.hand1 = deck.draw(5);
            this.hand2 = [];
            this.hand3 = [];
            this.hand4 = [];
            console.log(this.hand1);
         },
         drawCards() {
            this.hand2 = deck.draw(5);
            this.hand3 = deck.draw(5);
            this.hand4 = deck.draw(5);
         },
         addCard(nb) {
            this.hand1.push(...deck.draw(nb));
            this.hand2.push(...deck.draw(nb));
            this.hand3.push(...deck.draw(nb));
            this.hand4.push(...deck.draw(nb));

         }
      }
   }       
</script>