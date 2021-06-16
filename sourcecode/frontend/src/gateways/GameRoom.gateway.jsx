import IGameRoom from 'models/IGameRoom';

const baseUrl = "http://localhost:3030/gameroom"

export default class PlayerGateway {
    async join(playerId){
        return new Promise((resolve, reject) => {
            fetch(baseUrl + '/join', {
                method: "POST",
                body: JSON.stringify({
                    playerId: playerId
                }),
                headers: {
                  'Content-type': 'application/json',
                }
            }).then((resp) => {
                if(resp.ok)
                    resp.json().then((data) => resolve(data));
                else
                    reject();
            })
        })
    }

    async get(gameRoomId){
        return new Promise((resolve, reject) => {
            fetch(baseUrl + `/${gameRoomId}`, {
                method: "GET"
            }).then((resp) => {
                if(resp.ok)
                    resp.json().then((data) => resolve(data));
                else
                    reject();
            })
        })
    }
}