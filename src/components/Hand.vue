<template>
    <div class="hhand active-hand fan"  style="width:400px;height:200px;">
        <CBCard v-for="(mycard, index) in myhand" v-bind:key="mycard" v-bind:myactive="activeUser" v-bind:mycard="mycard" v-bind:mystyle="getStyle(mycard, index)" /> 
    </div>
   <Button v-if="choose" class="p-button-raised p-button-rounded" icon="pi pi-check" @click="take()"/>
   <Button v-if="choose" class="p-button-raised p-button-rounded" icon="pi pi-times" @click="pass()"/>
   <Button v-if="choosebis" class="p-button-raised p-button-rounded p-button-secondary" label="&spades;" @click="take('spades')"/>
   <Button v-if="choosebis" class="p-button-raised p-button-rounded p-button-danger" label="&hearts;" @click="take('hearts')()"/>
   <Button v-if="choosebis" class="p-button-raised p-button-rounded p-button-secondary" label="&clubs;" @click="take('clubs')()"/>
   <Button v-if="choosebis" class="p-button-raised p-button-rounded p-button-danger" label="&diams;" @click="take('diamonds')()"/>
   <Button v-if="choosebis" class="p-button-raised p-button-rounded" icon="pi pi-times" @click="passbis()"/>



</template>
<style>
img.card{width:70px;border:0;vertical-align:initial;box-sizing:initial}.hand,img.card{margin:0;padding:0}.active-hand img.card{cursor:pointer}.hhand{display:inline-block}.hhand img.card{padding-top:10px}.hhand.active-hand img.card:hover{padding-top:0;padding-bottom:10px}.vhand{display:block}.vhand img.card{padding-right:10px}.vhand.active-hand img.card:hover{padding-right:0;padding-left:10px}.hhand-compact{display:inline-block}.hhand-compact img.card:first-child{margin-left:0;padding-top:10px}.hhand-compact img.card{margin-left:-52px;padding-top:10px}.hhand-compact.active-hand img.card:hover{padding-top:0;padding-bottom:10px}.vhand-compact{display:inline-block;vertical-align:top}.vhand-compact img.card:first-child{display:block;margin-top:0;padding-right:10px}.vhand-compact img.card{display:block;margin-top:-80px;padding-right:10px}.active-hand .vhand-compact img.card:hover,.vhand-compact.active-hand img.card:hover{display:block;padding-right:0;padding-left:10px}.fan{display:inline-block;vertical-align:top;position:relative;padding-bottom:1em}.fan img.card{position:absolute;width:90px}
</style>

<script>
import firebase from 'firebase';
import CBCard from './CBCard';
import db from '../plugins/firebase';
import Button from 'primevue/button';

