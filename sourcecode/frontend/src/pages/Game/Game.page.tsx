import React, { useState, useEffect } from 'react';
import Game from 'components/Game/Game';
import IPlayer from 'models/IPlayer';
import IGameRoom from 'models/IGameRoom';
import PlayerGateway  from 'gateways/Player.gateway'
import GameRoomGateway  from 'gateways/GameRoom.gateway'

export default function GamePage(props: GamePageProps){
    const playerGateway = new PlayerGateway();
    const gameRoomGateway = new GameRoomGateway();
    const [player, setPlayer] = React.useState<IPlayer | null>();
    const [gameRoom, setGameRoom] = React.useState<IGameRoom | null>();

    useEffect(() => {
        if(!player){
            //Get player and game data to decide if the game is ready to start
            playerGateway.get(props.playerId!).then((playerData) => {
                setPlayer(playerData)
                if(!playerData.gameRoomId){
                    gameRoomGateway.join(props.playerId!).then((gameData) => {
                        setGameRoom(gameData)
                    });
                }else{
                    gameRoomGateway.get(playerData.gameRoomId).then((gameData) => {
                        setGameRoom(gameData)
                    });
                }
            }).catch((error) => {
                props.onLogout();
            });
        }
    }, []);

    if(!props.playerId || !gameRoom)
        return <></>;

    return (<Game 
        player={player!}
        gameRoom={gameRoom}
        onLogout={props.onLogout}
    />);
}

export interface GamePageProps {
    playerId?: string
    onLogout: () =>  void
}