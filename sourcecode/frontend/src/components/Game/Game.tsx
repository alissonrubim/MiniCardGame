import React, { useState, useEffect } from 'react';
import { GiSpades, GiDiamonds, GiHearts, GiClubs } from 'react-icons/gi';
import Table from 'components/Table/Table';
import IDeck from 'models/IDeck';
import ICard from 'models/ICard';
import ISuit from 'models/ISuit';
import IGameRoom from 'models/IGameRoom';
import IPlayer from 'models/IPlayer';
import { Button } from '@material-ui/core';
import GameRoomGateway from 'gateways/GameRoom.gateway';
import SocketGateway from 'gateways/Socket.gateway';

function ConvertServerDeck(serverDeck: Array<ICard>): Array<ICard> {
  let decks = new Array<IDeck>();
  decks.push({
    id: 'R',
    color: '#e55e5e'
  });
  decks.push({
    id: 'B',
    color: '#659edb'
  })

  let suits = new Array<ISuit>();
  decks.forEach((deck) => {
    suits.push({
      deck: deck,
      id: 'H',
      color: "red",
      renderIcon: () => <GiHearts />
    });
    suits.push({
      deck: deck,
      id: 'S',
      color: "black",
      renderIcon: () => <GiSpades />
    });
    suits.push({
      deck: deck,
      id: 'D',
      color: "red",
      renderIcon: () => <GiDiamonds />
    });
    suits.push({
      deck: deck,
      id: 'C',
      color: "black",
      renderIcon: () => <GiClubs />
    });
  });
  
  function getSuitById(suitId: string): ISuit | null{
    let suit = null;
    suits.forEach((s) => {
      if(s.id === suitId){
        suit = s;
        return;
      }
    })
    return suit;
  }

  let gameDeck = new Array<ICard>();

  serverDeck.forEach((serverCard) => {
    //extract the infor from the card id
    let deckId = serverCard.id.split(':')[0];
    let suitId = serverCard.id.split(':')[1];
    let cardName = serverCard.id.split(':')[2];

    gameDeck.push({
      id: serverCard.id,
      value: serverCard.value,
      name: cardName,
      suit: getSuitById(suitId)!
    });
  })

  return gameDeck;
}

export default function Game(props: GameProps){
  const gameRoomGateway = new GameRoomGateway();
  const socketGateWay = new SocketGateway();
  const [gameRoom, setGameRoom] = React.useState(props.gameRoom);

  useEffect(() => {
    socketGateWay.onPlayerJoined = (data: any) => {
      gameRoomGateway.get(gameRoom!.id).then((data) => {
        setGameRoom(data);
      })
    }
    socketGateWay.onGameStarted = (data: any) => {
      gameRoomGateway.drawCard(gameRoom!.id, props.player.id).then((data) => {

      })
    }
    socketGateWay.connect(props.player);
  }, []);

  var myHandCards = Array<ICard>();
  //myHandCards.push(drawCard());
  //myHandCards.push(drawCard());
  //myHandCards.push(drawCard());

  if(gameRoom.players.length == 1)
    return <>Waiting other player to enter the room</>

  return (<>
      <Button onClick={() => props.onLogout()}>Leave</Button>
      <Table 
        cardsAtDeck={ConvertServerDeck(gameRoom.deck)}  
        cardsAtHand={myHandCards}  
      />
    </>)
}

export interface GameProps {
  player: IPlayer,
  gameRoom: IGameRoom,
  onLogout: () => void
}