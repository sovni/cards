<template>
    <!-- <div class="hhand active-hand"  style="width:400px;height:200px;">-->
    <div class="hhand active-hand fan" style="width:350px;height:250px;">
        <CBCard v-for="(mycard, index) in mydeck" v-bind:key="mycard" v-bind:mycard="mycard" v-bind:mystyle="getStyle(mycard, index)" :game="game"/> 
    </div>
</template>
<style>
img.card{width:70px;border:0;vertical-align:initial;box-sizing:initial}.hand,img.card{margin:0;padding:0}.active-hand img.card{cursor:pointer}.hhand{display:inline-block}.hhand img.card{padding-top:10px}.hhand.active-hand img.card:hover{padding-top:0;padding-bottom:10px}.vhand{display:block}.vhand img.card{padding-right:10px}.vhand.active-hand img.card:hover{padding-right:0;padding-left:10px}.hhand-compact{display:inline-block}.hhand-compact img.card:first-child{margin-left:0;padding-top:10px}.hhand-compact img.card{margin-left:-52px;padding-top:10px}.hhand-compact.active-hand img.card:hover{padding-top:0;padding-bottom:10px}.vhand-compact{display:inline-block;vertical-align:top}.vhand-compact img.card:first-child{display:block;margin-top:0;padding-right:10px}.vhand-compact img.card{display:block;margin-top:-80px;padding-right:10px}.active-hand .vhand-compact img.card:hover,.vhand-compact.active-hand img.card:hover{display:block;padding-right:0;padding-left:10px}.fan{display:inline-block;vertical-align:top;position:relative;padding-bottom:1em}.fan img.card{position:absolute;width:90px}
</style>

<script>
import CBCard from './CBCard';
import db from '../plugins/firebase';

