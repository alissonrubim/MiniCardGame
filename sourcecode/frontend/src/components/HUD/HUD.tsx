import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, Snackbar, Slide } from '@material-ui/core';

import config from 'config.json'

import HUDGameInfoCard from './components/HUDGameInfoCard'
import HUDDebugCard from './components/HUDDebugCard'

import IGameRoom from 'models/IGameRoom'
import IPlayer from 'models/IPlayer'

export default function HUD(props: HUDProps){
  return (
    <Box>
        {/* Game info HUD */}
        <HUDGameInfoCard 
          player={props.player} 
          gameRoom={props.gameRoom}
          onLogout={props.onLogout}
        />
       
        {/* Debug HUD */}
        {config.debug && 
          <HUDDebugCard 
            player={props.player} 
            gameRoom={props.gameRoom}
          />
        }
    </Box>
  )
}

export interface HUDProps {   
    player: IPlayer,
    gameRoom: IGameRoom,
    gameIsReady: boolean,
    isMyTurn: boolean,
    onLogout: () => void,
}