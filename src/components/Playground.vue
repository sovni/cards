<template>
   <div class="p-grid">
      <Deck id="mydeck" :myhand="myhand"/>
      <Button label="Start" @click="startGame" />
   </div>
</template>

<script>
import Button from 'primevue/button';
import Deck from './Deck'


   export default {
      name: 'Playground',
      data() {
            return {
                myhand: [],
            }
      },      
      components: {
         Button,
         Deck
      },
      methods: {
         startGame() {
            const { decks } = require('cards');

            // Create a standard 52 card deck + 2 jokers
            const deck = new decks.PiquetDeck();

            // Shuffle the deck
            deck.shuffleAll();

            this.myhand = deck.draw(5);
            console.log(this.myhand);
         }
      }
   }       
</script>