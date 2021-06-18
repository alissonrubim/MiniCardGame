const { PlayerModel } = require("../models/Player.model");
const { PlayerRepository } = require("../repositories/Player.repository");
const IdGenerator = require("../helpers/IdGenerator");

const playerRepository = new PlayerRepository();

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
        if(!request.body.name)
            response.status(400).send("Username must have a value.");
        else{
            let player = new PlayerModel(IdGenerator.newId(), request.body.name);
            playerRepository.insert(player);
            response.status(201).send(player);
        }
    }

    getAll(request, response) {
        response.status(200).send(playerRepository.getAll());
    }

    get(request, response){
        let player = playerRepository.getById(request.params.id);
        if(player)
            response.status(200).send(player);
        else
            response.status(404).send();
    }
}

exports.PlayerController = PlayerController;