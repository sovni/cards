<template>
   <div class="p-grid">
      <div class="p-col-12">
      <Deck id="mydeck" :myhand="myhand"/>
      </div>
      <div class="p-col-12">
      <Button label="Start" @click="startGame" />
      </div>
      <div class="p-col-12">
      <Button label="Add" @click="addCard" />
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
                myhand: [],
            }
      },      
      components: {
         Button,
         Deck
      },
      methods: {
         startGame() {

            // Shuffle the deck
            deck.shuffleAll();

            this.myhand = deck.draw(5);
            console.log(this.myhand);
         },
         addCard() {
            this.myhand.push(...deck.draw(1));

         }
      }
   }       
</script>