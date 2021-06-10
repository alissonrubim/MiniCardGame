import { ReactElement } from 'react';
import IDeck from 'models/IDeck';

export default interface ISuit {
    deck: IDeck;
    identifier: string;
    color: string;
    renderIcon: () => ReactElement
}