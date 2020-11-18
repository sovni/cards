<template>
   <div class="playingCards faceImages rotateHand">
        <ul class="hand">
            <li v-for="card in myhand" v-bind:key="card">
                <div v-bind:class="genClass(card)">
                    <span class="rank">{{ card.rank.shortName }}</span>
                    <span class="suit">&{{ card.suit.name }};</span>
                </div>
            </li>
        </ul>       
   </div>
</template>

<script>
require('cards');

   export default {
      name: 'Deck',
      props: ['myhand'],      
      components: {
      },
      methods: {
          genClass(card) {
              return "card rank-" + card.rank.shortName.toLowerCase() + " " + card.suit.name;
          }
      }
   }       
</script>

