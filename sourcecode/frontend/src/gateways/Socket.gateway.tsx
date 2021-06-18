import IGameRoom from 'models/IGameRoom';
import IPlayer from 'models/IPlayer';
import config from 'config.json';
import io from "socket.io-client"

const baseUrl = `${config.SocketBaseUrl}`

type SocketGatewayPlayerJoinedHandler = (gameRoom: IGameRoom) => void;
type SocketGatewayGameStartedHandler = (gameRoom: IGameRoom) => void;

export default class SocketGateway {
    onPlayerJoined: SocketGatewayPlayerJoinedHandler | null = null;
    onGameStarted: SocketGatewayGameStartedHandler | null = null;

    async connect(player: IPlayer){
        return new Promise((resolve, reject) => {
            const socket = io(baseUrl, {query: {playerId: player!.id}});
            socket.on('connect', () => {
                resolve(null);
            });
            socket.on("player_joined", (data: any) => {
                if(this.onPlayerJoined)
                    this.onPlayerJoined(data)
            });
            socket.on("game_started", (data: any) => {
                if(this.onGameStarted)
                    this.onGameStarted(data)
            });
        })
    }

    
}

    