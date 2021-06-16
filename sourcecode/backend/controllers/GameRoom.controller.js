const { GameRoomModel } = require("../models/GameRoom.model");
const { PlayerRepository } = require("../repositories/Player.repository");
const { GameRoomRepository } = require("../repositories/GameRoom.repository");
const IdGenerator = require("../helpers/IdGenerator");

const playerRepository = new PlayerRepository();
const gameRoomRepository = new GameRoomRepository();

class GameRoomController {
    constructor(app){
        app.route('/gameroom/join')
            .post([this.postJoin]);
        
        app.route('/gameroom/:id')
            .get([this.get]);
    }

    postJoin(request, response){
        let player = playerRepository.getById(request.body.playerId);
        if(!player)
            response.status(400).send("Player not found");

        if(player.gameRoomId){ //If is joinned to a game, return this same game
            response.status(200).send(gameRoomRepository.getById(player.gameRoomId));
        }else{
            let availableRoom = gameRoomRepository.getAvailable();
            if(availableRoom){ //if has an avaibale room, join the player
                availableRoom.players.push(player);
                gameRoomRepository.update(availableRoom);

                player.gameRoomId = availableRoom.id;
                playerRepository.update(player); //update player current gameroom

                response.status(200).send(availableRoom);
            }else{ //if not, create a new one
                let newGameRoom = new GameRoomModel(IdGenerator.newId(), [player]);
                gameRoomRepository.insert(newGameRoom);

                player.gameRoomId = newGameRoom.id;
                playerRepository.update(player); //update player current gameroom

                response.status(201).send(newGameRoom);
            }   
        }
    }

    get(request, response){
        let gameRoom = gameRoomRepository.getById(request.params.id);
        if(gameRoom)
            response.status(200).send(gameRoom);
        else
            response.status(404).send();
    }
}

exports.GameRoomController = GameRoomController;