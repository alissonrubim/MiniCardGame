import OverlayWaitingPlay from './components/OverlayWaitingPlay';
import OverlayWaitingPlayers from './components/OverlayWaitingPlayers';
import OverlayEndGame from './components/OverlayEndGame';

import IPlayer from 'models/IPlayer';

export default function Overlays(props: OverlaysProps){  
  return (<>
    <OverlayWaitingPlay 
        gameWinnerPlayer={props.gameWinnerPlayer}
        gameIsReady={props.gameIsReady}
        isMyTurn={props.isMyTurn}
    />
    <OverlayWaitingPlayers 
        gameIsReady={props.gameIsReady}
        onLogout={props.onLogout}
    />
    <OverlayEndGame
        gameWinnerPlayer={props.gameWinnerPlayer}
        player={props.player}
        onLogout={props.onLogout}
    />
  </>)
}

export interface OverlaysProps {   
  isMyTurn: boolean,
  gameIsReady: boolean,
  gameWinnerPlayer: IPlayer  | null,
  player: IPlayer,
  onLogout: () => void,
}
