import React, { useState, useEffect } from 'react';
import Table from 'components/Table/Table';
import ICard from 'models/ICard';
import IGameRoom from 'models/IGameRoom';
import IPlayer from 'models/IPlayer';
import { makeStyles } from '@material-ui/core/styles';
import GameRoomGateway from 'gateways/GameRoom.gateway';
import SocketGateway from 'gateways/Socket.gateway';
import MyHand from 'components/MyHand/MyHand';
import { ConvertServerDeck } from 'helpers/DeckHelpers';
import HUD from 'components/HUD/HUD';


const useStyles = makeStyles({
  hud: {
    position: 'absolute',
    bottom: 25,
    left: 0
  }
});

export default function Game(props: GameProps){
  const classes = useStyles();
  const gameRoomGateway = new GameRoomGateway();
  const socketGateWay = new SocketGateway();
  const player = props.player;
  const [gameRoom, setGameRoom] = React.useState(props.gameRoom);
  const [gameIsReady, setGameIsReady] = React.useState(props.gameRoom.players.length == 2);

  function updateGame(){
    gameRoomGateway.get(gameRoom!.id).then((data) => {
      setGameRoom(data);
      setGameIsReady(data.players.length == 2)
    })    
  }

  useEffect(() => {
    socketGateWay.onPlayerJoined = (data: any) => {
      updateGame();
    }
    socketGateWay.onPlayerLeft = (data: any) => {
      updateGame();
    }
    socketGateWay.onGameStarted = (data: any) => {
      gameRoomGateway.drawCard(gameRoom!.id, player.id).then((data) => {

      })
    }
    socketGateWay.onDisconnect = () => {
      props.onLogout();
    }
    socketGateWay.connect(player);
  }, []);

  var myHandCards = Array<ICard>();
  //myHandCards.push(drawCard());
  //myHandCards.push(drawCard());
  //myHandCards.push(drawCard());

  return (<>
    <Table cardsAtDeck={ConvertServerDeck(gameRoom.deck)} />
    <HUD player={player} gameRoom={gameRoom} onLogout={props.onLogout} gameIsReady={gameIsReady}/>
    <MyHand player={player} />
  </>)
}

export interface GameProps {
  player: IPlayer,
  gameRoom: IGameRoom,
  onLogout: () => void
}