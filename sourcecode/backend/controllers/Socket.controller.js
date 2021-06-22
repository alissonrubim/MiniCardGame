const { GameRoomRepository } = require("../repositories/GameRoom.repository");
const { PlayerRepository } = require("../repositories/Player.repository");
const playerRepository = new PlayerRepository();
const gameRoomRepository = new GameRoomRepository();

const Actions = {
    PlayerLeft: "player_left",
    PlayerJoined: "player_joined",
    PlayerPlayCard: "player_play_card",
    RoundIsOver: "round_is_over",
    MatchIsOver: "match_is_over",
    GameStarted: "game_started",
    GameEnded: "game_end"
}

class SocketController {
    setIO(io){
        this.io = io;
    }

    onConnect(socket){
        let playerId = socket.handshake.query.playerId;
        let player = playerRepository.getById(playerId);
        
        if(!player || !player.gameRoomId)
            socket.disconnect();
        else{
            socket.join(player.gameRoomId); //Create or join to a room with the same id as gameRoomId
        }
    }

    post(gameRoomId, action, data){
        console.info("Post", action, "to room", gameRoomId)
        this.io.to(gameRoomId).emit(action, data); //Emit a message only to the room that the player is on
    }
}

exports.socketController = new SocketController();

exports.Actions = Actions
