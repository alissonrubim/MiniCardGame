const { PlayerController } = require('./controllers/Player.controller')
const { GameRoomController } = require('./controllers/GameRoom.controller')


exports.register = (app) => {
    new PlayerController(app);
    new GameRoomController(app);
}