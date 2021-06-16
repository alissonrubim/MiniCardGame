import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
 
import HomePage from './pages/Home/Home.page';
import GamePage from './pages/Game/Game.page';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <HomePage />
        </Route>
        <Route path="/game">
          <GamePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
