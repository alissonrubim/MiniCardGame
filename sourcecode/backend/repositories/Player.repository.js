var players = []; 

class PlayerRepository {
    insert(player) {
        players.push(player);
    }

    update(player){
        let playerDto = this.getById(player.id);
        playerDto.name = player.name;
        playerDto.hand = player.hand;
        playerDto.gameRoomId = player.gameRoomId;
    }

    getAll(){
        return players;
    }

    getById(id){
        let player = null;
        players.map((p) => {
            if(p.id === id){
                player = p;
                return;
            }
        })
        return player;
    }
}
exports.PlayerRepository = PlayerRepository;