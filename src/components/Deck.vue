<template>
    <div class="hand active-hand fan" data-bind='fan: {radius: 200, spacing: 0.4, width: 90, cards: cards}' style="width:400px;height:200px;">
        <img class='card' v-for="(card, index) in myhand" v-bind:key="card" v-bind:src="getImg(card)" v-bind:style="getStyle(card, index)"/>

    </div>
</template>

<script>
require('cards');

const c2C = require('../assets/cards/2C.svg');
const c2D = require('../assets/cards/2D.svg');
const c2H = require('../assets/cards/2H.svg');
const c2S = require('../assets/cards/2S.svg');
const c3C = require('../assets/cards/3C.svg');
const c3D = require('../assets/cards/3D.svg');
const c3H = require('../assets/cards/3H.svg');
const c3S = require('../assets/cards/3S.svg');
const c4C = require('../assets/cards/4C.svg');
const c4D = require('../assets/cards/4D.svg');
const c4H = require('../assets/cards/4H.svg');
const c4S = require('../assets/cards/4S.svg');
const c5C = require('../assets/cards/5C.svg');
const c5D = require('../assets/cards/5D.svg');
const c5H = require('../assets/cards/5H.svg');
const c5S = require('../assets/cards/5S.svg');

const c6C = require('../assets/cards/6C.svg');
const c6D = require('../assets/cards/6D.svg');
const c6H = require('../assets/cards/6H.svg');
const c6S = require('../assets/cards/6S.svg');

const c7C = require('../assets/cards/7C.svg');
const c7D = require('../assets/cards/7D.svg');
const c7H = require('../assets/cards/7H.svg');
const c7S = require('../assets/cards/7S.svg');

const c8C = require('../assets/cards/8C.svg');
const c8D = require('../assets/cards/8D.svg');
const c8H = require('../assets/cards/8H.svg');
const c8S = require('../assets/cards/8S.svg');

const c9C = require('../assets/cards/9C.svg');
const c9D = require('../assets/cards/9D.svg');
const c9H = require('../assets/cards/9H.svg');
const c9S = require('../assets/cards/9S.svg');

const c10C = require('../assets/cards/10C.svg');
const c10D = require('../assets/cards/10D.svg');
const c10H = require('../assets/cards/10H.svg');
const c10S = require('../assets/cards/10S.svg');

const cAC = require('../assets/cards/AC.svg');
const cAD = require('../assets/cards/AD.svg');
const cAH = require('../assets/cards/AH.svg');
const cAS = require('../assets/cards/AS.svg');

const cJC = require('../assets/cards/JC.svg');
const cJD = require('../assets/cards/JD.svg');
const cJH = require('../assets/cards/JH.svg');
const cJS = require('../assets/cards/JS.svg');

const cKC = require('../assets/cards/KC.svg');
const cKD = require('../assets/cards/KD.svg');
const cKH = require('../assets/cards/KH.svg');
const cKS = require('../assets/cards/KS.svg');

const cQC = require('../assets/cards/QC.svg');
const cQD = require('../assets/cards/QD.svg');
const cQH = require('../assets/cards/QH.svg');
const cQS = require('../assets/cards/QS.svg');

