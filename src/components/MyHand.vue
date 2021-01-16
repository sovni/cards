<template>
   <div class="p-grid">
        <div v-if="indexUser == 0" class="p-col-12 p-d-flex p-jc-center" style="height:50px">  
            <Button v-if="choose && game == 'belote'" class="p-button-raised p-button-rounded" icon="pi pi-check" @click="take()"/>
            <Button v-if="choose && game == 'belote'" class="p-button-raised p-button-rounded" icon="pi pi-times" @click="pass()"/>
            <Button v-if="choosebis && game == 'belote'" class="p-button-raised p-button-rounded p-button-secondary" label="&spades;" @click="take('spades')"/>
            <Button v-if="choosebis && game == 'belote'" class="p-button-raised p-button-rounded p-button-danger" label="&hearts;" @click="take('hearts')"/>
            <Button v-if="choosebis && game == 'belote'" class="p-button-raised p-button-rounded p-button-secondary" label="&clubs;" @click="take('clubs')"/>
            <Button v-if="choosebis && game == 'belote'" class="p-button-raised p-button-rounded p-button-danger" label="&diams;" @click="take('diamonds')"/>
            <Button v-if="choosebis && game == 'belote'" class="p-button-raised p-button-rounded" icon="pi pi-times" @click="passbis()"/>
            <Button v-if="choose && game == 'tarot' && bidContract == ''" label="Petite" style="z-index:10;" class="p-button-raised p-button-rounded" icon="pi pi-check" @click="contract('petite')"/>
            <Button v-if="choose && game == 'tarot' && (bidContract == '' || bidContract == 'petite')" label="Garde" style="z-index:10;" class="p-button-raised p-button-rounded" icon="pi pi-check" @click="contract('garde')"/>
            <Button v-if="choose && game == 'tarot' && bidContract != 'gardesans' && bidContract != 'gardecontre'" label="Garde Sans" style="z-index:10;" class="p-button-raised p-button-rounded" icon="pi pi-check" @click="contract('gardesans')"/>
            <Button v-if="choose && game == 'tarot' && bidContract != 'gardecontre'" style="z-index:10;" label="Garde Contre" class="p-button-raised p-button-rounded" icon="pi pi-check" @click="contract('gardecontre')"/>
            <Button v-if="choose && game == 'tarot'" class="p-button-raised p-button-rounded" style="z-index:10;" icon="pi pi-times" @click="pass()"/>
            <Button v-if="choosebis && game == 'tarot'" class="p-button-raised p-button-rounded p-button-secondary" style="z-index:10;" label="&spades;" @click="take('swords')"/>
            <Button v-if="choosebis && game == 'tarot'" class="p-button-raised p-button-rounded p-button-danger" style="z-index:10;" label="&hearts;" @click="take('cups')"/>
            <Button v-if="choosebis && game == 'tarot'" class="p-button-raised p-button-rounded p-button-secondary" style="z-index:10;" label="&clubs;" @click="take('wands')"/>
            <Button v-if="choosebis && game == 'tarot'" class="p-button-raised p-button-rounded p-button-danger"  style="z-index:10;" label="&diams;" @click="take('coins')"/>
            <Button v-if="myturn" class="p-button-raised p-button-rounded" style="z-index:10;" icon="pi pi-arrow-circle-up" />
        </div>
        <div class="p-col-12" >  
        <!--<div class="hhand active-hand fan"  style="width:400px;height:200px;">-->
        <div class="hhand active-hand fan" >
            <CBCard v-for="(mycard, index) in myhand" v-bind:key="mycard" v-bind:myactive="activeUser" v-bind:mycard="mycard" v-bind:myhand="handId" v-bind:mystyle="getStyle(mycard, index)" @card-play="playCard" :game="game"/> 
        </div>
        </div>
       <div v-if="indexUser != 0" class="p-col-12 p-d-flex p-jc-center" style="height:50px">  
            <Button v-if="choose && game == 'belote'" class="p-button-raised p-button-rounded" icon="pi pi-check" @click="take()"/>
            <Button v-if="choose && game == 'belote'" class="p-button-raised p-button-rounded" icon="pi pi-times" @click="pass()"/>
            <Button v-if="choosebis && game == 'belote'" class="p-button-raised p-button-rounded p-button-secondary" label="&spades;" @click="take('spades')"/>
            <Button v-if="choosebis && game == 'belote'" class="p-button-raised p-button-rounded p-button-danger" label="&hearts;" @click="take('hearts')"/>
            <Button v-if="choosebis && game == 'belote'" class="p-button-raised p-button-rounded p-button-secondary" label="&clubs;" @click="take('clubs')"/>
            <Button v-if="choosebis && game == 'belote'" class="p-button-raised p-button-rounded p-button-danger" label="&diams;" @click="take('diamonds')"/>
            <Button v-if="choosebis && game == 'belote'" class="p-button-raised p-button-rounded" icon="pi pi-times" @click="passbis()"/>
            <Button v-if="choose && game == 'tarot' && bidContract == ''" label="Petite" class="p-button-raised p-button-rounded" icon="pi pi-check" @click="contract('petite')"/>
            <Button v-if="choose && game == 'tarot' && (bidContract == '' || bidContract == 'petite')" label="Garde" class="p-button-raised p-button-rounded" icon="pi pi-check" @click="contract('garde')"/>
            <Button v-if="choose && game == 'tarot' && bidContract != 'gardesans' && bidContract != 'gardecontre'" label="Garde Sans" class="p-button-raised p-button-rounded" icon="pi pi-check" @click="contract('gardesans')"/>
            <Button v-if="choose && game == 'tarot' && bidContract != 'gardecontre'" label="Garde Contre" class="p-button-raised p-button-rounded" icon="pi pi-check" @click="contract('gardecontre')"/>
            <Button v-if="choose && game == 'tarot'" class="p-button-raised p-button-rounded" icon="pi pi-times" @click="pass()"/>
            <Button v-if="choosebis && game == 'tarot'" class="p-button-raised p-button-rounded p-button-secondary" label="&spades;" @click="take('swords')"/>
            <Button v-if="choosebis && game == 'tarot'" class="p-button-raised p-button-rounded p-button-danger" label="&hearts;" @click="take('cups')"/>
            <Button v-if="choosebis && game == 'tarot'" class="p-button-raised p-button-rounded p-button-secondary" label="&clubs;" @click="take('wands')"/>
            <Button v-if="choosebis && game == 'tarot'" class="p-button-raised p-button-rounded p-button-danger" label="&diams;" @click="take('coins')"/>
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
                currentBid: "'"
                //atout: ""    
            }
        },
        props: ['handId','playerId', 'indexUser','playId','cwidth','roundId','activePlayer','atout','state','game','bidContract'],      
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
                    if (this.playDocRef == null) {
                        this.playDocRef = db.collection("plays").doc(this.playId);
                    }
                    this.handDocRef = this.playDocRef.collection("rounds").doc(this.roundId).collection("hands").doc(this.handId);
                    this.handDocSubs = this.handDocRef.onSnapshot((doc) => {
                            console.log("Hands onSnapshot launched (MyHand 1)");
                            //this.roundId = doc.data().round;
                            console.log("Current round :" + this.roundId);
                            this.myindex = doc.data().playerIndex;
                            this.roundDocRef = this.playDocRef.collection("rounds").doc(this.roundId);
                            this.watchRound();
                            this.myhand = this.OrderHand(doc.data().handOn, this.atout);
                    });
                    if (this.game == "tarot")
                        this.cradius = 250;
                    else   
                        this.cradius = 166;
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
            },
            activePlayer: function(newVal, oldVal) {
                console.log("Watch props.activePlayer function called:" + newVal + ":"+oldVal+":"+this.activePlayer + ":myindex="+this.myindex);
                this.watchRound();   
            },
            state: function(newVal, oldVal) {
                console.log("Watch props.roundState function called:" + newVal + ":"+oldVal+":"+this.state+ ":myindex="+this.myindex);
                this.watchRound();   
            }            
        },
        methods: {
            watchRound() {
                if (this.state == "choice-1") {
                    this.choosebis = false;
                    if (this.activePlayer == this.myindex)  {
                        console.log("active hand: " +this.myindex);
                        this.choose = true;
                    }
                    else {
                        this.choose = false;
                    }
                }
                else if (this.state == "choice-2") {
                    this.choose = false;
                    if (this.activePlayer == this.myindex)  {
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
                if (this.state == "trick") {
                    if (this.activePlayer == this.myindex)
                        this.myturn = true;
                    else   
                        this.myturn = false;
                }
                else
                    this.myturn = false;

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
    
                        trick = doc.data().currentTrick;
                        trickDoc = this.roundDocRef.collection("tricks").doc(trick);

                        trickDoc.get().then((tdoc) => {  
                            
                            var allowed;
                            if (tdoc.data().cards.length == doc.data().nbPlayers) {
                                allowed = false;
                                console.log(tdoc.data().cards.length + ":" + doc.data().nbPlayers);
                            }
                            else
                                allowed = this.checkPlayAllowed(playedCard, tdoc.data().cards, doc.data().atout, doc.data().tricks.length);

                            if (allowed) {
                                this.handDocRef.update({
                                    handOn: firebase.firestore.FieldValue.arrayRemove(playedCard),
                                    handOff: firebase.firestore.FieldValue.arrayUnion(playedCard)
                                }); 
                                //db.collection("plays").doc(this.playId).collection("rounds").doc(this.roundId).update({deck: firebase.firestore.FieldValue.arrayUnion(playedCard)});
                                if (this.game == "tarot" && playedCard.suit == "trump" && playedCard.rank == "0")
                                    this.roundDocRef.update({bidExcuse: this.myindex});

                                trickDoc.update({
                                    players: firebase.firestore.FieldValue.arrayUnion(this.playerId),
                                    playerIndex: firebase.firestore.FieldValue.arrayUnion(this.myindex),
                                    cards: firebase.firestore.FieldValue.arrayUnion(playedCard),
                                })
                                .then(() => {

                                    active = (doc.data().active+1)%doc.data().nbPlayers;
                                    if (active == doc.data().starter) {
                                        var winnerIndex;
                                        var bouts = 0;

                                        setTimeout(() => { 
                                            //this.roundDocRef.update({state: "end-trick"});

                                            console.log ("round finished : check who won the trick");

                                            var points;
                                            trickDoc.get().then((tdoc) => {  

                                                winnerIndex = this.CalculateWinner(tdoc.data().cards, tdoc.data().playerIndex, doc.data().atout);
                                                bouts = this.CalculateNbBouts(tdoc.data().cards);
                                                console.log("winner : " + winnerIndex);
                                                points = this.CalculatePoints(tdoc.data().cards, doc.data().atout);
                                                console.log("Points: "+ points);
                                                this.roundDocRef.update({
                                                    state:"trick", 
                                                    active: winnerIndex, 
                                                    starter: winnerIndex, 
                                                    lastTrick: tdoc.data().cards,
                                                    scores:firebase.firestore.FieldValue.arrayUnion({
                                                        winnerIndex: winnerIndex, 
                                                        points:points,
                                                        bouts: bouts,
                                                        trick:tdoc.id
                                                    })
                                                })
                                                .then(() => {

                                                    this.handDocRef.get().then((hdoc) => {
                                                        if (hdoc.data().handOn.length == 0) {  
                                                            // END TRICK, START another one
                                                            this.CalculateRoundScore();
                                                            //this.roundDocRef.update({state:"end-round"});
                                                            //this.playDocRef.update({state:"end-round"});
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
                                            });
                                        }, 1500);
                                    }
                                    else
                                        this.roundDocRef.update({active: active});                    
                                });
                            }
                            else
                                console.log("Card Not allowed !!!!");
                        });
                    }
                    else if (doc.data().active == this.myindex && doc.data().state == "choice-3") {
                        if (playedCard.rank != "trump" && playedCard.rank != "K") {
                            this.handDocRef.update({
                                handOn: firebase.firestore.FieldValue.arrayRemove(playedCard)
                            });
                            var nbDeck = doc.data().deck.length;
                            this.roundDocRef.update({
                                deck: firebase.firestore.FieldValue.arrayUnion(playedCard)
                            });
                            if (nbDeck == 2) {
                                this.playDocRef.get().then((playDoc) => {
                                    var active;
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
                            }
                        }
                    }
                    else {
                        console.log("wait your turn");
                        this.$toast.add({severity:'success', summary: 'Veuillez attendre votre tour', group: "bottom-center", life: 3000});
                    }
                    
                });
            },
            contract(bid) {
                this.roundDocRef.get().then((doc) => {
                    var index;
                    index = doc.data().active;
                    if (index == doc.data().dealer) {
                        this.roundDocRef.update({
                            bid: this.playerId, bidIndex: this.myindex,
                            bidPlayer: this.getUserName(),
                            bidContract: bid,
                            state: "choice-2"
                        });
                    }
                    else {
                       index = (index+1)%doc.data().nbPlayers;
                        //this.roundDocRef.update({state: "choice-2", active: index});
                        this.roundDocRef.update({
                            bid: this.playerId, bidIndex: this.myindex,
                            bidPlayer: this.getUserName(),
                            bidContract: bid,
                            active: index
                        });               
                    }
                });
            },
            take(suit="") {
                this.roundDocRef.get().then((doc) => {
                    console.log("round : "+ doc.data().state);
                    if (this.game == "belote") {
                        var takeCard = doc.data().choice[0];
                        console.log("take : " + takeCard.suit, ":player : " + this.playerId);
                        if (suit == "")
                            this.roundDocRef.update({
                                atout: takeCard.suit, bid: this.playerId, bidIndex: this.myindex,
                                bidPlayer: this.getUserName(),
                                choice: firebase.firestore.FieldValue.arrayRemove(takeCard)
                            });
                        else
                            this.roundDocRef.update({
                                atout: suit, bid: this.playerId, bidIndex: this.myindex,
                                bidPlayer: this.getUserName(),
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
                    }
                    else if (this.game == "tarot") {
                        this.roundDocRef.collection("hands").get().then((querySnapshot) => {
                            var bidPartnerIndex = -1;
                            var bidPartnerId;
                            querySnapshot.forEach((hdoc) => {
                                if (bidPartnerIndex == -1) {
                                    for (var i=0;i<hdoc.data().handOn.length;i++) {
                                        if (hdoc.data().handOn[i].suit == suit && hdoc.data().handOn[i].rank == "K") {
                                            bidPartnerIndex = hdoc.data().playerIndex;
                                            bidPartnerId = hdoc.data().player;
                                            break;
                                        }
                                    }
                                }
                            });
                            if (bidPartnerIndex != -1) {
                                this.roundDocRef.update({
                                    bidPartner: bidPartnerId,
                                    bidPartnerIndex: bidPartnerIndex
                                });
                            }
                            else {
                                this.roundDocRef.update({
                                    bidPartnerIndex: -1
                                });                                
                            }
                        });

                        this.roundDocRef.get().then((doc) => {
                            this.roundDocRef.update({
                                atout: suit
                            });
                            if (doc.data().bidContract != "gardesans" && doc.data().bidContract != "gardecontre") {
                                var dog = [];
                                for (var k=0;k<doc.data().deck.length;k++) {
                                    var nextCard;
                                    nextCard = doc.data().deck[k];
                                    dog.push(nextCard);
                                    this.handDocRef.update({
                                        handOn: firebase.firestore.FieldValue.arrayUnion(nextCard)
                                    });
                                }
                                this.roundDocRef.update({state: "choice-3", deck: [], dog: dog});
                            }
                            else{
                                this.playDocRef.get().then((playDoc) => {
                                    var active;
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
                            }
                        });
                    }
                });                
            },
            pass() {
                var index;
                
                this.roundDocRef.get().then((doc) => {
                    index = doc.data().active;
                    if (index == doc.data().dealer) {
                        if (this.game == "belote") {
                            index = (index+1)%doc.data().nbPlayers;
                            this.roundDocRef.update({state: "choice-2", active: index});
                        }
                        else if (this.game == "tarot") {
                            if (doc.data().bidContract != "" && doc.data().bidContract != undefined) {
                                this.roundDocRef.update({
                                    active: doc.data().bidIndex,
                                    state: "choice-2"
                                });
                            }
                            else {
                                index = (index+1)%doc.data().nbPlayers;
                                this.roundDocRef.update({state: "end-round", active: index});
                                this.playDocRef.update({state: "end-round"});                                
                            }
                        }
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
            checkPlayAllowed(playedCard, trick, atout, indexTrick) {
                var allowed = true;
                var suitPlayed = '';
                var bestAtoutTrick;

                if (trick.length == 0) {
                    if (this.game == "tarot" && indexTrick == 1) {
                        if (playedCard.suit == atout && playedCard.rank != 'K') {
                            this.$toast.add({severity:'success', summary: 'Ne pas jouer la couleur demandée au 1er tour !', group: "bottom-center", life: 3000});
                            return false;
                        }
                    }
                    return true;
                }
                                
                if (this.game == "tarot") {
                    atout = "trump";
                    if (playedCard.suit == "trump" && playedCard.rank == "0")
                        return true;
                    if (this.myhand.length == 2) {
                        if ((this.myhand[0].suit == "trump" && this.myhand[0].rank == "0") ||
                            (this.myhand[1].suit == "trump" && this.myhand[1].rank == "0")) {
                            this.$toast.add({severity:'success', summary: 'L\'excuse ne doit pas être jouée au dernier tour !', group: "bottom-center", life: 3000});
                            return false;
                        }
                    }
                }

                suitPlayed = trick[0].suit;
                //for (var i=0;i<trick.length;i++) {
                //}

                if (playedCard.suit == suitPlayed) {
                    if (suitPlayed != atout)
                        allowed = true;
                    else {
                        console.log("Check best atout");
                        console.log(trick);
                        bestAtoutTrick = this.bestAtout(trick, atout);
                        console.log("Check best atout : " + bestAtoutTrick);
                        console.log("Played card value :" + this.GetCardValue(playedCard, atout))

                        if (this.GetCardValue(playedCard, atout) > bestAtoutTrick)
                            allowed = true;
                        else if (this.bestAtout(this.myhand, atout) > bestAtoutTrick) {
                            this.$toast.add({severity:'success', summary: 'Il faut monter à l\'atout !', group: "bottom-center", life: 3000});
                            console.log("Il faut monter à l'atout !!");
                            allowed = false;
                        }
                        else
                            allowed = true;
                    }
                }
                else if (this.hasSuit(suitPlayed)) {
                    allowed = false;
                    this.$toast.add({severity:'success', summary: 'Il faut jouer la couleur demandée !', group: "bottom-center", life: 3000});
                    console.log("Il faut jouer de la couleur demandée !!");
                }
                else if (suitPlayed == atout) {
                    if (this.hasSuit(atout)) {
                        allowed = false;
                        this.$toast.add({severity:'success', summary: 'Il faut jouer de l\'atout  !', group: "bottom-center", life: 3000});
                        console.log("Il faut jouer de l'atout !!");
                    }
                    else
                        allowed = true;
                }
                else if (!this.hasSuit(atout))
                    allowed = true;
                else if (this.game == "belote" && this.isPartnerMaster(trick, atout)) {
                    allowed = true;
                }
                else {
                    var bestAtout = this.bestAtout(this.myhand, atout);
                    bestAtoutTrick = this.bestAtout(trick, atout);
                    if (this.GetCardValue(playedCard, atout) < bestAtoutTrick && bestAtout > bestAtoutTrick) {
                        allowed = false;
                        this.$toast.add({severity:'success', summary: 'Il faut monter à l\'atout  !', group: "bottom-center", life: 3000});
                        console.log("Il faut monter à l'atout !!")
                    }
                    else if (playedCard.suit != atout && this.hasSuit(atout)) {
                        allowed = false;
                        this.$toast.add({severity:'success', summary: 'Il faut jouer atout  !', group: "bottom-center", life: 3000});
                        console.log("Il faut jouer atout !!")
                    }
                    else
                        allowed = true;
                }

                        /*axios.get('https://kaamelott.chaudie.re/api/random')
                        .then(response => {
                            this.info = response
                            console.log(response.citation.citation);
                        });*/
                return allowed;
            },
            hasSuit(suit){
                for (var i=0;i<this.myhand.length;i++) {
                    if (this.myhand[i].suit == suit) {
                        if (this.game == "tarot" && suit == "trump" && this.myhand[i].rank == "0")
                            continue;
                        return true;
                    }
                }
                return false;
            },
            isPartnerMaster(trick, atout) {
                var index;
                if (trick.length <= 1)
                    return false;
                index = this.CalculateWinner(trick, [], atout);
                console.log("IsPartnerMaster : index=" + index);
                if ((index == 0 && trick.length == 2) || (index == 1 && trick.length == 3))
                    return true;
                else
                    return false;
            },
            bestAtout(cards, atout) {
                var best = 0;
                var val;
                for (var i=0;i<cards.length;i++) {
                    if ((this.game == "belote" && cards[i].suit == atout) || (this.game == "tarot" && cards[i].suit == "trump")) {
                        val = this.GetCardValue(cards[i], atout);
                        if (val > best)
                            best = val;
                    }
                }
                return best;
            },
            getUserName(){
                this.currentUser = firebase.auth().currentUser;
                if (!this.currentUser)
                    return "";
                return this.currentUser.displayName.split(" ")[0];
            },            
            CalculateRoundScore() {
                var points = [];
                var bouts = [];

                this.roundDocRef.get().then((doc) => {
                   for (var i=0;i<doc.data().nbPlayers;i++) {
                        points[i] = 0;
                        bouts[i] = 0;
                    }
                    for (i=0;i<doc.data().scores.length;i++) {
                        points[doc.data().scores[i].winnerIndex] += doc.data().scores[i].points;
                        bouts[doc.data().scores[i].winnerIndex] += doc.data().scores[i].bouts;
                        if (i==doc.data().scores.length-1 && this.game == "belote")
                            points[doc.data().scores[i].winnerIndex] += 10;
                    }
                    if (this.game == "belote") {
                        points[0] = points[0] + points[2];
                        points[1] = points[1] + points[3];
                        if (points[0] == 0 && points[1] == 162)
                            points[1] = 252;
                        else if (points[0] == 162 && points[1] == 0)
                            points[0] = 252;
                        else if (points[0] > points[1] && (doc.data().bidIndex == 1 || doc.data().bidIndex == 3)) {
                            points[0] = 162;
                            points[1] = 0;
                        }
                        else if (points[1] > points[0] && (doc.data().bidIndex == 0 || doc.data().bidIndex == 2)) {
                            points[1] = 162;
                            points[0] = 0;
                        }
                        this.roundDocRef.update({score:[points[0], points[1]], state:"end-round"});
                        this.playDocRef.update({lastScore:[points[0], points[1]], state:"end-round"});
                    }
                    else if (this.game == "tarot") {
                        var bidPoints;
                        var score;
                        var result;
                        var boutTotal = bouts[doc.data().bidIndex];
                        if (doc.data().bidPartnerIndex != -1)
                            boutTotal += bouts[doc.data().bidPartnerIndex];
                        if (doc.data().bidIndex == doc.data().bidExcuse || doc.data().bidPartnerIndex == doc.data().bidExcuse)
                            boutTotal += 1;
                        bidPoints = points[doc.data().bidIndex];  
                        if (doc.data().bidPartnerIndex != -1)
                            bidPoints += points[doc.data().bidPartnerIndex];

                        if (boutTotal == 0)
                            score = bidPoints - 56;
                        else if (boutTotal == 1)
                            score = bidPoints - 51;
                        else if (boutTotal == 2)
                            score = bidPoints - 41;
                        else if (boutTotal == 3)
                            score = bidPoints - 36;
                        
                        if (score > 0) {
                            score = Math.round(score);
                            result = 25 + score;
                        }
                        else {
                            var resRound = Math.round(score);
                            if (resRound > score)
                                score = resRound - 1;
                            result = -25 + score;
                        }
                        switch (doc.data().bidContract) {
                            case "petite" :
                                break;
                            case "garde" :
                                result = result*2;
                                break;
                            case "gardesans" :
                                result = result*4;
                                break;
                            case "gardecontre" :
                                result = result*6;
                                break;
                            default :
                                break;
                        }
                        console.log("Tarot score : result :" + result + " score : " + score + " points : " + bidPoints + " Bouts : " + boutTotal);
                        for (i=0;i<doc.data().nbPlayers;i++) {
                            points[i] = 0;
                        }
                        for (i=0;i<doc.data().nbPlayers;i++) {
                            if (i == doc.data().bidIndex && doc.data().bidPartnerIndex == -1)
                                points[i] = result * 4;
                            else if (i == doc.data().bidIndex)
                                points[i] = result * 2;
                            else if (i == doc.data().bidPartnerIndex)
                                points[i] = result;
                            else
                                points[i] = -result;
                        }
                        this.roundDocRef.update({score: points, state:"end-round"});
                        this.playDocRef.update({lastScore: points, lastBid: doc.data().bidContract, lastNbBouts: boutTotal, lastResult: bidPoints, state:"end-round"});
                    }
                });
            },
            CalculateNbBouts(cards) {
                var bouts = 0;
                for (var i=0;i<cards.length;i++) {
                    if (cards[i].suit == "trump" && (cards[i].rank == "I" || cards[i].rank == "XXI"))
                        bouts = bouts + 1;
                }
                return bouts;
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
                    if ((this.game == "belote" && cards[i].suit == atout) || (this.game == "tarot" && cards[i].suit == "trump" && cards[i].rank != "0")) {
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

                if (indexes.length == 0)
                    return winnerIndex;
                else
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
                if (this.game == "belote") {
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
                        if (atout == 'spades' || atout == "clubs") {
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
                        else {
                            switch (card.suit) {
                                case "clubs":
                                    value += 10;
                                    break;
                                case "diamonds":
                                    value += 20;
                                    break;
                                case "spades":
                                    value += 30;
                                    break;
                                default:
                                    break;
                            }  
                        }
                    }
                }
                else if (this.game == "tarot") {
                    if (card.suit == "trump") {
                        switch (card.rank) {
                            case "XXI":
                                value = 121;
                                break;
                            case "XX":
                                value = 120;
                                break;
                            case "XIX":
                                value = 119;
                                break;
                            case "XVIII":
                                value = 118;
                                break;
                            case "XVII":
                                value = 117;
                                break;
                            case "XVI":
                                value = 116;
                                break;
                            case "XV":
                                value = 115;
                                break;
                            case "XIV":
                                value = 114;
                                break;
                            case "XIII":
                                value = 113;
                                break;
                            case "XII":
                                value = 112;
                                break;
                            case "XI":
                                value = 111;
                                break;
                            case "X":
                                value = 110;
                                break;
                            case "IX":
                                value = 109;
                                break;
                            case "VIII":
                                value = 108;
                                break;
                            case "VII":
                                value = 107;
                                break;
                            case "VI":
                                value = 106;
                                break;
                            case "V":
                                value = 105;
                                break;
                            case "IV":
                                value = 104;
                                break;
                            case "III":
                                value = 103;
                                break;
                            case "II":
                                value = 102;
                                break;
                            case "I":
                                value = 101;
                                break;
                            case "0":
                                value = 0;
                                break;
                            default:
                                value = 0;
                                break;
                        }
                    }
                    else {
                        switch (card.rank) {
                            case "K" :
                                value=14;
                                break;
                            case "Q" :
                                value=13;
                                break;
                            case "J" :
                                value=12;
                                break;
                            case "P" :
                                value=11;
                                break;
                            case "10" :
                            case "T" :
                                value=10;
                                break;
                            case "9" :
                                value=9;
                                break;
                            case "8" : 
                                value=8;
                                break;
                            case "7" :
                                value=7;
                                break;
                            case "6" :
                                value=6;
                                break;
                            case "5" :
                                value=5;
                                break;
                            case "4" :
                                value=4;
                                break;
                            case "3" :
                                value=3;
                                break;
                            case "2" :
                                value=2;
                                break;
                            case "A":
                            case "As" :
                                value = 1;
                                break;
                            default:
                                value=0;
                                break;
                        } 
                        switch (card.suit) {
                            case "cups":
                                value += 20;
                                break;
                            case "wands":
                                value += 40;
                                break;
                            case "coins":
                                value += 60;
                                break;
                            default:
                                break;
                        }  
                    }
                }
                return value;
            },       
           GetCardPoints(card, atout) {
                var value;
                if (this.game == "belote") {
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
                }
                else if (this.game == "tarot") {
                    if (card.suit == "trump") {
                        switch (card.rank) {
                            case "XXI":
                                value = 4.5;
                                break;
                            case "I":
                                value = 4.5;
                                break;
                            case "0":
                                value = 4.5;
                                break;
                            default :     
                                value = 0.5;
                                break;
                        }
                    }
                    else {            
                        switch (card.rank) {
                            case "K":
                                value = 4.5;
                                break;
                            case "Q" :
                                value = 3.5;
                                break;
                            case "J" :
                                value = 2.5;
                                break;
                            case "P" :
                                value = 1.5;
                                break;
                            default :
                                value = 0.5;
                                break;    
                        }
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
                if (this.indexUser == 0) {
                    coords[index].x += Math.floor((450 - box.width)*0.5);
                    if (this.game == "tarot")
                        coords[index].y -= 40;
                }
                else if (this.indexUser == 1)
                    coords[index].x += 50;
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

                if (this.game == "belote") {
                    if (this.indexUser == 1)
                        startAngle = startAngle + 270;
                    else if (this.indexUser == 2)
                        startAngle = startAngle + 180;
                    else if (this.indexUser == 3)
                        startAngle = startAngle + 90;                        
                }
                else if (this.game == "tarot") {
                    if (this.indexUser == 1)
                        startAngle = startAngle + 270;
                    else if (this.indexUser == 2)
                        startAngle = startAngle + 200;
                    else if (this.indexUser == 3)
                        startAngle = startAngle + 160;                        
                    else if (this.indexUser == 4)
                        startAngle = startAngle + 90;
                }                
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