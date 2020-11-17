<template>
   <div class="playingCards faceImages">
        <ul class="hand">
            <li v-for="card in myhand" v-bind:key="card">
                <div class="card rank-{{ card.rank.shortName }} {{ card.suit.name }}">
                    <span class="rank"> {{ card.rank.shortName }} </span>
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
      }
   }       
</script>

