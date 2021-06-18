import IGameRoom from 'models/IGameRoom';
import IPlayer from 'models/IPlayer';
import config from 'config.json';
import io from "socket.io-client"

const baseUrl = `${config.SocketBaseUrl}`

type SocketGatewayEventArgsHandler = (data: any) => void;
type SocketGatewayEventHandler = () => void;

export default class SocketGateway {
    onPlayerJoined: SocketGatewayEventArgsHandler | null = null;
    onPlayerLeft:  SocketGatewayEventArgsHandler | null = null;
    onGameStarted: SocketGatewayEventArgsHandler | null = null;
    onDisconnect: SocketGatewayEventHandler | null = null;

    async connect(player: IPlayer){
        return new Promise((resolve, reject) => {
            const socket = io(baseUrl, {query: {playerId: player!.id}});
            socket.on('connect', () => {
                resolve(null);
            });
            socket.on('diconnect', () => {
                if(this.onDisconnect)
                    this.onDisconnect();
            })
            socket.on("player_joined", (data: any) => {
                if(this.onPlayerJoined)
                    this.onPlayerJoined(data)
            });
            socket.on("player_left", (data: any) => {
                console.info("dasdadasdasd")
                if(this.onPlayerLeft)
                    this.onPlayerLeft(data)
            });
            socket.on("game_started", (data: any) => {
                if(this.onGameStarted)
                    this.onGameStarted(data)
            });
        })
    }

    
}

    