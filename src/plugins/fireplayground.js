
export default class FirePlayGround {
    constructor (players, playersName, game, state, score) {
        this.players = players;
        this.playersName = playersName;
        this.game = game;
        this.state = state;
        this.score = score;
    }
    //toString() {
    //    return this.name + ', ' + this.state + ', ' + this.country;
    //}
}

export var playGroundConverter = { 
    toFirestore: function(playground) {
        return {
            players: playground.players,
            playersName: playground.playersName,
            game: playground.game,
            state: playground.state,
            score: playground.score
            }
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new FirePlayGround(data.players, data.playersName, data.game, data.state, data.score)
    }
}

