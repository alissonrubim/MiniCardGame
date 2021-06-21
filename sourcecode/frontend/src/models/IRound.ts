import IPlay from './IPlay';

export default interface IRound {
    id: string;
    plays: Array<IPlay>;
}