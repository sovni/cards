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
const cRB = require('../assets/cards/RED_BACK.svg');


const cT2C = require('../assets/cards-tarot/2C.png');
const cT2D = require('../assets/cards-tarot/2D.png');
const cT2H = require('../assets/cards-tarot/2H.png');
const cT2S = require('../assets/cards-tarot/2S.png');
const cT3C = require('../assets/cards-tarot/3C.png');
const cT3D = require('../assets/cards-tarot/3D.png');
const cT3H = require('../assets/cards-tarot/3H.png');
const cT3S = require('../assets/cards-tarot/3S.png');
const cT4C = require('../assets/cards-tarot/4C.png');
const cT4D = require('../assets/cards-tarot/4D.png');
const cT4H = require('../assets/cards-tarot/4H.png');
const cT4S = require('../assets/cards-tarot/4S.png');
const cT5C = require('../assets/cards-tarot/5C.png');
const cT5D = require('../assets/cards-tarot/5D.png');
const cT5H = require('../assets/cards-tarot/5H.png');
const cT5S = require('../assets/cards-tarot/5S.png');
const cT6C = require('../assets/cards-tarot/6C.png');
const cT6D = require('../assets/cards-tarot/6D.png');
const cT6H = require('../assets/cards-tarot/6H.png');
const cT6S = require('../assets/cards-tarot/6S.png');
const cT7C = require('../assets/cards-tarot/7C.png');
const cT7D = require('../assets/cards-tarot/7D.png');
const cT7H = require('../assets/cards-tarot/7H.png');
const cT7S = require('../assets/cards-tarot/7S.png');
const cT8C = require('../assets/cards-tarot/8C.png');
const cT8D = require('../assets/cards-tarot/8D.png');
const cT8H = require('../assets/cards-tarot/8H.png');
const cT8S = require('../assets/cards-tarot/8S.png');
const cT9C = require('../assets/cards-tarot/9C.png');
const cT9D = require('../assets/cards-tarot/9D.png');
const cT9H = require('../assets/cards-tarot/9H.png');
const cT9S = require('../assets/cards-tarot/9S.png');
const cT10C = require('../assets/cards-tarot/10C.png');
const cT10D = require('../assets/cards-tarot/10D.png');
const cT10H = require('../assets/cards-tarot/10H.png');
const cT10S = require('../assets/cards-tarot/10S.png');
const cTAC = require('../assets/cards-tarot/AC.png');
const cTAsD = require('../assets/cards-tarot/AsD.png');
const cTAH = require('../assets/cards-tarot/AH.png');
const cTAS = require('../assets/cards-tarot/AS.png');
const cTPC = require('../assets/cards-tarot/JC.png');
const cTPD = require('../assets/cards-tarot/JD.png');
const cTPH = require('../assets/cards-tarot/JH.png');
const cTPS = require('../assets/cards-tarot/JS.png');
const cTJC = require('../assets/cards-tarot/CC.png');
const cTJD = require('../assets/cards-tarot/CD.png');
const cTJH = require('../assets/cards-tarot/CH.png');
const cTJS = require('../assets/cards-tarot/CS.png');
const cTKC = require('../assets/cards-tarot/KC.png');
const cTKD = require('../assets/cards-tarot/KD.png');
const cTKH = require('../assets/cards-tarot/KH.png');
const cTKS = require('../assets/cards-tarot/KS.png');
const cTQC = require('../assets/cards-tarot/QC.png');
const cTQD = require('../assets/cards-tarot/QD.png');
const cTQH = require('../assets/cards-tarot/QH.png');
const cTQS = require('../assets/cards-tarot/QS.png');
const cTTC = require('../assets/cards-tarot/10C.png');
const cTTD = require('../assets/cards-tarot/10D.png');
const cTTH = require('../assets/cards-tarot/10H.png');
const cTTS = require('../assets/cards-tarot/10S.png');
const cTAI = require('../assets/cards-tarot/AI.png');
const cTAII = require('../assets/cards-tarot/AII.png');
const cTAIII = require('../assets/cards-tarot/AIII.png');
const cTAIV = require('../assets/cards-tarot/AIV.png');
const cTAV = require('../assets/cards-tarot/AV.png');
const cTAVI = require('../assets/cards-tarot/AVI.png');
const cTAVII = require('../assets/cards-tarot/AVII.png');
const cTAVIII = require('../assets/cards-tarot/AVIII.png');
const cTAIX = require('../assets/cards-tarot/AIX.png');
const cTAX = require('../assets/cards-tarot/AX.png');
const cTAXI = require('../assets/cards-tarot/AXI.png');
const cTAXII = require('../assets/cards-tarot/AXII.png');
const cTAXIII = require('../assets/cards-tarot/AXIII.png');
const cTAXIV = require('../assets/cards-tarot/AXIV.png');
const cTAXV = require('../assets/cards-tarot/AXV.png');
const cTAXVI = require('../assets/cards-tarot/AXVI.png');
const cTAXVII = require('../assets/cards-tarot/AXVII.png');
const cTAXVIII = require('../assets/cards-tarot/AXVIII.png');
const cTAXIX = require('../assets/cards-tarot/AXIX.png');
const cTAXX = require('../assets/cards-tarot/AXX.png');
const cTAXXI = require('../assets/cards-tarot/AXXI.png');
const cTA0 = require('../assets/cards-tarot/A0.png');
const cTBB = require('../assets/cards/BLUE_BACK.svg');
const cTRB = require('../assets/cards/RED_BACK.svg');


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
                cBB : cBB,
                cRB : cRB,
                cT2C: cT2C,
                cT2D: cT2D,
                cT2H: cT2H,
                cT2S: cT2S,
                cT3C: cT3C,
                cT3D: cT3D,
                cT3H: cT3H,
                cT3S: cT3S,
                cT4C: cT4C,
                cT4D: cT4D,
                cT4H: cT4H,
                cT4S: cT4S,
                cT5C: cT5C,
                cT5D: cT5D,
                cT5H: cT5H,
                cT5S: cT5S,
                cT6C: cT6C,
                cT6D: cT6D,
                cT6H: cT6H,
                cT6S: cT6S,
                cT7C: cT7C,
                cT7D: cT7D,
                cT7H: cT7H,
                cT7S: cT7S ,
                cT8C: cT8C,
                cT8D: cT8D,
                cT8H: cT8H,
                cT8S: cT8S,
                cT9C: cT9C,
                cT9D: cT9D,
                cT9H: cT9H,
                cT9S: cT9S,
                cT10C: cT10C,
                cT10D: cT10D,
                cT10H: cT10H,
                cT10S: cT10S,
                cTKC: cTKC,
                cTKD: cTKD,
                cTKH: cTKH,
                cTKS: cTKS,
                cTQC: cTQC,
                cTQD: cTQD,
                cTQH: cTQH,
                cTQS: cTQS,
                cTAC: cTAC,
                cTAD: cTAsD,
                cTAH: cTAH,
                cTAS: cTAS,
                cTJC: cTJC,
                cTJD: cTJD,
                cTJH: cTJH,
                cTJS: cTJS,
                cTPC: cTPC,
                cTPD: cTPD,
                cTPH: cTPH,
                cTPS: cTPS,
                cTTC: cTTC,
                cTTD: cTTD,
                cTTH: cTTH,
                cTTS: cTTS,
                cTA0: cTA0,
                cTAI: cTAI,
                cTAII: cTAII,
                cTAIII: cTAIII,
                cTAIV: cTAIV,
                cTAV: cTAV,
                cTAVI: cTAVI,
                cTAVII: cTAVII,
                cTAVIII: cTAVIII,
                cTAIX: cTAIX,
                cTAX: cTAX,
                cTAXI: cTAXI,
                cTAXII: cTAXII,
                cTAXIII: cTAXIII,
                cTAXIV: cTAXIV,
                cTAXV: cTAXV,
                cTAXVI: cTAXVI,
                cTAXVII: cTAXVII,
                cTAXVIII: cTAXVIII,
                cTAXIX: cTAXIX,
                cTAXX: cTAXX,
                cTAXXI: cTAXXI,
                cTBB : cTBB,
                cTRB : cTRB
            }
        },
        props: ['mycard','mystyle','myactive','myhand','myturn','game'],
        components: {
        },
        methods: {
            getImg(card) {
                if (this.myactive == false) {
                    if (this.myturn)
                        return this.cRB;
                    else
                        return this.cBB;
                }
              var suit;
              //switch (card.suit.name) {
              switch (card.suit) {
                    case 'spades':
                    case 'swords':
                        suit = "S";
                        break;
                    case 'clubs':
                    case 'wands':
                        suit = "C";
                        break;
                    case 'hearts':
                    case 'cups':
                        suit = "H";
                        break;     
                    case 'diamonds':
                    case 'coins':
                        suit = "D";
                        //if (card.rank == "A")
                        //    card.rank = "As";
                        break;     
                    case 'trump':
                        suit = "A";
                        break;
                    default :
                        suit = 'J';
                        break;
                }
                var game = "";
                if (this.game == "tarot") {
                    game = "T";
                    if (card.suit == "trump")
                        return eval("this.c"+game+suit+card.rank);
                }
                //return eval("this.c"+card.rank.shortName+suit);
                return eval("this.c"+game+card.rank+suit);
            },
            handleClick() {
                console.log("Card clicked : " + this.mycard.suit + ":" + this.mycard.rank + " hand:" + this.myhand)
                this.$emit("card-play", {'suit':this.mycard.suit, 'rank':this.mycard.rank, 'hand':this.myhand});

            }            
        }         
    }    
</script>