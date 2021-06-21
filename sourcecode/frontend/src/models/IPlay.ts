import ICard from './ICard';

export default interface IPlay {
    id: string;
    playerId: string;
    card: ICard;
}