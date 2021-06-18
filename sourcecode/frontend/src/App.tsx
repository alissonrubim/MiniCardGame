import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import Theme from 'theme';
import IPlayer from 'models/IPlayer';
import PlayerGateway  from 'gateways/Player.gateway'
import GameGateway from 'gateways/GameRoom.gateway'

import HomePage from './pages/Home/Home.page';
import GamePage from './pages/Game/Game.page';

function App() {
  let currentPlayerId = localStorage.getItem('playerId');

  const playerGateway = new PlayerGateway();
  const gameGateway = new GameGateway();

  const [playerId, setPlayerId] = React.useState<string | null>(currentPlayerId);

  function onLogin(userName: string){
    playerGateway.create(userName).then((player: IPlayer) => {
      setPlayerId(player.id);
      localStorage.setItem('playerId', player.id);
    })
  }

  function onLogout(){
    function removeFromMemory(){
      setPlayerId(null);
      localStorage.removeItem('playerId');
    }
    gameGateway.leave(playerId!).then(removeFromMemory).catch(removeFromMemory)
  }

  return (
    <Theme>
      {!playerId && 
       <HomePage
        onLogin={onLogin}/>
      }
      {playerId && 
        <GamePage 
          playerId={playerId} 
          onLogout={onLogout}
        />
      }
   </Theme> 
  );
}

export default App;
