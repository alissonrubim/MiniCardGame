import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, Slide } from '@material-ui/core';
import { AiFillStar } from 'react-icons/ai';

import IPlayer from 'models/IPlayer'

const useStyles = makeStyles({
  wonSnackBar: {
    backgroundColor: "white",
    color: "#464545"
  },
  iconStar: {
    color: '#ffa326',
    fontSize: 25,
    float: "left"
  },
  winnerMessage: {
    padding: -20,
    float: "right",
    paddingTop: 2,
    paddingLeft: 10
  }
});

export default function OverlayEndMatch(props: OverlayEndMatchProps){
  const classes = useStyles();
  const [matchWinnerPlayer, setMatchWinnerPlayer] = React.useState<IPlayer | null>(props.matchWinnerPlayer);

  React.useEffect(() => {
    if(props.matchWinnerPlayer != null)
      setMatchWinnerPlayer(props.matchWinnerPlayer)
  }, [props.matchWinnerPlayer])

  function handleClose(){
    setMatchWinnerPlayer(null); 
  }

  function getWinnerMessage(){
    return <>
      <AiFillStar className={classes.iconStar}/> 
      <div className={classes.winnerMessage}>You won this macth!</div>
    </>
  }

  return (<>
    <Snackbar 
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={matchWinnerPlayer != null && matchWinnerPlayer.id == props.player.id}
        autoHideDuration={5000}
        onClose={() =>  handleClose()}
        TransitionComponent={(props) => <Slide {...props} direction="left" />}
        ContentProps={{
          className: classes.wonSnackBar
        }}
        message={getWinnerMessage()}
    />
     <Snackbar 
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={matchWinnerPlayer != null && matchWinnerPlayer.id != props.player.id}
        autoHideDuration={5000}
        TransitionComponent={(props) => <Slide {...props} direction="left" />}
        onClose={() =>  handleClose()}
        message={"You lost this macth!"}
    />
  </>)
}

export interface OverlayEndMatchProps {   
  matchWinnerPlayer: IPlayer | null,
  player: IPlayer,
}
