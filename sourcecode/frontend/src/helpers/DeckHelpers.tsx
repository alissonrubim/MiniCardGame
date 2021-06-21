import IDeck from 'models/IDeck';
import ICard from 'models/ICard';
import ISuit from 'models/ISuit';
import { GiSpades, GiDiamonds, GiHearts, GiClubs } from 'react-icons/gi';

function getDecks(){
  let decks =  new Array<IDeck>();
  decks.push({
    id: 'R',
    color: '#e55e5e'
  });
  decks.push({
    id: 'B',
    color: '#659edb'
  })
  return decks;
}

function getSuits(){
  let suits = new Array<ISuit>();
  getDecks().forEach((deck) => {
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
  return suits;
}

function ConvertServerCard_Aux(suits: Array<ISuit>, serverCard: ICard): ICard {
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

  //extract the infor from the card id
  let deckId = serverCard.id.split(':')[0];
  let suitId = serverCard.id.split(':')[1];
  let cardName = serverCard.id.split(':')[2];

  return {
    id: serverCard.id,
    value: serverCard.value,
    name: cardName,
    suit: getSuitById(suitId)!
  };
}

export function ConvertServerDeck(serverDeck: Array<any>): Array<ICard> {
  let suits = getSuits();
  let gameDeck = new Array<ICard>();

  serverDeck.forEach((serverCard) => {
    //extract the infor from the card id
    let deckId = serverCard.id.split(':')[0];
    let suitId = serverCard.id.split(':')[1];
    let cardName = serverCard.id.split(':')[2];

    gameDeck.push(ConvertServerCard_Aux(suits, serverCard));
  })

  return gameDeck;
}

export function ConvertServerCard(serverCard: any): ICard {
  let suits = getSuits();
  return ConvertServerCard_Aux(suits, serverCard);
}

export function GenerateFakeDeck(size: number): Array<ICard> {
  let suits = getSuits();
  let gameDeck = new Array<ICard>();

  for(var i=0; i<size; i++){
    gameDeck.push({
      id: "-1:-1:-1",
      value: -1,
      name: "Void",
      suit: suits[0]
    });
  }
  return gameDeck;
}