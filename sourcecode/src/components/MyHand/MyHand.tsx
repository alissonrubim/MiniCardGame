import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Card from 'components/Card/Card';
import ICard from 'models/ICard';
import StyleSizes from 'StyleSizes';
import classNames from 'classnames';

const useStyles = makeStyles({
  root: {
    
  },
  card_container: {
    transition: 'margin-top 0.8s',
  },
  card_highlight: {
    marginTop: -500,
  }
});

export default function MyHand(props: MyHandProps){
  const classes = useStyles();
  const scale = 1;
  const [hoverCard, setHoverCard] = React.useState<ICard>();

  function onMouseHover(card: ICard){
    setHoverCard(card);
  }
  

  let card_container_classes = classNames(classes.card_container);
  let card_container_hightlight = classNames(classes.card_container, classes.card_highlight);

  return (
    <Box className={classes.root}>
      {props.cards.map((card, cardIndex) => 
        <div className={classes.card_container} style={{
          marginTop: (cardIndex > 0 ? (StyleSizes.Card.root.height*scale*-1): -500),
          marginLeft: 60*cardIndex
        }}>
          <Card 
            card={card}
            scale={scale}
            isFlipped={false}
            onMouseHover={onMouseHover}
          />
        </div>
      )}
    </Box>
  )
}

export interface MyHandProps {
  cards: Array<ICard>,
}