require('cards');

   export default {
        name: 'Hand',
      data(){
            return {
                cwidth: 98,
                cspacing: 0.24,
                cradius: 166,
                myhand: [],
                myindex: -1,
                choose: false,
                choosebis: false,
                activeUser: false,
                roundId: -1
            }
        },
        props: ['handId','playerId', 'indexUser','playId'],      
        components: {
            CBCard,
            Button
        },
        watch: { 
            handId: function(newVal, oldVal) { // watch it
                console.log(
                "Watch props.myround function called:" + newVal + ":"+oldVal+":"+this.handId);
                if (this.handId != -1) {
                    db.collection("hands").doc(this.handId)
                        .onSnapshot((doc) => {
                            console.log("Hand: round : " + this.myround);
                            this.myhand = doc.data().handOn;
                            this.myindex = doc.data().playerIndex;
                            this.roundId = doc.data().round;

                        console.log("Current round :" + this.roundId);
                        db.collection("rounds").doc(this.roundId)
                            //.where("state", "==", "choice-1")
                            .onSnapshot((doc) => {
                                console.log("index: " +this.myindex + " round index : " + doc.data().state);
                                if (doc.data().state == "choice-1") {
                                    this.choosebis = false;
                                    if (doc.data().active == this.myindex)  {
                                        console.log("active hand: " +this.myindex);
                                        this.choose = true;
                                    }
                                    else {
                                        this.choose = false;
                                    }
                                }
                                else if (doc.data().state == "choice-2") {
                                    this.choose = false;
                                    if (doc.data().active == this.myindex)  {
                                        console.log("active hand: " +this.myindex);
                                        this.choosebis = true;
                                    }
                                    else {
                                        this.choosebis = false;
                                    }
                                }
                                else {
                                    this.choose = false;
                                    this.choosebis = false;
                                }
                        });
                    });
                }
            },
            playerId: function() {
                if (firebase.auth().currentUser.uid == this.playerId) {
                    this.activeUser = true;
                }
                else {
                    this.activeUser = false;
                }
            }
        },
        /*mounted() {
            db.collection("rounds").doc(this.myround)
                .where("state", "==", "choice-1")
                .onSnapshot((doc) => {
                    if (doc.data().index%4 == this.myindex)  {
                        this.choose = true;
                    }
                    else {
                        this.choose = false;
                    }
                });    
        },*/
        methods: {
            take(suit="") {
                var roundDoc;

                roundDoc= db.collection("rounds").doc(this.roundId);
                roundDoc.get().then((doc) => {
                    console.log("round : "+ doc.data().state);
                    var takeCard = doc.data().choice[0];
                    console.log("take : " + takeCard.suit, ":player : " + this.playerId);
                    if (suit == "")
                        db.collection("rounds").doc(this.roundId).update({atout: takeCard.suit, bid: this.playerId});
                    else
                        db.collection("rounds").doc(this.roundId).update({atout: suit, bid: this.playerId});

                    db.collection("rounds").doc(this.roundId).update({choice: firebase.firestore.FieldValue.arrayRemove(takeCard)});

                    console.log("draw remaining cards");

                    db.collection("hands").doc(this.handId).update({handOn: firebase.firestore.FieldValue.arrayUnion(takeCard)});

                    db.collection("plays").doc(this.playId)
                        .get().then((playDoc) => {
                            var deckIndex = 0;
                            var active;
                            for (var i=0;i<playDoc.data().players.length;i++) {
                                var playerId = playDoc.data().players[(i+doc.data().dealer)%playDoc.data().players.length];
                                var handId = this.roundId + playerId;
                                var nbCards = 3;
                                if (this.playerId == playerId)
                                    nbCards = 2;
                                for (var j=0;j<nbCards;j++) {
                                    var nextCard;
                                    nextCard = doc.data().deck[deckIndex++];
                                    db.collection("hands").doc(handId).update({handOn: firebase.firestore.FieldValue.arrayUnion(nextCard)});
                                }
                            }
                            active = (doc.data().dealer+1)%playDoc.data().players.length;
                            db.collection("rounds").doc(this.roundId).update({state:"start-trick", active: active});

                        });
                });                
            },
            pass() {
                var index;
                var roundDoc;
                
                roundDoc= db.collection("rounds").doc(this.roundId);
                roundDoc.get().then((doc) => {
                    index = doc.data().active;
                    if (index == doc.data().dealer) {
                        index = (index+1)%doc.data().nbPlayers;
                        roundDoc.update({state: "choice-2", active: index});
                    }
                    else {
                        index = (index+1)%doc.data().nbPlayers;
                        roundDoc.update({active: index});
                    }
                });
            },
            passbis() {
                var index;
                var roundDoc;
                
                roundDoc= db.collection("rounds").doc(this.roundId);
                roundDoc.get().then((doc) => {
                    index = doc.data().active;
                    if (index == doc.data().dealer) {
                        index = (index+1)%doc.data().nbPlayers;
                        roundDoc.update({state: "end-round", active: index});
                    }
                    else {
                        index = (index+1)%doc.data().nbPlayers;
                        roundDoc.update({active: index});
                    }
                });
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
                if (this.indexUser == 0)
                    coords[index].y += 100;
                else if (this.indexUser == 1 || this.indexUser == 3 )
                    coords[index].x += 50;
                return "width:"+width+"px; left:"+ coords[index].x + "px;top:" + coords[index].y+ "px; transform:" + "rotate(" + rotationAngle + "deg)" + " translateZ(0);";
                
            },
            calculateCoords(numCards, arcRadius, cardWidth, cardHeight, direction, cardSpacing, box) {
                // The separation between the cards, in terms of rotation around the circle's origin
                var anglePerCard = this.radiansToDegrees(Math.atan(((cardWidth * cardSpacing) / arcRadius)));

                var angleOffset = ({ "N": 270, "S": 90, "E": 0, "W": 180 })[direction];

                var startAngle = angleOffset - 0.5 * anglePerCard * (numCards - 1);
                startAngle = startAngle + (this.indexUser) * 90;

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

