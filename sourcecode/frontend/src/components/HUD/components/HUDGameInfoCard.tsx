import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, Card, Snackbar, Slide, Divider } from '@material-ui/core';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import {GetCurrentMatch} from 'helpers/GameRoomHelper';

import IGameRoom from 'models/IGameRoom'
import IPlayer from 'models/IPlayer'
import IRound from 'models/IRound';
import IMatch from 'models/IMatch';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 20,
    minWidth: 200
  },
  logoutButtonHUD: {
    marginTop: 20,
    textAlign: "center"
  },
  itemLine: {
    marginTop: 5,
    marginBottom: 5
  },
  fullStarWon: {
    color: "#f7ac14e0"
  },
  fullStarLose: {
    color: "#a1a1a1"
  },
  emptyStar: {
    color: "#c2c2c2"
  }
});

export default function HUDGameInfoCard(props: HUDGameInfoCardProps){
  const classes = useStyles();
  let currentMatch = GetCurrentMatch(props.gameRoom);

  function renderStars(starts: Array<number>){
    let startsEl = Array<JSX.Element>();
    starts.forEach((start) => {
      if(start == 1)
        startsEl.push(<AiFillStar className={classes.fullStarWon}/>)
      else if(start == -1)
        startsEl.push(<AiFillStar className={classes.fullStarLose}/>)
      else
        startsEl.push(<AiOutlineStar className={classes.emptyStar}/>)
    })

    return startsEl;
  }

  function getStarsArray(array: Array<IRound | IMatch>, maxQuantity: number): Array<number>{
    let result = new Array<number>();
    array.forEach((item) => {
      if(item.winnerPlayerId){
        if(item.winnerPlayerId == props.player.id)
          result.push(1)
        else 
          result.push(-1)
      }
    });
 
    for(var i=result.length; i<maxQuantity; i++){
      result.push(0)
    }

    return result;
  }
  

  return (
    <Card className={classes.root}>
        <Box className={classes.itemLine}><b>Player:</b> {props.player.name}</Box>
        <Divider />
        <Box className={classes.itemLine}>Rounds: {renderStars(getStarsArray(currentMatch ? currentMatch.rounds : [], 3))}</Box>
        <Divider />
        <Box className={classes.itemLine}>Matches: {renderStars(getStarsArray(props.gameRoom.matches ? props.gameRoom.matches : [], 5))}</Box>
        <Box className={classes.logoutButtonHUD}>
          <Button onClick={() => props.onLogout()} variant="contained" color="secondary">Leave game</Button>
        </Box>
    </Card>
  )
}

export interface HUDGameInfoCardProps {   
    player: IPlayer,
    gameRoom: IGameRoom,
    onLogout: () => void,
}