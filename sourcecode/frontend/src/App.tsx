import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import './App.css';

import IPlayer from 'models/IPlayer';
import PlayerGameway  from 'gateways/Player.gateway'

import HomePage from './pages/Home/Home.page';
import GamePage from './pages/Game/Game.page';

function App() {
  let currentPlayerId = localStorage.getItem('playerId');

  const playerGateway = new PlayerGameway();
  const [playerId, setPlayerId] = React.useState<string | null>(currentPlayerId);

  function onLogin(userName: string){
    playerGateway.create({
        name: userName
    }).then((player: IPlayer) => {
      setPlayerId(player.id);
      localStorage.setItem('playerId', player.id);
    })
  }

  function onLogout(){
    setPlayerId(null);
    localStorage.removeItem('playerId');
  }


  return (
    <>
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
   </> 
  );
}

export default App;
