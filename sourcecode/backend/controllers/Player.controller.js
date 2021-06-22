
const { PlayerService } = require("../services/Player.service");
const { HandleException } = require("../helpers/Exceptions");

const playerService = new PlayerService();

class PlayerController {
    constructor(app){
        app.route('/player')
            .post([this.post])
        
        app.route('/player/all')
            .get([this.getAll]);
        
        app.route('/player/:id')
            .get([this.get])
    }

    post(request, response){
        try {
            response.status(200).send(playerService.create(request.body.name));
        } catch (error) {
            HandleException(response, error);  
        }
    }

    getAll(request, response) {
        response.status(200).send(playerService.getAll());
    }

    get(request, response){
        let player = playerService.getById(request.params.id);
        if(player)
            response.status(200).send(player);
        else
            response.status(404).send();
    }
}

exports.PlayerController = PlayerController;