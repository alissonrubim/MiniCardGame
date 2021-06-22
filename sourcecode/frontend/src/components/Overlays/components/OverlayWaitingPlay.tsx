import { Snackbar, Slide } from '@material-ui/core';

import IPlayer from 'models/IPlayer'

export default function OverlayWaitingPlay(props: OverlayWaitingPlayProps){  
  function snackBarTransitionUp(props: any) {
    return <Slide {...props} direction="up" />;
  }

  return (
    <Snackbar
      open={props.gameIsReady && !props.gameWinnerPlayer && !props.isMyTurn}
      TransitionComponent={snackBarTransitionUp}
      message="Waiting another player to play"
      key="up"
    />
  )
}

export interface OverlayWaitingPlayProps {   
  gameWinnerPlayer: IPlayer | null,
  isMyTurn: boolean,
  gameIsReady: boolean
}
