import React, { useState, useEffect } from 'react';
import Table from 'components/Table/Table';
import ICard from 'models/ICard';
import IGameRoom from 'models/IGameRoom';
import IPlayer from 'models/IPlayer';
import GameRoomGateway from 'gateways/GameRoom.gateway';
import PlayerGateway from 'gateways/Player.gateway';
import SocketGateway from 'gateways/Socket.gateway';
import MyHand from 'components/MyHand/MyHand';
import HUD from 'components/HUD/HUD';
import Overlays from 'components/Overlays/Overlays';

import {GetCurrentMatch} from 'helpers/GameRoomHelper';

import { GetIndex } from 'helpers/ArrayHelper';

export default function Game(props: GameProps){
  const gameRoomGateway = new GameRoomGateway();
  const playerGateway = new PlayerGateway();

  const socketGateWay = new SocketGateway();
  const [player, setPlayer] = React.useState(props.player);
  const [gameRoom, setGameRoom] = React.useState(props.gameRoom);
  const [gameIsReady, setGameIsReady] = React.useState(props.gameRoom.players.length == 2);
  const [isMyTurn, setIsMyTurn] = React.useState(props.gameRoom.currentPlayerIdTurn == player.id);
  const [gameWinnerPlayer, setGammerWinnerPlayer] = React.useState<IPlayer | null>(null);

  function updateGame(){
    gameRoomGateway.get(gameRoom!.id).then((gameRoomData: IGameRoom) => {
      playerGateway.get(player.id).then((playerData: IPlayer) => {
        setPlayer(playerData);

        setGameRoom(gameRoomData);
        setGameIsReady(GetCurrentMatch(gameRoomData) != null);
        setIsMyTurn(gameRoomData.currentPlayerIdTurn == player.id)
      })
    })    
  }

  useEffect(() => {
    socketGateWay.onPlayerJoined = (data: any) => {
      console.info("socketGateWay->onPlayerJoined")
      updateGame();
    }
    socketGateWay.onPlayerLeft = (data: any) => {
      console.info("socketGateWay->onPlayerLeft")
      setGammerWinnerPlayer(null);
      updateGame();
    }
    socketGateWay.onRoundIsOver = (data: any) => {
      console.info("socketGateWay->onRoundIsOver")
      console.info(data)
      updateGame();
    }
    socketGateWay.onMatchIsOver = (data: any) => {
      console.info("socketGateWay->onMatchIsOver")
      updateGame();
    }
    socketGateWay.onPlayerPlayCard = (data: any) => {
      console.info("socketGateWay->onPlayerPlayCard")
      updateGame();
    }
    socketGateWay.onGameEnd = (data: any) => {
      console.info("socketGateWay->onGameEnd")
      updateGame();
      let winnerIndex = GetIndex(gameRoom.players, 'id', data.winnerPlayerId);
      setGammerWinnerPlayer(gameRoom.players[winnerIndex])
    }
    socketGateWay.onDisconnect = () => {
      props.onLogout();
    }
    socketGateWay.onConnect = () => {
      updateGame();
    }
    socketGateWay.connect(player);
  }, []);

  function handleCardClick(card: ICard){
    console.info(card)
    if(isMyTurn){
      gameRoomGateway.playCard(gameRoom.id, player.id, card.id);
    }
  }

  return (<>
    <Table 
      player={player} 
      gameRoom={gameRoom} 
    />
    <HUD 
      player={player} 
      gameRoom={gameRoom} 
      onLogout={props.onLogout} 
      gameIsReady={gameIsReady}      
      isMyTurn={isMyTurn}
    />
    <MyHand 
      player={player} 
      isMyTurn={isMyTurn}
      onCardClick={handleCardClick} 
    />
    <Overlays 
      gameIsReady={gameIsReady}      
      gameWinnerPlayer={gameWinnerPlayer}
      player={player}
      isMyTurn={isMyTurn}
      onLogout={props.onLogout} 
    />
  </>)
}

export interface GameProps {
  player: IPlayer,
  gameRoom: IGameRoom,
  onLogout: () => void
}