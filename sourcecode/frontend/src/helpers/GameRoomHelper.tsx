import IGameRoom from 'models/IGameRoom'
import IMatch from 'models/IMatch'

export function GetCurrentMatch(gameRoom: IGameRoom){
    return gameRoom.matches.length > 0 ? gameRoom.matches[gameRoom.matches.length-1] : null;
}

export function GetCurrentRound(match: IMatch){
    return match.rounds[match.rounds.length-1];
}