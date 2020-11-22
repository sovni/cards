class FirePlayGround {
    constructor (players, tricks, state) {
        this.players = players;
        this.tricks = tricks;
        this.state = state;
    }
    //toString() {
    //    return this.name + ', ' + this.state + ', ' + this.country;
    //}
}

// Firestore data converter
var playGroundConverter = {
    toFirestore: function(playground) {
        return {
            players: playground.players,
            tricks: playground.tricks,
            state: playground.state
            }
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new FirePlaygound(data.players, data.tricks, data.state)
    }
}