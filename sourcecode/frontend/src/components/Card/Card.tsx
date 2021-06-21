import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import CardFront from './CardFront';
import CardBack from './CardBack';
import ICard from 'models/ICard';

import StyleSizes from 'StyleSizes';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'transparent',
    border: 0,
    borderRadius: 0,
    perspective: 1000,
  },
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.8s',
    transformStyle: 'preserve-3d',
    /*borderBottom: '2px solid #555555',*/
  },
  flip: {
    transform: 'rotateY(180deg)'
  },
  card_face: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
  },
  card_face_front: {
    backgroundColor: 'transparent',
    color: 'black',
  },
  card_face_back: {
    backgroundColor: 'transparent',
    color: 'white',
    transform: 'rotateY(180deg)',
  }
});

export default function Card(props: CardProps){
  const classes = useStyles();
  let isFlipped = props.isFlipped == null ? true : props.isFlipped!;
  let scale = props.scale == null ? 1 : props.scale!;

  let containerClasses = classNames(classes.container);
  if(isFlipped)
    containerClasses =  classNames(classes.container, classes.flip);

  let frontCardClasses = classNames(classes.card_face, classes.card_face_front);
  let backCardClasses = classNames(classes.card_face, classes.card_face_back);

  let rootStyles:any = { width: StyleSizes.Card.root.width*scale, height: StyleSizes.Card.root.height*scale };

  if(props.shadowLeft){
    rootStyles.boxShadow = "-2px 3px 7px -3px #04040459";
  }

  return (
    <Box className={classes.root} style={rootStyles}>
      <Box className={containerClasses}>
        <Box className={frontCardClasses}>
          <CardFront 
            scale={scale}
            label={props.card.name}
            color={props.card.suit.color} 
            renderIcon={props.card.suit.renderIcon}
          />
        </Box>
        <Box className={backCardClasses}>
          <CardBack
            scale={scale}
            color={props.card.suit.deck.color} 
          />
        </Box>
      </Box>
    </Box>
  )
}

export interface CardProps {
  card: ICard,
  scale?: number,
  isFlipped?: boolean,
  shadowLeft?: boolean,
}