import ICard from './ICard';

export default interface IPlayer {
    id: string;
    name: string;
    hand: Array<ICard>;
    gameRoomId: string;
}