const { PlayerRepository } = require("../repositories/Player.repository");
const playerRepository = new PlayerRepository();

class SocketController {
    setIO(io){
        this.io = io;
    }

    onConnect(socket){
        let playerId = socket.handshake.query.playerId;
        let player = playerRepository.getById(playerId);

        if(!player)
            throw new Error("Player not found.");
        
        console.info(player.gameRoomId)
        socket.join(player.gameRoomId); //Create or join to a room with the same id as gameRoomId
    }

    post(player, action, data){
        console.info("Emmit to ", player.gameRoomId)
        this.io.to(player.gameRoomId).emit(action, data); //Emit a message only to the room that the player is on
    }
}

exports.socketController = new SocketController();
