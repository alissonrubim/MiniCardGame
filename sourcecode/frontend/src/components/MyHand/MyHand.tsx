import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Card from 'components/Card/Card';
import ICard from 'models/ICard';
import IPlayer from 'models/IPlayer';
import StyleSizes from 'StyleSizes';


const useStyles = makeStyles({
  root: {
    position: "absolute",
    bottom: 0
  },
  card_container: {
    position: 'absolute',
    bottom: -40,
    transition: 'bottom 0.3s',
  },
  card_container_my_turn: {
    position: 'absolute',
    bottom: 0,
    '&:hover': {
      bottom: 5
    }
  },
  card_highlight: {
    marginTop: -500,
  }
});

export default function MyHand(props: MyHandProps){
  const classes = useStyles();
  const scale = 1.2;
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
    });
  }, []);
  
  let root_styles = {
    left: width/2 - (props.player.hand.length * (StyleSizes.Card.root.width*scale)/2)/2
  }

  let cardClass = classes.card_container;
  if(props.isMyTurn)
    cardClass = classes.card_container_my_turn;

  return (
    <Box className={classes.root} style={root_styles} >
      {props.player.hand.map((card, cardIndex) => 
        <div className={cardClass} style={{
            left: (StyleSizes.Card.root.width*scale/2)*cardIndex,
            cursor: props.isMyTurn ? "pointer" : "no-drop"
          }}>
          <Card 
            style={{
              boxShadow: "rgb(0 0 0 / 38%) 0px 0px 32px"
            }}
            card={card}
            scale={scale}
            isFlipped={false}
            onClick={props.onCardClick}
          />
        </div>
      )}
    </Box>
  )
}

export interface MyHandProps {
  player: IPlayer,
  isMyTurn: boolean,
  onCardClick: (card: ICard) => void
}