require('cards');

   export default {
        name: 'Deck',
      data(){
            return {
                cwidth: 110,
                cspacing: 0.24,
                cradius: 166,
                mydeck: [],
                playersIndex: [],
                players: [],
                roundDocRef: null,
                roundDocSubs: null,
                trickDocRef: null,
                trickDocSubs: null
        }
        },
        props: ['myround','trickId','playId','playerId','playerIndex','nbPlayer','state','choice','game'],      
        components: {
            CBCard
        },
        watch: { 
            myround: function(newVal, oldVal) { // watch it
                console.log(
                "Watch props.myround function called:" + newVal + ":"+oldVal+":"+this.myround);
                if (this.roundDocSubs != null) {
                    this.roundDocSubs();
                    this.roundDocSubs = null;
                }
                if (this.myround != -1) {
                    this.roundDocRef = db.collection("plays").doc(this.playId).collection("rounds").doc(this.myround);
                    /*this.roundDocSubs = this.roundDocRef.onSnapshot((doc) => {
                            console.log("Rounds onSnapshot launched (Deck 1)");
                            if (doc.data().state == "choice-1" || doc.data().state == "choice-2") {
                                console.log("Deck: round : " + this.myround);
                                this.mydeck = doc.data().choice;
                            }
                        });*/
                }
            },
            trickId: function(newVal, oldVal) { // watch it
                console.log(
                "Watch props.myround function called:" + newVal + ":"+oldVal+":"+this.trickId);
                if (this.trickDocSubs != null) {
                    this.trickDocSubs();
                    this.trickDocSubs = null;
                }
                if (this.trickId != -1) {
                    if (this.roundDocRef == null) {
                        this.roundDocRef = db.collection("plays").doc(this.playId).collection("rounds").doc(this.myround);
                    }
                    this.trickDocRef = this.roundDocRef.collection("tricks").doc(this.trickId);
                    this.trickDocSubs = this.trickDocRef.onSnapshot((doc) => {
                            console.log("Tricks onSnapshot launched (Deck 2)");
                            console.log("trickId: round : " + this.trickId);
                            console.log("trick change : cards" + doc.data().cards);
                                
                            this.playersIndex = doc.data().playerIndex;
                            this.players = doc.data().players;
                            this.mydeck = doc.data().cards;
                        });
                }
            },
            state: function(newVal, oldVal) {
                console.log("Watch props.roundState function called:" + newVal + ":"+oldVal+":"+this.state);
                if (this.state == "choice-1" || this.state == "choice-2") {
                    console.log("Deck: round : " + this.myround);
                    this.mydeck = this.choice;
                }            
            },
            choice: function(newVal, oldVal) {
                console.log("Watch props.choice function called:" + newVal + ":"+oldVal+":"+this.choice);
                if (this.state == "choice-1" || this.state == "choice-2") {
                    console.log("Deck: round : " + this.myround);
                    this.mydeck = this.choice;
                }            
            }            
        },
        methods: {
            getStyle(card, index) {
                console.log("index " + index);
                var n = this.mydeck.length;
                var deckWidth = 350;
                var deckHeight = 250;
                if (n === 0) {
                    return;
                }
                var width = this.cwidth; // hack: for a hidden hand
                var height = Math.floor(width * 1.4); // hack: for a hidden hand
                var p2left = Math.floor(deckWidth*0.5)-Math.floor(width*0.5) + width*0.5;
                var p3left = Math.floor(deckWidth*0.5)-Math.floor(width*0.5) - width*0.5;
                var p0left = Math.floor(deckWidth*0.5)-(Math.floor(width*0.5));
                var p0top = deckHeight - height;
                var p1left = deckWidth-height;
                var p1top = Math.floor(Math.floor(deckHeight*0.5)-(this.cwidth*0.5));
                var p4top = Math.floor(Math.floor(deckHeight*0.5)-(this.cwidth*0.5));
                //var box = {};
                var style="";
        
                var pindex = (this.playersIndex[index] - this.playerIndex);
                console.log("pindex: " + pindex + ":" + this.playersIndex[index] +" - index: " + index);
                pindex = (pindex + this.nbPlayer)%this.nbPlayer;

                console.log("pindex: " + pindex + ":" + this.playersIndex[index] +" - index: " + index);
                console.log("nb players : " + this.nbPlayer);
                if (pindex == 0)
                    style = "width:"+width+"px; left:"+ p0left + "px;top:" + p0top + "px;";// transform:" + "rotate(" + rotationAngle + "deg)" + " translateZ(0);";
                else if (pindex == 1)
                    style = "width:"+width+"px; left:" + p1left + "px;top:" + p1top +"px; transform:" + "rotate(90deg)" + " translateZ(0);";
                else if (pindex == 2)
                    style = "width:"+width+"px; left:"+ p2left + "px;top:0px;";// transform:" + "rotate(180deg)" + " translateZ(0);";
                else if (pindex == 3 && this.nbPlayer == 5)
                    style = "width:"+width+"px; left:"+ p3left + "px;top:0px;";// transform:" + "rotate(180deg)" + " translateZ(0);";
                else if (pindex == 4 || (pindex == 3 && this.nbPlayer == 4))
                    style = "width:"+width+"px; left:25px;top:" + p4top +"px; transform:" + "rotate(90deg)" + " translateZ(0);";
                console.log("style : " + style);
                return style;
                //var coords = this.calculateCoords(n, this.cradius, width, height, "N", this.cspacing, box);    
                //var rotationAngle = Math.round(coords[index].angle);
                //return "width:"+width+"px; left:"+ coords[index].x + "px;top:" + coords[index].y+ "px; transform:" + "rotate(" + rotationAngle + "deg)" + " translateZ(0);";
                
            },
            calculateCoords(numCards, arcRadius, cardWidth, cardHeight, direction, cardSpacing, box) {
                // The separation between the cards, in terms of rotation around the circle's origin
                var anglePerCard = this.radiansToDegrees(Math.atan(((cardWidth * cardSpacing) / arcRadius)));

                var angleOffset = ({ "N": 270, "S": 90, "E": 0, "W": 180 })[direction];

                var startAngle = angleOffset - 0.5 * anglePerCard * (numCards - 1);
                //startAngle = startAngle + (this.indexUser -1) * 90;

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