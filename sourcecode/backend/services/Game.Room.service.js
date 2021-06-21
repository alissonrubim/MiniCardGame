const ArrayHelper = require("../helpers/ArrayHelper");
const IdGenerator = require("../helpers/IdGenerator");
const { socketController, Actions } = require("../controllers/Socket.controller");
const { PlayerRepository } = require("../repositories/Player.repository");
const { GameRoomRepository } = require("../repositories/GameRoom.repository");

const { GameRoomModel } = require("../models/GameRoom.model");
const { MatchModel } = require("../models/Match.model");
const { RoundModel } = require("../models/Round.model");
const { PlayModel } = require("../models/Play.mode");

const playerRepository = new PlayerRepository();
const gameRoomRepository = new GameRoomRepository();

class GameRoomService {
    join(playerId){
        let gameRoom = null;
        let player = playerRepository.getById(playerId);
        if(!player)
            throw new Error("Player not found");

        if(player.gameRoomId){ //If is joinned to a game, return this same game
            return gameRoomRepository.getById(player.gameRoomId);
        }else{
            gameRoom = gameRoomRepository.getAvailable();
            if(gameRoom){ //if has an avaibale room, join the player
                gameRoom.players.push(player);
                gameRoomRepository.update(gameRoom);

                player.gameRoomId = gameRoom.id;
                playerRepository.update(player); //update player current gameroom
            }else{ //if not, create a new one
                gameRoom = new GameRoomModel(IdGenerator.newId(), [player]);
                gameRoomRepository.insert(gameRoom);

                player.gameRoomId = gameRoom.id;
                playerRepository.update(player); //update player current gameroom
            }   

            if(gameRoom.players.length == 2){
                this.startNewGame(gameRoom.id)
            }

            socketController.post(player.gameRoomId, Actions.PlayerJoined, { gameRoomId: player.gameRoomId, playerId: player.id })
            return gameRoom;
        }
    }

    startNewGame(gameRoomId){
        /* Start a new game, creating all the matches/rounds/plays structure */
        let gameRoom = gameRoomRepository.getById(gameRoomId);
        var match = new MatchModel(IdGenerator.newId());
        var roud = new RoundModel(IdGenerator.newId());
        match.rounds.push(roud);
        gameRoom.matches.push(match);
        gameRoom.currentPlayerIdTurn = gameRoom.players[0].id;
        gameRoomRepository.update(gameRoom);

        for(var i=0; i<3; i++){
            gameRoom.players.forEach((player) => {
                this.drawCard(gameRoom.id, player.id)
            })
        }
    }

    clearGame(gameRoomId){
        /* Clean the game, removing all the matches/round/plays info*/
        let gameRoom = gameRoomRepository.getById(gameRoomId);
        gameRoom.matches = [];
        gameRoomRepository.update(gameRoom);
    }

    drawCard(gameRoomId, playerId){
        let player = playerRepository.getById(playerId);
        if(!player)
            throw new Error("Player not found");
        let card = gameRoomRepository.drawCard(gameRoomId);
        if(player.hand.length > 3)
            throw new Error("Player already has a full hand");
        else{
            player.hand.push(card);
            playerRepository.update(player);
            return card;
        }
    }

    getNextPlayerTurn(gameRoom){
        var index = ArrayHelper.GetIndex(gameRoom.players, "id", gameRoom.currentPlayerIdTurn);
        return gameRoom.players[index < gameRoom.players.length - 1 ? index+1 : 0].id;
    }

    playCard(gameRoomId, playerId, cardId){
        let gameRoom = gameRoomRepository.getById(gameRoomId);
        let player = playerRepository.getById(playerId);

        if(!gameRoom)
            throw new Error("Gameroom not found");
        if(!player)
            throw new Error("Player not found");
        if(!ArrayHelper.Contains(gameRoom.players, "id", playerId))
            throw new Error("Player is not part of the gameroom");
        if(!ArrayHelper.Contains(player.hand, "id", cardId))
            throw new Error("Card is not part of the player hand");

        //Remove card from player hand    
        var card = player.hand.pop();
        playerRepository.update(player);
 
        //Store a play
        let match = gameRoom.matches[gameRoom.matches.length-1]
        let round = match.rounds[match.rounds.length - 1];
        round.plays.push(new PlayModel(IdGenerator.newId(), player.id, card.id));
        
        if(round.plays == gameRoom.players.length){ //if everyone has played, check who own the round
            
        }   
        else if(false){ //Check if someone won the match

        }else{
            //Change player turn
            gameRoom.currentPlayerIdTurn = this.getNextPlayerTurn(gameRoom);

            socketController.post(gameRoom.id, Actions.PlayerPlayCard, { gameRoomId: gameRoom.id, playerId: player.id })
        }
    }

    getById(gameRoomId){
        return gameRoomRepository.getById(gameRoomId);
    }

    leave(playerId){
        let player = playerRepository.getById(playerId);
        if(!player)
            throw new Error("Player not found");
        else if(!player.gameRoomId)
            throw new Error("Player is not in a room");
        else{
            let gameRoom = gameRoomRepository.getById(player.gameRoomId);

            //Search and remove the player from the room list
            ArrayHelper.Remove(gameRoom.players, "id", player.id);

            if(gameRoom.players.length > 0)
                gameRoomRepository.update(gameRoom);
            else
                gameRoomRepository.delete(gameRoom.id); //If the room is empty, then remove it

            player.gameRoomId = null;
            playerRepository.update(player);

            this.clearGame(gameRoom.id);

            socketController.post(gameRoom.id, Actions.PlayerLeft, { gameRoomId: gameRoom.id, playerId: player.id })
        }
    }
}

exports.GameRoomService = GameRoomService;