<template>
   <div class="p-grid">
        <div v-if="indexUser == 0" class="p-col-12 p-d-flex p-jc-center" style="height:50px">  
            <Button v-if="choose" class="p-button-raised p-button-rounded" icon="pi pi-check" @click="take()"/>
            <Button v-if="choose" class="p-button-raised p-button-rounded" icon="pi pi-times" @click="pass()"/>
            <Button v-if="choosebis" class="p-button-raised p-button-rounded p-button-secondary" label="&spades;" @click="take('spades')"/>
            <Button v-if="choosebis" class="p-button-raised p-button-rounded p-button-danger" label="&hearts;" @click="take('hearts')"/>
            <Button v-if="choosebis" class="p-button-raised p-button-rounded p-button-secondary" label="&clubs;" @click="take('clubs')"/>
            <Button v-if="choosebis" class="p-button-raised p-button-rounded p-button-danger" label="&diams;" @click="take('diamonds')"/>
            <Button v-if="choosebis" class="p-button-raised p-button-rounded" icon="pi pi-times" @click="passbis()"/>
            <Button v-if="myturn" class="p-button-raised p-button-rounded" icon="pi pi-arrow-circle-up" />
        </div>
        <div class="p-col-12" >  
        <!--<div class="hhand active-hand fan"  style="width:400px;height:200px;">-->
        <div class="hhand active-hand fan" >
            <CBCard v-for="(mycard, index) in myhand" v-bind:key="mycard" v-bind:myactive="activeUser" v-bind:mycard="mycard" v-bind:myhand="handId" v-bind:mystyle="getStyle(mycard, index)" @card-play="playCard"/> 
        </div>
        </div>
       <div v-if="indexUser != 0" class="p-col-12 p-d-flex p-jc-center" style="height:50px">  
            <Button v-if="choose" class="p-button-raised p-button-rounded" icon="pi pi-check" @click="take()"/>
            <Button v-if="choose" class="p-button-raised p-button-rounded" icon="pi pi-times" @click="pass()"/>
            <Button v-if="choosebis" class="p-button-raised p-button-rounded p-button-secondary" label="&spades;" @click="take('spades')"/>
            <Button v-if="choosebis" class="p-button-raised p-button-rounded p-button-danger" label="&hearts;" @click="take('hearts')"/>
            <Button v-if="choosebis" class="p-button-raised p-button-rounded p-button-secondary" label="&clubs;" @click="take('clubs')"/>
            <Button v-if="choosebis" class="p-button-raised p-button-rounded p-button-danger" label="&diams;" @click="take('diamonds')"/>
            <Button v-if="choosebis" class="p-button-raised p-button-rounded" icon="pi pi-times" @click="passbis()"/>
            <Button v-if="myturn" class="p-button-raised p-button-rounded" icon="pi pi-arrow-circle-up" />
        </div>
    </div>

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
        name: 'MyHand',
      data(){
            return {
                cspacing: 0.24,
                cradius: 166,
                myhand: [],
                myindex: -1,
                choose: false,
                choosebis: false,
                activeUser: false,
                myturn:false,
                playDocRef: null,
                handDocRef: null,
                handDocSubs: null,
                roundDocRef: null,
                roundDocSubs: null,
                trickDocRef: null,
                atout: ""                  }
        },
        props: ['handId','playerId', 'indexUser','playId','cwidth','roundId'],      
        components: {
            CBCard,
            Button
        },
        watch: { 
            playId: function(newVal, oldVal) { // watch it
                console.log("Watch props.playId function called:" + newVal + ":"+oldVal+":"+this.playId);
                if (this.playId != null) {
                    this.playDocRef = db.collection("plays").doc(this.playId);
                }
                else   
                    this.playDocRef = null;
            },
            handId: function(newVal, oldVal) { // watch it
                console.log("Watch props.handid function called:" + newVal + ":"+oldVal+":"+this.handId);
                console.log("play id:" + this.playId);
                if (this.handDocSubs != null) {
                    this.handDocSubs();
                    this.handDocSubs = null;
                }
                if (this.handId != -1) {
                    this.handDocRef = this.playDocRef.collection("rounds").doc(this.roundId).collection("hands").doc(this.handId);
                    this.handDocSubs = this.handDocRef.onSnapshot((doc) => {
                            //this.roundId = doc.data().round;
                            console.log("Current round :" + this.roundId);
                            this.myindex = doc.data().playerIndex;
                            this.watchRoundId();
                            this.myhand = this.OrderHand(doc.data().handOn, this.atout);
                    });
                }
                else
                    this.handDocRef = null;
            },
            playerId: function() {
                //if (firebase.auth().currentUser.uid == this.playerId) {
                    this.activeUser = true;
                //}
                //else {
                //    this.activeUser = false;
                //}
            }
        },
        methods: {
            watchRoundId() {
                console.log("Watch props.roundId function called:"+this.roundId);
                if (this.roundDocSubs != null) {
                    this.roundDocSubs();
                    this.roundDocSubs = null;
                }
                if (this.roundId != null) {
                    this.roundDocRef = this.playDocRef.collection("rounds").doc(this.roundId);
                    this.roundDocSubs = this.roundDocRef.onSnapshot((doc) => {
                        console.log("index: " +this.myindex + " round index : " + doc.data().state);
                        if (doc.data().atout)
                            this.atout = doc.data().atout;
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
                        if (doc.data().state == "trick") {
                            if (doc.data().active == this.myindex)
                                this.myturn = true;
                            else   
                                this.myturn = false;
                        }
                        else
                            this.myturn = false;

                    });
                }
                else   
                    this.roundDocRef = null;       
            },     
            OrderHand(cards, atout) {
                var hand = [];

                hand = cards;
                hand.sort((a,b) => {return this.GetCardValue(b, atout) - this.GetCardValue(a, atout)});
                return hand;

            },
            playCard(event) {
                var playedCard;
                var trickDoc;
                var active;

                playedCard = {rank:event.rank, suit:event.suit};
                console.log("receive card play on hand event : " + event.suit + ":" + event.rank + "hand:" + event.hand);   

                this.roundDocRef.get().then((doc) => {
                    if (doc.data().active == this.myindex && doc.data().state == "trick") {
                        var trick;
                        this.handDocRef.update({
                            handOn: firebase.firestore.FieldValue.arrayRemove(playedCard),
                            handOff: firebase.firestore.FieldValue.arrayUnion(playedCard)
                        });         
                        trick = doc.data().currentTrick;
                        //db.collection("plays").doc(this.playId).collection("rounds").doc(this.roundId).update({deck: firebase.firestore.FieldValue.arrayUnion(playedCard)});
                        trickDoc = this.roundDocRef.collection("tricks").doc(trick);
                        trickDoc.update({
                            players: firebase.firestore.FieldValue.arrayUnion(this.playerId),
                            playerIndex: firebase.firestore.FieldValue.arrayUnion(this.myindex),
                            cards: firebase.firestore.FieldValue.arrayUnion(playedCard),

                        });

                        active = (doc.data().active+1)%doc.data().nbPlayers;
                        if (active == doc.data().starter) {
                            var winnerIndex;

                            this.roundDocRef.update({state: "end-trick"});

                            console.log ("round finished : check who won the trick");
                            trickDoc.get().then((tdoc) => {   
                                var points;

                                winnerIndex = this.CalculateWinner(tdoc.data().cards, tdoc.data().playerIndex, doc.data().atout);
                                console.log("winner : " + winnerIndex);
                                points = this.CalculatePoints(tdoc.data().cards, doc.data().atout);
                                console.log("Points: "+ points[0] + "/" + points[1]);
                                this.roundDocRef.update({state:"trick", active: winnerIndex, starter: winnerIndex, scores:firebase.firestore.FieldValue.arrayUnion({winnerIndex: winnerIndex, points:points})});

                                this.handDocRef.get().then((hdoc) => {
                                    if (hdoc.data().handOn.length == 0) {  
                                        // END TRICK, START another one
                                        this.CalculateRoundScore();
                                        this.roundDocRef.update({state:"end-round"});
                                        this.playDocRef.update({state:"end-round"});
                                    }
                                    else {
                                        this.roundDocRef.collection("tricks").add({
                                            roundId: this.roundId,
                                            players: [],
                                            playerIndex: [],
                                            cards: []
                                        })
                                        .then((docRef) => {
                                            console.log("Trick created with ID: ", docRef.id);
                                            this.roundDocRef.update({tricks:firebase.firestore.FieldValue.arrayUnion(docRef.id), currentTrick:docRef.id});
                                            this.$emit("start-trick", docRef.id);

                                        })
                                        .catch(function(error) {
                                            console.error("Error adding document: ", error);
                                        });      
                                    }
                                });
                            });
                        }
                        else
                            this.roundDocRef.update({active: active});                    
                    }
                });
            },
            take(suit="") {

                this.roundDocRef.get().then((doc) => {
                    console.log("round : "+ doc.data().state);
                    var takeCard = doc.data().choice[0];
                    console.log("take : " + takeCard.suit, ":player : " + this.playerId);
                    if (suit == "")
                        this.roundDocRef.update({
                            atout: takeCard.suit, bid: this.playerId, bidIndex: this.myindex,
                            choice: firebase.firestore.FieldValue.arrayRemove(takeCard)
                        });
                    else
                        this.roundDocRef.update({
                            atout: suit, bid: this.playerId, bidIndex: this.myindex,
                            choice: firebase.firestore.FieldValue.arrayRemove(takeCard)
                        });

                    console.log("draw remaining cards");

                    this.handDocRef.update({handOn: firebase.firestore.FieldValue.arrayUnion(takeCard)});

                    this.playDocRef.get().then((playDoc) => {
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
                                    this.roundDocRef.collection("hands").doc(handId).update({handOn: firebase.firestore.FieldValue.arrayUnion(nextCard)});
                                }
                            }
                            active = (doc.data().dealer+1)%playDoc.data().players.length;
                            this.roundDocRef.update({state:"trick", active: active, starter: active});
                            this.roundDocRef.collection("tricks").add({
                                roundId: this.roundId,
                                players: [],
                                playerIndex: [],
                                cards: []
                            })
                            .then((docRef) => {
                                console.log("Trick created with ID: ", docRef.id);
                                this.roundDocRef.update({tricks:firebase.firestore.FieldValue.arrayUnion(docRef.id), currentTrick:docRef.id});
                                this.$emit("start-trick", docRef.id);
                            })
                            .catch(function(error) {
                                console.error("Error adding document: ", error);
                            });                                

                        });
                });                
            },
            pass() {
                var index;
                
                this.roundDocRef.get().then((doc) => {
                    index = doc.data().active;
                    if (index == doc.data().dealer) {
                        index = (index+1)%doc.data().nbPlayers;
                        this.roundDocRef.update({state: "choice-2", active: index});
                    }
                    else {
                        index = (index+1)%doc.data().nbPlayers;
                        this.roundDocRef.update({active: index});
                    }
                });
            },
            passbis() {
                var index;
                
                this.roundDocRef.get().then((doc) => {
                    index = doc.data().active;
                    if (index == doc.data().dealer) {
                        index = (index+1)%doc.data().nbPlayers;
                        this.roundDocRef.update({state: "end-round", active: index});
                        this.playDocRef.update({state: "end-round"});
                    }
                    else {
                        index = (index+1)%doc.data().nbPlayers;
                        this.roundDocRef.update({active: index});
                    }
                });
            },
            CalculateRoundScore() {
                var points = [];

                this.roundDocRef.get().then((doc) => {
                   for (var i=0;i<doc.data().nbPlayers;i++) {
                        points[i] = 0;
                    }
                    for (i=0;i<doc.data().scores.length;i++) {
                        points[doc.data().scores[i].winnerIndex] += doc.data().scores[i].points;
                        if (i==doc.data().scores.length-1)
                            points[doc.data().scores[i].winnerIndex] += 10;
                    }
                    points[0] = points[0] + points[2];
                    points[1] = points[1] + points[3];
                    if (points[0] > points[1] && (doc.data().bidIndex == 1 || doc.data().bidIndex == 3)) {
                        points[0] = 160;
                        points[1] = 0;
                    }
                    else if (points[1] > points[0] && (doc.data().bidIndex == 0 || doc.data().bidIndex == 2)) {
                        points[1] = 160;
                        points[0] = 0;
                    }
                    this.roundDocRef.update({score:[points[0], points[1]]});
                });
            },
            CalculateWinner(cards, indexes, atout) {
                var winnerIndex = -1;
                var best = -1;
                var bestAtout = -1;
                var color;

                color = cards[0].suit;
                for (var i=0;i<cards.length;i++) {
                    var value = this.GetCardValue(cards[i], atout);
                    console.log("card value: " + value + " (" + cards[i].suit + cards[i].rank + ")");
                    if (cards[i].suit == atout) {
                        if (value > bestAtout) {
                            winnerIndex = i;
                            console.log("best card" + i);
                            bestAtout = value;
                        }
                    }
                    else if (bestAtout == -1 && cards[i].suit == color){
                        if (value > best) {
                            best = value;
                            console.log("best card" + i);
                            winnerIndex = i;
                        }
                    }
                }

                return indexes[winnerIndex];
            },
            CalculatePoints(cards, atout) {
                var points = 0;

                for (var i=0;i<cards.length;i++) {
                    points += this.GetCardPoints(cards[i], atout);
                }

                return points;
            },
            GetCardValue(card, atout) {
                var value;
                if (card.suit == atout) {
                    switch (card.rank) {
                        case "J":
                            value = 107;
                            break;
                        case "9" :
                            value=106;
                            break;
                        case "A" :
                        case "As" :
                            value=105;
                            break;
                        case "10" :
                        case "T" :
                            value=104;
                            break;
                        case "K" :
                            value=103;
                            break;
                        case "Q" :
                            value=102;
                            break;
                        case "8" : 
                            value=101;
                            break;
                        case "7" :
                            value=100;
                            break;
                        default:
                            value=0;
                            break;
                    }
                }
                else {
                    switch (card.rank) {
                        case "A":
                        case "As" :
                            value = 8;
                            break;
                        case "10" :
                        case "T" :
                            value=7;
                            break;
                        case "K" :
                            value=6;
                            break;
                        case "Q" :
                            value=5;
                            break;
                        case "J" :
                            value=4;
                            break;
                        case "9" :
                            value=3;
                            break;
                        case "8" : 
                            value=2;
                            break;
                        case "7" :
                            value=1;
                            break;
                        default:
                            value=0;
                            break;
                    } 
                    switch (card.suit) {
                        case "hearts":
                            value += 10;
                            break;
                        case "clubs":
                            value += 20;
                            break;
                        case "diamonds":
                            value += 30;
                            break;
                        default:
                            break;
                    }                   
                }
                return value;
            },       
           GetCardPoints(card, atout) {
                var value;
                if (card.suit == atout) {
                    switch (card.rank) {
                        case "J":
                            value = 20;
                            break;
                        case "9" :
                            value=14;
                            break;
                        case "A" :
                        case "As" :
                            value=11;
                            break;
                        case "10" :
                        case "T" :
                            value=10;
                            break;
                        case "K" :
                            value=4;
                            break;
                        case "Q" :
                            value=3;
                            break;
                        case "8" : 
                            value=0;
                            break;
                        case "7" :
                            value=0;
                            break;
                        default:
                            value=0;
                            break;
                    }
                }
                else {
                    switch (card.rank) {
                        case "A":
                        case "As" :
                            value = 11;
                            break;
                        case "10" :
                        case "T" :
                            value=10;
                            break;
                        case "K" :
                            value=4;
                            break;
                        case "Q" :
                            value=3;
                            break;
                        case "J" :
                            value=2;
                            break;
                        case "9" :
                            value=0;
                            break;
                        case "8" : 
                            value=0;
                            break;
                        case "7" :
                            value=0;
                            break;
                        default:
                            value=0;
                            break;
                    }                    
                }
                return value;
            },
            getStyle(card, index) {
                var n = this.myhand.length;
                if (n === 0) {
                    return;
                }
                var width = this.cwidth; // hack: for a hidden hand
                var height = Math.floor(width * 1.4); // hack: for a hidden hand
                var box = {};
                var coords = this.calculateCoords(n, this.cradius, width, height, "N", this.cspacing, box);    
                console.log("!!!!!!!!!!!!!!!!Calculate Box : " + box.width + ":" + box.height);
                //console.log("Add : " + Math.floor((width - box.width)*0.5))
                var rotationAngle = Math.round(coords[index].angle);
                if (this.indexUser == 0)
                    coords[index].x += Math.floor((450 - box.width)*0.5);
                /*else if (this.indexUser == 2) {
                    console.log("Before : " + coords[index].x);
                    coords[index].x += Math.floor((250 - box.width)*0.5);
                    console.log("After : " + coords[index].x);
                }
                else if (this.indexUser == 1)
                    coords[index].y += Math.floor((250 - box.height)*0.5);
                else if (this.indexUser == 3)
                    coords[index].y += Math.floor((250 - box.height)*0.5); */

                /*if (this.indexUser == 0)
                    coords[index].y += 100;
                else if (this.indexUser == 1 || this.indexUser == 3 )
                    coords[index].x += 50;*/
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