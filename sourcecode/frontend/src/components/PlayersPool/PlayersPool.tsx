import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import IPlayer from 'models/IPlayer'

const useStyles = makeStyles({
  root: {
    position: 'relative',
    top: 0,
    left: 0
  }
});

export default function PlayersPool(props: PlayersPoolProps){
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      
    </Box>
  )
}

export interface PlayersPoolProps {   
    player: IPlayer,
    players: Array<IPlayer>,
}