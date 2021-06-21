import IPlayer from 'models/IPlayer';
import config from 'config.json';
import { ConvertServerDeck } from 'helpers/DeckHelpers';

const baseUrl = `${config.ApiBaseUrl}/player`

export default class PlayerGateway {
    async create(userName: string){
        return new Promise<IPlayer>((resolve, reject) => {
            fetch(baseUrl, {
                method: "POST",
                body: JSON.stringify({
                    name: userName
                }),
                headers: {
                  'Content-type': 'application/json',
                }
            }).then((resp) => {
                if(resp.ok)
                    resp.json().then((data) => {
                        let player = data;
                        player.hand = ConvertServerDeck(player.hand);
                        resolve(player)
                    });
                else
                    reject();
            })
        })
    }

    async get(playerId: string){
        return new Promise<IPlayer>((resolve, reject) => {
            fetch(baseUrl + `/${playerId}`, {
                method: "GET"
            }).then((resp) => {
                if(resp.ok)
                    resp.json().then((data) => {
                        let player = data;
                        player.hand = ConvertServerDeck(player.hand);
                        resolve(player)
                    });
                else
                    reject();
            })
        })
    }
}