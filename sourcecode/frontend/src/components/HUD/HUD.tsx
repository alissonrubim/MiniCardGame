import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, Card, Snackbar, Slide } from '@material-ui/core';
import { Dialog, DialogTitle } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import IGameRoom from 'models/IGameRoom'
import IPlayer from 'models/IPlayer'

const useStyles = makeStyles({
  bottomRight: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 20,
    minWidth: 200
  },
  bottomLeft: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    padding: 20,
  },
  loadingDialog: {
    textAlign: "center"
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
          message="Waiting other player to play"
          key="up"
        />
        <Card className={classes.bottomRight}>
            <div>{props.player.name}</div>
            <div>Rounds: 0</div>
            {logoutButton()}
        </Card>
        <Card className={classes.bottomLeft}>
            <div>DEBUGGER</div>
            <div>PlayerId: {props.player.id}</div>
            <div>GameRoomId: {props.gameRoom.id}</div>
        </Card>
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