const cTC = require('../assets/cards/TC.svg');
const cTD = require('../assets/cards/TD.svg');
const cTH = require('../assets/cards/TH.svg');
const cTS = require('../assets/cards/TS.svg');

   export default {
        name: 'Deck',
      data(){
            return {
                cwidth: 110,
                cspacing: 0.24,
                cradius: 166,
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
                cAD: cAD,
                cAH: cAH,
                cAS: cAS,
                cJC: cJC,
                cJD: cJD,
                cJH: cJH,
                cJS: cJS,
                cTC: cTC,
                cTD: cTD,
                cTH: cTH,
                cTS: cTS
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
                //if (card.rank.shortName != "7" && card.rank.shortName != "8")
                //   card.rank.shortName = "7";
                return eval("this.c"+card.rank.shortName+suit)
                //return "./assets/cards/" + card.rank.shortName + suit + '.svg';  
            },
            getStyle(card, index) {
                console.log("index " + index);
                var n = this.myhand.length;
                if (n === 0) {
                    return;
                }
                var width = this.cwidth; // hack: for a hidden hand
                var height = Math.floor(width * 1.4); // hack: for a hidden hand
                var box = {};
                var coords = this.calculateCoords(n, this.cradius, width, height, "N", this.cspacing, box);    
                var rotationAngle = Math.round(coords[index].angle);
                return "width:"+width+"px; left:"+ coords[index].x + "px;top:" + coords[index].y + "px; transform:" + "rotate(" + rotationAngle + "deg)" + " translateZ(0);";
                
            },
            calculateCoords(numCards, arcRadius, cardWidth, cardHeight, direction, cardSpacing, box) {
                // The separation between the cards, in terms of rotation around the circle's origin
                var anglePerCard = this.radiansToDegrees(Math.atan(((cardWidth * cardSpacing) / arcRadius)));

                var angleOffset = ({ "N": 270, "S": 90, "E": 0, "W": 180 })[direction];

                var startAngle = angleOffset - 0.5 * anglePerCard * (numCards - 1);

                var coords = [];
                var i;
                var minX = 99999;
                var minY = 99999;
                var maxX = -minX;
                var maxY = -minY;
                for (i = 0; i < numCards; i++) {
                    var degrees = startAngle + anglePerCard * i;

                    var radians = this.degreesToRadians(degrees);
                    var x = cardWidth / 2 + Math.cos(radians) * arcRadius;
                    var y = cardHeight / 2 + Math.sin(radians) * arcRadius;

                    minX = Math.min(minX, x);
                    minY = Math.min(minY, y);
                    maxX = Math.max(maxX, x);
                    maxY = Math.max(maxY, y);

                    coords.push({ x: x, y: y, angle: degrees + 90 });
                }

                var rotatedDimensions = this.getRotatedDimensions(coords[0].angle, cardWidth, cardHeight);

                var offsetX = 0;
                var offsetY = 0;

                if (direction === "N") {
                    offsetX = (minX * -1);
                    offsetX += ((rotatedDimensions[0] - cardWidth) / 2);

                    offsetY = (minY * -1);
                } else if (direction === "S") {
                    offsetX = (minX * -1);
                    offsetX += ((rotatedDimensions[0] - cardWidth) / 2);

                    offsetY = ((minY + (maxY - minY)) * -1);
                } else if (direction === "W") {
                    offsetY = (minY * -1);
                    offsetY += ((rotatedDimensions[1] - cardHeight) / 2);

                    offsetX = (minX * -1);
                    offsetX += (cardHeight - Math.rotatePointInBox(0, 0, 270, cardWidth, cardHeight)[1]);
                } else if (direction === "E") {
                    offsetY = (minY * -1);
                    offsetY += ((rotatedDimensions[1] - cardHeight) / 2);

                    offsetX = (arcRadius) * -1;
                    offsetX -= (cardHeight - Math.rotatePointInBox(0, 0, 270, cardWidth, cardHeight)[1]);
                    //offsetX -= ?????;    // HELP! Needs to line up with yellow line!
                }

                coords.forEach(function (coord) {
                    coord.x += offsetX;
                    coord.x = Math.round(coord.x);

                    coord.y += offsetY;
                    coord.y = Math.round(coord.y);

                    coord.angle = Math.round(coord.angle);
                });

                box.width = coords[numCards - 1].x + cardWidth;
                box.height = coords[numCards - 1].y + cardHeight;

                return coords;
            },
            cardSetTop: function (card, top) {
                card.style.top = top + "px";
            },
            degreesToRadians: function (degrees) {
                return degrees * (Math.PI / 180);
            },            
            radiansToDegrees: function (radians) {
                return radians * (180 / Math.PI);
            },
            getRotatedDimensions: function (angle_in_degrees, width, height) {
                var angle = angle_in_degrees * Math.PI / 180,
                    sin   = Math.sin(angle),
                    cos   = Math.cos(angle);
                var x1 = cos * width,
                    y1 = sin * width;
                var x2 = -sin * height,
                    y2 = cos * height;
                var x3 = cos * width - sin * height,
                    y3 = sin * width + cos * height;
                var minX = Math.min(0, x1, x2, x3),
                    maxX = Math.max(0, x1, x2, x3),
                    minY = Math.min(0, y1, y2, y3),
                    maxY = Math.max(0, y1, y2, y3);

                return [ Math.floor((maxX - minX)), Math.floor((maxY - minY)) ];
            },     
            rotatePointInBox: function (x, y, angle, width, height) {
                angle = Math.degreesToRadians(angle);

                var centerX = width / 2.0;
                var centerY = height / 2.0;
                var dx = x - centerX;
                var dy = y - centerY;
                var dist = Math.sqrt(dx * dx + dy * dy);
                var a =  Math.atan2(dy, dx) + angle;
                var dx2 = Math.cos(a) * dist;
                var dy2 = Math.sin(a) * dist;

                return [ dx2 + centerX, dy2 + centerY ];
            }                        
        }         
    }    
</script>


