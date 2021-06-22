import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Dialog, DialogTitle } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  loadingDialog: {
    textAlign: "center"
  }
});

export default function OverlayWaitingPlayers(props: OverlayWaitingPlayersProps){
  const classes = useStyles();

  return (
    <Dialog open={!props.gameIsReady}>
        <DialogTitle className={classes.loadingDialog}>
            <p>Waiting to other players to join in...</p>
            <CircularProgress />
            <div>
              <Button onClick={() => props.onLogout()} variant="contained" color="secondary">Leave game</Button>
            </div>
        </DialogTitle>
    </Dialog>
  )
}

export interface OverlayWaitingPlayersProps {   
    gameIsReady: boolean,
    onLogout: () => void,
}
