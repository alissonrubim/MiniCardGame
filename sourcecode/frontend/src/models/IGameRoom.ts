import ICard from './ICard';
import IPlayer from './IPlayer';

export default interface IGameRoom {
    id: string;
    players: Array<IPlayer>;
    deck: Array<ICard>;
    gameRoomId: string;
}