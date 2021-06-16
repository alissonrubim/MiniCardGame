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
}
exports.GameRoomRepository = GameRoomRepository;