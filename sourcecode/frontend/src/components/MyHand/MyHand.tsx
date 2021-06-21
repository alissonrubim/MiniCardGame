import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Card from 'components/Card/Card';
import ICard from 'models/ICard';
import IPlayer from 'models/IPlayer';
import StyleSizes from 'StyleSizes';
import classNames from 'classnames';



const useStyles = makeStyles({
  root: {
    position: "absolute",
    bottom: 0
  },
  card_container: {
    position: 'absolute',
    transition: 'bottom 0.8s',
    '&:hover': {
      bottom: 50
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


  return (
    <Box className={classes.root} style={root_styles} >
      {props.player.hand.map((card, cardIndex) => 
        <div className={classes.card_container} style={{
            bottom: 0,
            left: (StyleSizes.Card.root.width*scale/2)*cardIndex,
            cursor: props.isMyTurn ? "pointer" : "default"
          }}>
          <Card 
            card={card}
            scale={scale}
            isFlipped={false}
            shadowLeft={true}
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