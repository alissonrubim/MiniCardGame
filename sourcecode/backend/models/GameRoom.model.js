class GameRoomModel {
    constructor(id, players){
        if(players.length > 2)
            console.error("A room can't have more thatn 2 players");

        this.id = id
        this.players = players
        this.deck = []
        this.playerTurnIndex = 0
    }
}
exports.GameRoomModel = GameRoomModel;