<template>
 <!--   <div class="playingCards faceImages rotateHand" min-height="100px">
        <ul class="hand">
            <li v-for="card in myhand" v-bind:key="card">
                <a v-bind:class="genClass(card)">
                    <span class="rank">{{ card.rank.shortName }}</span>
                    <span class="suit" v-html="genSuit(card)"></span>
                </a>
            </li>
        </ul>       
    </div> -->

    <div class="hand active-hand fan" data-bind='fan: {radius: 200, spacing: 0.4, width: 90, cards: cards}' style="width:400px;height:400px;">
            <img class='card' v-for="card in myhand" v-bind:key="card" v-bind:src="getImg(card)" />
    </div>
</template>

<script>
require('cards');
//require('cardsJS');

const c2C = require('../assets/cards/2C.svg');
const c2D = require('../assets/cards/2D.svg');
const c2H = require('../assets/cards/2H.svg');
const c2S = require('../assets/cards/2S.svg');
/*const c3C = require('../assets/cards/3C.svg');
const c3D = require('../assets/cards/3D.svg');
const c3H = require('../assets/cards/3H.svg');
const c3S = require('../assets/cards/3S.svg');
const c4C = require('../assets/cards/4C.svg');
const c4D = require('../assets/cards/4D.svg');
const c4H = require('../assets/cards/4H.svg');
const c4S = require('../assets/cards/4S.svg');*/

const c7C = require('../assets/cards/7C.svg');
const c7D = require('../assets/cards/7D.svg');
const c7H = require('../assets/cards/7H.svg');
const c7S = require('../assets/cards/7S.svg');

const c8C = require('../assets/cards/8C.svg');
const c8D = require('../assets/cards/8D.svg');
const c8H = require('../assets/cards/8H.svg');
const c8S = require('../assets/cards/8S.svg');


   export default {
        name: 'Deck',
      data(){
            return {
                c2C: c2C,
                c2D: c2D,
                c2H: c2H,
                c2S: c2S,
                c7C: c7C,
                c7D: c7D,
                c7H: c7H,
                c7S: c7S ,
                c8C: c8C,
                c8D: c8D,
                c8H: c8H,
                c8S: c8S                               
            }
        },
        props: ['myhand'],      
        components: {
        },
        methods: {
            getImg(card) {
              var suit;
              switch (card.suit.name) {
                    case 'spades':
                        suit = "S";
                        break;
                    case 'clubs':
                        suit = "C";
                        break;
                    case 'hearts':
                        suit = "H";
                        break;     
                    case 'diamonds':
                        suit = "D";
                        break;     
                    default :
                        suit = 'J';
                        break;
                }
                if (card.rank.shortName != "7" && card.rank.shortName != "8")
                    card.rank.shortName = "7";
                return eval("this.c"+card.rank.shortName+suit)
                //return "./assets/cards/" + card.rank.shortName + suit + '.svg';  
            }
        }         
    }    
</script>


