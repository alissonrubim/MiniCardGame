import ISuit from 'models/ISuit';

export default interface ICard {
    value: number;
    name: string;
    suit: ISuit;
}