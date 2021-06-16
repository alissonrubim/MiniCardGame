import React, { useState, useEffect } from 'react';
import { GiSpades, GiDiamonds, GiHearts, GiClubs } from 'react-icons/gi';
import socketIOClient from "socket.io-client"
import Table from 'components/Table/Table';
import IDeck from 'models/IDeck';
import ICard from 'models/ICard';
import ISuit from 'models/ISuit';
import IGameRoom from 'models/IGameRoom';
import { Button } from '@material-ui/core';
import GameRoomGateway from 'gateways/GameRoom.gateway';

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
  const [gameRoom, setGameRoom] = React.useState(props.gameRoom);

  useEffect(() => {
    const socket = socketIOClient("http://localhost:3031");
    socket.on('connect', () => {
      console.log('Successfully connected!');
    });
    socket.on("player_joined", data => {
      gameRoomGateway.get(gameRoom.id).then((data) => {
        setGameRoom(data);
      })
    });
    socket.connect();
  }, []);

  /*function drawCard(): ICard {
    let card = gameDeck.pop();
    if(card == null)
      throw new Error("You can't draw from a empty deck");
    return card;
  }*/

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
  gameRoom: IGameRoom,
  onLogout: () => void
}