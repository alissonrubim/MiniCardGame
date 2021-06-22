import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Deck from 'components/Deck/Deck';
import DeadDeck  from 'components/DeadDeck/DeadDeck';
import PlayersPool from 'components/PlayersPool/PlayersPool';

import IPlayer from 'models/IPlayer'
import IGameRoom from 'models/IGameRoom'
import ICard from 'models/ICard'

import {ConvertServerCard} from 'helpers/DeckHelpers'

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

  function getPileCards(gameRoom: IGameRoom): Array<ICard>{
    var cards = Array<ICard>();
    gameRoom.matches.forEach((match) => {
      match.rounds.forEach((round) => {
        round.plays.forEach((play) => {
          cards.push(ConvertServerCard({
            id: play.card.id,
            value: play.card.value,
          }))
        });
      });
    });
    return cards;
  }

  return (
    <Box className={classes.root}>
      <PlayersPool 
        player={props.player}
        players={props.gameRoom.players}
      />
      <Deck 
        cards={props.gameRoom.deck}
      />
      <DeadDeck
        cards={getPileCards(props.gameRoom)}
      />
    </Box>
  )
}

export interface TableProps {
  player: IPlayer,
  gameRoom: IGameRoom
}