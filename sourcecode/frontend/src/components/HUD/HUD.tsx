import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, Card, Snackbar, Slide, Divider } from '@material-ui/core';
import { Dialog, DialogTitle } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import config from 'config.json'

import GameInfoCard from './components/GameInfoCard'
import DebugCard from './components/DebugCard'

import IGameRoom from 'models/IGameRoom'
import IPlayer from 'models/IPlayer'

const useStyles = makeStyles({
  loadingDialog: {
    textAlign: "center"
  },
  logoutButtonHUD: {
    marginTop: 20,
    textAlign: "center"
  },
  itemLine: {
    marginTop: 5,
    marginBottom: 5
  }
});

export default function HUD(props: HUDProps){
  const classes = useStyles();

  function logoutButton(){
    return (<Button onClick={() => props.onLogout()} variant="contained" color="secondary">Leave game</Button>);
  }

  function snackBarTransitionUp(props: any) {
    return <Slide {...props} direction="up" />;
  }

  return (
    <Box>
        {/* Dialogs and warning elements  */}
        <Dialog open={!props.gameIsReady}>
            <DialogTitle className={classes.loadingDialog}>
                <p>Waiting to other players to join in...</p>
                <CircularProgress />
                <div>
                    {logoutButton()}
                </div>
            </DialogTitle>
        </Dialog>
        <Snackbar
          open={props.gameIsReady && !props.isMyTurn}
          TransitionComponent={snackBarTransitionUp}
          message="Waiting another player to play"
          key="up"
        
        />

        {/* Game info HUD */}
        <GameInfoCard 
          player={props.player} 
          gameRoom={props.gameRoom}
          onLogout={props.onLogout}
        />
       
        {/* Debug HUD */}
        {config.debug && 
          <DebugCard 
            player={props.player} 
            gameRoom={props.gameRoom}
          />
        }
    </Box>
  )
}

export interface HUDProps {   
    player: IPlayer,
    gameRoom: IGameRoom,
    gameIsReady: boolean,
    isMyTurn: boolean,
    onLogout: () => void,
}