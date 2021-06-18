var rooms = []; 

class GameRoomRepository {
    insert(room) {
        rooms.push(room);
    }

    update(room){
        let roomDto = this.getById(room.id);
        roomDto.players = room.players;
        roomDto.deck = room.deck;
    }

    delete(roomId){
        var index = 0;
        rooms.forEach((p, pi) => {
            if(p.id == roomId)
                index = pi;
        })
        rooms.splice(index, 1);
    }

    getAll(){
        return rooms;
    }

    getAvailable(){
        let room = null;
        rooms.map((p) => {
            if(p.players.length < 2){
                room = p;
                return;
            }
        })
        return room;
    }

    getById(id){
        let room = null;
        rooms.map((p) => {
            if(p.id === id){
                room = p;
                return;
            }
        })
        return room;
    }

    drawCard(id){
        console.info(id)
        let gameRoom = this.getById(id);
        console.info(gameRoom)
        var card = gameRoom.deck.pop;
        this.update(room);
        return card;
    }
}
exports.GameRoomRepository = GameRoomRepository;