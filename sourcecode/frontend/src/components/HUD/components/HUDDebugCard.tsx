import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

import IGameRoom from 'models/IGameRoom'
import IPlayer from 'models/IPlayer'

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    padding: 20,
  },
});

export default function HUDDebugCard(props: HUDDebugCardProps){
  const classes = useStyles();
 
  return (
    <Card className={classes.root}>
        <div>DEBUGGER</div>
        <div>PlayerId: {props.player.id}</div>
        <div>GameRoomId: {props.gameRoom.id}</div>
    </Card>
  )
}

export interface HUDDebugCardProps {   
    player: IPlayer,
    gameRoom: IGameRoom,
}