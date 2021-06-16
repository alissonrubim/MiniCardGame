import ISuit from 'models/ISuit';

export default interface ICard {
    id: string;
    value: number;
    name: string;
    suit: ISuit;
}