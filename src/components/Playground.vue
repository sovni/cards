<template>
   <div class="p-grid">
      <div class="p-col-4">
      <Button label="Start" @click="startGame" />
      </div>
      <div class="p-col-4">
      <Button label="Draw" @click="drawCards" />
      </div>                  
      <div class="p-col-4">
      <Button label="Add" @click="addCard" />
      </div>            
      <div class="p-col-6">
      <Deck id="deck1" :myhand="hand1" :activeUser="true"/>
      </div>
      <div class="p-col-6">
      <Deck id="deck2" :myhand="hand2" :activeUser="false"/>
      </div>
      <div class="p-col-6">
      <Deck id="deck3" :myhand="hand3" :activeUser="false"/>
      </div>
      <div class="p-col-6">
      <Deck id="deck4" :myhand="hand4" :activeUser="false"/>
      </div>                  

   </div>
</template>

<script>
import Button from 'primevue/button';
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
         Button,
         Deck
      },
      mounted(){
         this.$root.$on('start-game', () => {
            this.startGame();
         });
      },
      methods: {
         startGame() {

            // Shuffle the deck
            deck.shuffleAll();

            this.hand1 = deck.draw(5);
            console.log(this.myhand);
         },
         drawCards() {
            this.hand2 = deck.draw(5);
            this.hand3 = deck.draw(5);
            this.hand4 = deck.draw(5);
         },
         addCard() {
            this.hand1.push(...deck.draw(3));
            this.hand2.push(...deck.draw(3));
            this.hand3.push(...deck.draw(3));
            this.hand4.push(...deck.draw(3));

         }
      }
   }       
</script>