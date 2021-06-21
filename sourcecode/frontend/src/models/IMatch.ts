import IRound from './IRound';

export default interface IMatch {
    id: string;
    rounds: Array<IRound>;
    winnerPlayerId: number | null;
}