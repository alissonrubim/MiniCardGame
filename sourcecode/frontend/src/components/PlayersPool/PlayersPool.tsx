import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {ConvertServerCard} from 'helpers/DeckHelpers';

import Card from 'components/Card/Card'

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

  console.info(props.players)

  function renderPlayerStop(player: IPlayer){
    return (
      <Box>
        {player.hand.map((card) => {
          return <Card 
            card={ConvertServerCard(card)}
            isFlipped={true}
            scale={0.4}
          />
        })}
        {player.name}
      </Box>
    )
  }

  return (
    <Box className={classes.root}>
      {props.players.filter(x => x.id != props.player.id).map((p) => {
          //return renderPlayerStop(p);
      })}
    </Box>
  )
}

export interface PlayersPoolProps {   
    player: IPlayer,
    players: Array<IPlayer>,
}