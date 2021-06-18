import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Deck from 'components/Deck/Deck';
import ICard from 'models/ICard'

const useStyles = makeStyles({
  root: {
    background: 'radial-gradient(circle, rgba(60,154,87,1) 0%, rgba(41,119,57,1) 100%)',
    width: 1000,
    height: 600,
    borderRadius: 300,
    border: 'solid 10px #7a4400',
    boxShadow: '0 7px 0px 2px rgb(92 52 2)',
    color: 'white',
    padding: '0 30px',
    margin: "0 auto",
    marginTop: 50,
  },
  my_hand_interface: {
    position: 'absolute',
    bottom: 0,
    left: 0
  }
});

export default function Table(props: TableProps){
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Deck 
        cards={props.cardsAtDeck}
      />
    </Box>
  )
}

export interface TableProps {
  cardsAtDeck: Array<ICard>
}