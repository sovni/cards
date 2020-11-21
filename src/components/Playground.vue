<template>
   <div class="p-grid">
      <div class="p-col-4 p-offset-4">
      <Deck id="deck1" :myhand="hand3" :activeUser="false"/>
      </div>
      <div class="p-col-4" />
      <div class="p-col-4">
      <Deck id="deck2" :myhand="hand2" :activeUser="false"/>
      </div>
      <div class="p-col-4" />
      <div class="p-col-4">
      <Deck id="deck3" :myhand="hand4" :activeUser="false"/>
      </div>
      <div class="p-col-4 p-offset-4">
      <Deck id="deck4" :myhand="hand1" :activeUser="true"/>
      </div>                  
      <div class="p-col-4" />
   </div>
</template>

<script>
import Deck from './Deck'

const { decks } = require('cards');
const deck = new decks.PiquetDeck();

   export default {
      name: 'Playground',
      data() {
            return {
                hand1: [],
                hand2: [],
                hand3: [],
                hand4: []
            }
      },      
      components: {
         Deck
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

            // Shuffle the deck
            deck.shuffleAll();

            this.hand1 = deck.draw(5);
            this.hand2 = [];
            this.hand3 = [];
            this.hand4 = [];
            console.log(this.myhand);
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