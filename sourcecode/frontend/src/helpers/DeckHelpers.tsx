import IDeck from 'models/IDeck';
import ICard from 'models/ICard';
import ISuit from 'models/ISuit';
import { GiSpades, GiDiamonds, GiHearts, GiClubs } from 'react-icons/gi';

export function ConvertServerDeck(serverDeck: Array<ICard>): Array<ICard> {
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