import IGameRoom from 'models/IGameRoom';
import ICard from 'models/ICard';
import config from 'config.json';
import { ConvertServerDeck, ConvertServerCard } from 'helpers/DeckHelpers';

const baseUrl = `${config.ApiBaseUrl}/gameroom`

export default class GameRoomGateway {
    async join(playerId: string){
        return new Promise<IGameRoom>((resolve, reject) => {
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
                    resp.json().then((data) => {
                        let gameRoom = data;
                        gameRoom.deck = ConvertServerDeck(gameRoom.deck);
                        resolve(gameRoom)
                    });
                else
                    reject();
            })
        })
    }

    async leave(playerId: string){
        return new Promise((resolve, reject) => {
            fetch(baseUrl + '/leave', {
                method: "POST",
                body: JSON.stringify({
                    playerId: playerId
                }),
                headers: {
                  'Content-type': 'application/json',
                }
            }).then((resp) => {
                if(resp.ok)
                    resolve(null);
                else
                    reject();
            })
        })
    }

    async get(gameRoomId: string){
        return new Promise<IGameRoom>((resolve, reject) => {
            fetch(baseUrl + `/${gameRoomId}`, {
                method: "GET"
            }).then((resp) => {
                if(resp.ok)
                    resp.json().then((data) => {
                        let gameRoom = data;
                        gameRoom.deck = ConvertServerDeck(gameRoom.deck);
                        resolve(gameRoom)
                    });
                else
                    reject();
            })
        })
    }

    async drawCard(gameRoomId: string, playerId: string){
        return new Promise<ICard>((resolve, reject) => {
            fetch(baseUrl + `/${gameRoomId}/drawcard`, {
                method: "POST",
                body: JSON.stringify({
                    playerId: playerId
                }),
                headers: {
                  'Content-type': 'application/json',
                }
            }).then((resp) => {
                if(resp.ok)
                    resp.json().then((data) => {
                        resolve(ConvertServerCard(data))
                    });
                else
                    reject();
            })
        })
    }

    async playCard(gameRoomId: string, playerId: string, cardId: string){
        return new Promise((resolve, reject) => {
            fetch(baseUrl + `/${gameRoomId}/playcard`, {
                method: "POST",
                body: JSON.stringify({
                    playerId: playerId,
                    cardId: cardId
                }),
                headers: {
                  'Content-type': 'application/json',
                }
            }).then((resp) => {
                if(resp.ok)
                    resp.json().then((data) => {
                        resolve(null)
                    });
                else
                    reject();
            })
        })
    }
}