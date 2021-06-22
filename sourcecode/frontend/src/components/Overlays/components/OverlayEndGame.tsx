import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Dialog, DialogTitle } from '@material-ui/core';
import { FaTrophy, FaSadCry } from 'react-icons/fa';

import IPlayer from 'models/IPlayer'

const useStyles = makeStyles({
  dialog: {
    textAlign: "center"
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#525252"
  },
  trophyIcon: {
    color: '#ffa326',
    fontSize: 110
  },
  cryIcon: {
    color: '#525252',
    fontSize: 110
  }
});

export default function OverlayEndGame(props: OverlayEndGameProps){
  const classes = useStyles();

  return (<>
    <Dialog open={props.gameWinnerPlayer != null && props.gameWinnerPlayer.id == props.player.id}>
        <DialogTitle className={classes.dialog}>
            <div className={classes.title}>YOU WON!</div>
            <FaTrophy className={classes.trophyIcon}/>
            <div>
              <Button onClick={() => props.onLogout()} variant="contained" color="secondary">Leave game</Button>
            </div>
        </DialogTitle>
    </Dialog>
    <Dialog open={props.gameWinnerPlayer != null && props.gameWinnerPlayer.id != props.player.id}>
      <DialogTitle className={classes.dialog}>
          <div className={classes.title}>YOU LOSE!</div>
          <FaSadCry className={classes.cryIcon}/>
          <div>
            <Button onClick={() => props.onLogout()} variant="contained" color="secondary">Leave game</Button>
          </div>
      </DialogTitle>
  </Dialog>
  </>)
}

export interface OverlayEndGameProps {   
  gameWinnerPlayer: IPlayer | null,
  player: IPlayer,
  onLogout: () => void,
}
