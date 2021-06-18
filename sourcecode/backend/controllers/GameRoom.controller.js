const { GameRoomModel } = require("../models/GameRoom.model");
const { PlayerRepository } = require("../repositories/Player.repository");
const { GameRoomRepository } = require("../repositories/GameRoom.repository");
const { socketController, Actions } = require("../controllers/Socket.controller")
const IdGenerator = require("../helpers/IdGenerator");
const ArrayHelper = require("../helpers/ArrayHelper");

const playerRepository = new PlayerRepository();
const gameRoomRepository = new GameRoomRepository();

class GameRoomController {
    constructor(app){
        app.route('/gameroom/join')
            .post([this.postJoin]);

        app.route('/gameroom/leave')
            .post([this.postLeave]);
        
        app.route('/gameroom/:id')
            .get([this.get]);

        app.route('/gameroom/:id/drawcard')
            .post([this.postDrawCard]);
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

                socketController.post(player.gameRoomId, Actions.PlayerJoined, { gameRoomId: player.gameRoomId, playerId: player.id })
                response.status(200).send(availableRoom);
            }else{ //if not, create a new one
                let newGameRoom = new GameRoomModel(IdGenerator.newId(), [player]);
                gameRoomRepository.insert(newGameRoom);

                player.gameRoomId = newGameRoom.id;
                playerRepository.update(player); //update player current gameroom

                socketController.post(player.gameRoomId, Actions.PlayerJoined, { gameRoomId: player.gameRoomId, playerId: player.id })
                response.status(201).send(newGameRoom);
            }   
        }
    }

    postLeave(request, response){
        let player = playerRepository.getById(request.body.playerId);
        if(!player)
            response.status(400).send("Player not found");
        else if(!player.gameRoomId)
            response.status(400).send("Player is not in a room");
        else{
            let gameRoom = gameRoomRepository.getById(player.gameRoomId);

            //Search and remove the player from the room list
            ArrayHelper.RemoveItemByField(gameRoom.players, "id", player.id);

            if(gameRoom.players.length > 0)
                gameRoomRepository.update(gameRoom);
            else
                gameRoomRepository.delete(gameRoom.id); //If the room is empty, then remove it

            player.gameRoomId = null;
            playerRepository.update(player);

            socketController.post(gameRoom.id, Actions.PlayerLeft, { gameRoomId: gameRoom.id, playerId: player.id })
            response.status(200).send();
        }
    }

    get(request, response){
        let gameRoom = gameRoomRepository.getById(request.params.id);
        if(gameRoom)
            response.status(200).send(gameRoom);
        else
            response.status(404).send();
    }

    postDrawCard(request, response){
        let player = playerRepository.getById(request.body.playerId);

        let card = gameRoomRepository.drawCard(request.body.gameRoomId);
        if(player.hand.length > 3)
            response.status(400).send("Player already has a full hand");

        player.hand.push(player);
        playerRepository.update(player);
        response.status(200).send(card);
    }

   
}

exports.GameRoomController = GameRoomController;