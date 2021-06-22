import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {ConvertServerCard} from 'helpers/DeckHelpers';
import StyleSizes from 'StyleSizes';

import Card from 'components/Card/Card'

import IPlayer from 'models/IPlayer'


const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 35,
    left: 0
  },
  card_container: {
    position: 'absolute',
  },
  playerName: {
    position: 'absolute',
    top: 0,
    left: 270
  }
});

export default function PlayersPool(props: PlayersPoolProps){
  const scale = 0.5;
  const classes = useStyles();

  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
    });
  }, []);
  
  let root_styles = {
    left: width/2 - (3 * (StyleSizes.Card.root.width*scale))/2
  }

  function renderPlayerStop(player: IPlayer){
    return (
      <Box className={classes.root} style={root_styles}>
        {player.hand.map((card, cardIndex) => {
          return (
            <div className={classes.card_container} style={{
              top: 0,
              left: (StyleSizes.Card.root.width*scale) * cardIndex + (10*cardIndex)
            }}>
              <Card 
                card={ConvertServerCard(card)}
                isFlipped={true}
                scale={scale}
                style={{
                  boxShadow: "#0000004a 0px 0px 3px"
                }}
              />
            </div>
          )
         })}
        <Box className={classes.playerName}><b>Player</b>: {player.name}</Box>
      </Box>
    )
  }

  return (
    <Box className={classes.root}>
      {props.players.filter(x => x.id != props.player.id).map((p) => {
          return renderPlayerStop(p);
      })}
    </Box>
  )
}

export interface PlayersPoolProps {   
    player: IPlayer,
    players: Array<IPlayer>,
}