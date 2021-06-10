import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Card from 'components/Card/Card';
import ICard from 'models/ICard'
import StyleSizes from 'StyleSizes';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    left: 450,
    top: 190
  },
});

export default function Deck(props: DeckProps){
  const classes = useStyles();
  const maxShowingCardsCount = 10;
  const scale = 0.7;
  let showingCardsCount = props.cards.length > maxShowingCardsCount ? maxShowingCardsCount : props.cards.length;

  let cards = [];
  for(var i=props.cards.length - showingCardsCount; i<props.cards.length; i++)
    cards.push(props.cards[i]);

  return (
    <Box className={classes.root}>
      {cards.map((card, cardIndex) => 
        <div style={{
          marginTop: (cardIndex > 0 ? (StyleSizes.Card.root.height*scale*-1) - 0.5 : 0),
          width: StyleSizes.Card.root.height*scale
        }}>
          <Card 
            card={card}
            scale={scale}
            isFlipped={true}
          />
        </div>
      )}
    </Box>
  )
}

export interface DeckProps {
  cards: Array<ICard>
}