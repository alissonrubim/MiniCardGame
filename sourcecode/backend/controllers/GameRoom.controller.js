const {GameRoomService} = require("../services/Game.Room.service")
const gameRoomService = new GameRoomService();

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

        app.route('/gameroom/:id/playcard')
            .post([this.postPlayCard]);
    }

    postJoin(request, response){
        try {
            response.status(200).send(gameRoomService.join(request.body.playerId));
        } catch (error) {
            console.info(error)
            response.status(400).send(error)
        }
    }

    postLeave(request, response){
        try {
            gameRoomService.leave(request.body.playerId)
            response.status(200).send();
        } catch (error) {
            console.info(error)
            response.status(400).send(error)
        }
    }

    get(request, response){
        let gameRoom = gameRoomService.getById(request.params.id);
        if(gameRoom)
            response.status(200).send(gameRoom);
        else
            response.status(404).send();
    }

    postDrawCard(request, response){
        try {
            response.status(200).send(gameRoomService.drawCard(request.params.id, request.body.playerId));
        } catch (error) {
            console.info(error)
            response.status(400).send(error)
        }
    }

    postPlayCard(request, response){
        try {
            response.status(200).send(gameRoomService.playCard(request.params.id, request.body.playerId, request.body.cardId));
        } catch (error) {
            console.info(error)
            response.status(400).send(error)
        }
    }    
}

exports.GameRoomController = GameRoomController;