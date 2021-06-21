import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Card from 'components/Card/Card';
import ICard from 'models/ICard'
import StyleSizes from 'StyleSizes';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    left: 650,
    top: 120
  },
});

export default function DeacDeck(props: DeacDeckProps){
  const classes = useStyles();
  const maxShowingCardsCount = 10;
  const scale = 0.7;
  let showingCardsCount = props.cards.length > maxShowingCardsCount ? maxShowingCardsCount : props.cards.length;

  let cards = [];
  for(var i=props.cards.length - showingCardsCount; i<props.cards.length; i++)
    cards.push(props.cards[i]);

  function getRotationAngle(card: ICard){
    let direction = card.id.split(":")[0] == "R" ? 1 : -1;
    let angle = card.id.split(":")[1].charCodeAt(0);
    angle += card.id.split(":")[2].charCodeAt(0);
    console.info(angle);
    console.info(card);
    return angle * direction;
  }

  return (
    <Box className={classes.root}>
      {cards.map((card, cardIndex) => 
        <div style={{
          marginTop: (cardIndex > 0 ? (StyleSizes.Card.root.height*scale*-1) - 0.5 : 0),
          width: StyleSizes.Card.root.height*scale,
          transform: `rotateZ(${getRotationAngle(card)}deg)` 
        }}>
          <Card 
            card={card}
            scale={scale}
            isFlipped={false}
          />
        </div>
      )}
    </Box>
  )
}

export interface DeacDeckProps {
  cards: Array<ICard>
}