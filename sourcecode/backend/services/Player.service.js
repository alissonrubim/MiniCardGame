const IdGenerator = require("../helpers/IdGenerator");
const { PlayerModel } = require("../models/Player.model");
const { PlayerRepository } = require("../repositories/Player.repository");
const { BadRequestExceptionError } = require('../helpers/Exceptions');

const playerRepository = new PlayerRepository();

class PlayerService {
    create(name){
        if(!name)
            throw new BadRequestExceptionError("Username must have a value");
        else{
            let player = new PlayerModel(IdGenerator.newId(), name);
            playerRepository.insert(player);
            return player;
        }
    }

    getAll(){
        return playerRepository.getAll();
    }

    getById(playerId){
        return playerRepository.getById(playerId);
    }
}

exports.PlayerService = PlayerService;