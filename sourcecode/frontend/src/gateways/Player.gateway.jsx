import IPlayer from 'models/IPlayer';

const baseUrl = "http://localhost:3030/player"

export default class PlayerGateway {
    async create(player){
        return new Promise((resolve, reject) => {
            fetch(baseUrl, {
                method: "POST",
                body: JSON.stringify({
                    name: player.name
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

    async get(playerId){
        return new Promise((resolve, reject) => {
            fetch(baseUrl + `/${playerId}`, {
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