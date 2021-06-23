import { Snackbar, Slide } from '@material-ui/core';

import IPlayer from 'models/IPlayer'

export default function OverlayWaitingPlay(props: OverlayWaitingPlayProps){  

  return (
    <Snackbar
      open={props.gameIsReady && !props.gameWinnerPlayer && !props.isMyTurn}
      TransitionComponent={(props) => <Slide {...props} direction="up" />}
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
