<template>
    <img class='card' v-bind:src="getImg(mycard)" v-bind:style="mystyle" @click="handleClick"/>
</template>

<script>

require('cards');

//var dirCards = "../assets/cards/";

const c2C = require('../assets/cards-belote/2C.svg');
const c2D = require('../assets/cards-belote/2D.svg');
const c2H = require('../assets/cards-belote/2H.svg');
const c2S = require('../assets/cards-belote/2S.svg');
const c3C = require('../assets/cards-belote/3C.svg');
const c3D = require('../assets/cards-belote/3D.svg');
const c3H = require('../assets/cards-belote/3H.svg');
const c3S = require('../assets/cards-belote/3S.svg');
const c4C = require('../assets/cards-belote/4C.svg');
const c4D = require('../assets/cards-belote/4D.svg');
const c4H = require('../assets/cards-belote/4H.svg');
const c4S = require('../assets/cards-belote/4S.svg');
const c5C = require('../assets/cards-belote/5C.svg');
const c5D = require('../assets/cards-belote/5D.svg');
const c5H = require('../assets/cards-belote/5H.svg');
const c5S = require('../assets/cards-belote/5S.svg');
const c6C = require('../assets/cards-belote/6C.svg');
const c6D = require('../assets/cards-belote/6D.svg');
const c6H = require('../assets/cards-belote/6H.svg');
const c6S = require('../assets/cards-belote/6S.svg');
const c7C = require('../assets/cards-belote/7C.svg');
const c7D = require('../assets/cards-belote/7D.svg');
const c7H = require('../assets/cards-belote/7H.svg');
const c7S = require('../assets/cards-belote/7S.svg');
const c8C = require('../assets/cards-belote/8C.svg');
const c8D = require('../assets/cards-belote/8D.svg');
const c8H = require('../assets/cards-belote/8H.svg');
const c8S = require('../assets/cards-belote/8S.svg');
const c9C = require('../assets/cards-belote/9C.svg');
const c9D = require('../assets/cards-belote/9D.svg');
const c9H = require('../assets/cards-belote/9H.svg');
const c9S = require('../assets/cards-belote/9S.svg');
const c10C = require('../assets/cards-belote/10C.svg');
const c10D = require('../assets/cards-belote/10D.svg');
const c10H = require('../assets/cards-belote/10H.svg');
const c10S = require('../assets/cards-belote/10S.svg');
const cAC = require('../assets/cards-belote/AC.svg');
const cAsD = require('../assets/cards-belote/AsD.svg');
const cAH = require('../assets/cards-belote/AH.svg');
const cAS = require('../assets/cards-belote/AS.svg');
const cJC = require('../assets/cards-belote/JC.svg');
const cJD = require('../assets/cards-belote/JD.svg');
const cJH = require('../assets/cards-belote/JH.svg');
const cJS = require('../assets/cards-belote/JS.svg');
const cKC = require('../assets/cards-belote/KC.svg');
const cKD = require('../assets/cards-belote/KD.svg');
const cKH = require('../assets/cards-belote/KH.svg');
const cKS = require('../assets/cards-belote/KS.svg');
const cQC = require('../assets/cards-belote/QC.svg');
const cQD = require('../assets/cards-belote/QD.svg');
const cQH = require('../assets/cards-belote/QH.svg');
const cQS = require('../assets/cards-belote/QS.svg');
const cTC = require('../assets/cards-belote/TC.svg');
const cTD = require('../assets/cards-belote/TD.svg');
const cTH = require('../assets/cards-belote/TH.svg');
const cTS = require('../assets/cards-belote/TS.svg');
const cBB = require('../assets/cards/BLUE_BACK.svg');


   export default {
        name: 'CBCard',
      data(){
            return {
                cwidth: 76,
                c2C: c2C,
                c2D: c2D,
                c2H: c2H,
                c2S: c2S,
                c3C: c3C,
                c3D: c3D,
                c3H: c3H,
                c3S: c3S,
                c4C: c4C,
                c4D: c4D,
                c4H: c4H,
                c4S: c4S,
                c5C: c5C,
                c5D: c5D,
                c5H: c5H,
                c5S: c5S,
                c6C: c6C,
                c6D: c6D,
                c6H: c6H,
                c6S: c6S,
                c7C: c7C,
                c7D: c7D,
                c7H: c7H,
                c7S: c7S ,
                c8C: c8C,
                c8D: c8D,
                c8H: c8H,
                c8S: c8S,
                c9C: c9C,
                c9D: c9D,
                c9H: c9H,
                c9S: c9S,
                c10C: c10C,
                c10D: c10D,
                c10H: c10H,
                c10S: c10S,
                cKC: cKC,
                cKD: cKD,
                cKH: cKH,
                cKS: cKS,
                cQC: cQC,
                cQD: cQD,
                cQH: cQH,
                cQS: cQS,
                cAC: cAC,
                cAD: cAsD,
                cAH: cAH,
                cAS: cAS,
                cJC: cJC,
                cJD: cJD,
                cJH: cJH,
                cJS: cJS,
                cTC: cTC,
                cTD: cTD,
                cTH: cTH,
                cTS: cTS,
                cBB : cBB
            }
        },
        props: ['mycard','mystyle','myactive','myhand'],
        components: {
        },
        methods: {
            getImg(card) {
                if (this.myactive == false)
                    return this.cBB;
              var suit;
              //switch (card.suit.name) {
              switch (card.suit) {
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
                        //if (card.rank == "A")
                        //    card.rank = "As";
                        break;     
                    default :
                        suit = 'J';
                        break;
                }
                //return eval("this.c"+card.rank.shortName+suit);
                return eval("this.c"+card.rank+suit);
            },
            handleClick() {
                console.log("Card clicked : " + this.mycard.suit + ":" + this.mycard.rank + " hand:" + this.myhand)
                this.$emit("card-play", {'suit':this.mycard.suit, 'rank':this.mycard.rank, 'hand':this.myhand});

            }            
        }         
    }    
</script>