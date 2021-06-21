import ICard from './ICard';
import IPlayer from './IPlayer';
import IMatch from './IMatch';

export default interface IGameRoom {
    id: string;
    players: Array<IPlayer>;
    deck: Array<ICard>;
    matches: Array<IMatch>;
    gameRoomId: string;
    currentPlayerIdTurn: string;
}